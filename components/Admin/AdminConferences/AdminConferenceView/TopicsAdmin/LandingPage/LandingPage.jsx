import React, { useState, useEffect } from "react";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { patchTopicsHeaderPannelImages } from "@/service/AdminConfernecePages/confernce";
import { uploadImage, deleteMedia } from "@/service/mediaManagemnt";

export default function LandingPage({
  selectedConferenceID,
  headerPannelImages = [],
  fetchConfernceData,
  toast,
}) {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const maxSlots = 5;

    const existing = headerPannelImages.map((img, i) => ({
      id: img.imageId || `slot-${i}`,
      imageUrl: img.imageUrl,
      imageId: img.imageId,
      uploaded: true,
    }));

    const fillers = Array.from({ length: maxSlots - existing.length }, (_, i) => ({
      id: `empty-${i}`,
      imageUrl: "",
      imageId: null,
      uploaded: false,
    }));

    setUploads([...existing, ...fillers]);
  }, [headerPannelImages]);

  const handleFileChange = async (file, id) => {
    try {
      const preview = file ? URL.createObjectURL(file) : null;

      const uploadItem = uploads.find((u) => u.id === id);
      const oldImageUrl = uploadItem?.imageUrl;
      const imageIdToDelete = uploadItem?.imageId;

      // Show preview instantly
      setUploads((prev) =>
        prev.map((upload) =>
          upload.id === id ? { ...upload, imageUrl: preview } : upload
        )
      );

      // Step 1: Delete existing entry from DB (if any)
      if (uploadItem?.uploaded && imageIdToDelete) {
        const deleteRes = await patchTopicsHeaderPannelImages(
          selectedConferenceID,
          {
            processType: "Delete",
            imageId: imageIdToDelete,
          }
        );

        if (deleteRes.status === 200) {
          // Also delete from media storage
          try {
            await deleteMedia("image", oldImageUrl);
          } catch (err) {
            console.warn("Media deletion failed:", err);
          }
        } else {
          throw new Error("Failed to delete existing image");
        }
      }

      // Step 2: Upload new image to storage
      const res = await uploadImage(file);
      if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
        throw new Error("Image upload failed");
      }

      const newImageUrl = res.data.detail.message[0].url;

      // Step 3: Upload new image to backend
      const uploadRes = await patchTopicsHeaderPannelImages(
        selectedConferenceID,
        {
          processType: "Upload",
          imageUrl: newImageUrl,
          imageId: "", // still required in API format
        }
      );

      if (uploadRes.status === 200) {
        const updatedImageId = uploadRes.data?.detail?.[0]?.id;

        setUploads((prev) =>
          prev.map((upload) =>
            upload.id === id
              ? {
                  ...upload,
                  imageUrl: newImageUrl,
                  uploaded: true,
                  imageId: updatedImageId,
                }
              : upload
          )
        );

        await fetchConfernceData();

        toast.current.show({
          severity: "success",
          summary: "Image Uploaded",
          detail: "Image replaced successfully.",
          life: 3000,
        });
      } else {
        throw new Error("Failed to upload new image");
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Upload Failed",
        detail: error.message || "Failed to upload image.",
        life: 3000,
      });
    }
  };

  return (
    <div className="container">
      <h6>Upload Header Pannel Images</h6>
      <div className="border rounded-2 mb-2">
        {uploads.map((upload) => (
          <div key={upload.id} className="flex-grow-1 w-100">
            <FileUpload
              showBorder={false}
              showTitle={false}
              dimensionNote="Recommended dimensions: Width 1060px × Height 700px"
              imageUrl={upload.imageUrl || "/icons/DefaultPreviewImage.png"}
              onFileChange={(file) => handleFileChange(file, upload.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
