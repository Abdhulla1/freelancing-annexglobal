import React, { useState, useEffect } from "react";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import {
  patchHeaderPannelImages,
  deleteHeaderPannelImages,
} from "@/service/AdminConfernecePages/confernce";
import { uploadImage, deleteMedia } from "@/service/mediaManagemnt";

export default function LandingPage({
  selectedConferenceID,
  headerPannelImages = [],
  fetchConfernceData,
  toast,
}) {
  const [uploads, setUploads] = useState([]);

  // Initialize or update uploads from backend data
  useEffect(() => {
    const maxSlots = 4;

    const existing = headerPannelImages.map((img, i) => ({
      id: img.imageId || `slot-${i}`,
      imageUrl: img.imageUrl,
      imageId: img.imageId,
      uploaded: true,
    }));

    const fillers = Array.from(
      { length: maxSlots - existing.length },
      (_, i) => ({
        id: `empty-${i}`,
        imageUrl: "",
        imageId: null,
        uploaded: false,
      })
    );

    setUploads([...existing, ...fillers]);
  }, [headerPannelImages]);

  const handleFileChange = async (file, id) => {
    try {
      const preview = file ? URL.createObjectURL(file) : null;

      const uploadItem = uploads.find((u) => u.id === id);
      const oldImageUrl = uploadItem?.imageUrl;
      const imageIdToPatch = uploadItem?.imageId || null;

      // Set preview image immediately
      setUploads((prev) =>
        prev.map((upload) =>
          upload.id === id ? { ...upload, imageUrl: preview } : upload
        )
      );

      // Upload image to storage
      const res = await uploadImage(file);
      if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
        throw new Error("Image upload failed");
      }

      const imageUrl = res.data.detail.message[0].url;

      // Patch image to backend
      const patchRes = await patchHeaderPannelImages(
        selectedConferenceID,
        {
          contentType: "webinarProgram",
          imageUrl,
        },
        imageIdToPatch
      );

      if (patchRes.status === 200) {
        const updatedImageId = patchRes.data?.detail?.[0]?.id;

        setUploads((prev) =>
          prev.map((upload) =>
            upload.id === id
              ? {
                  ...upload,
                  imageUrl,
                  uploaded: true,
                  imageId: updatedImageId || upload.imageId,
                }
              : upload
          )
        );
        // Delete old image if replacing
        if (uploadItem?.uploaded && oldImageUrl && oldImageUrl !== imageUrl) {
          try {
            await deleteMedia("image", oldImageUrl);
          } catch (err) {
            console.warn("Old image deletion failed", err);
          }
        }
        await fetchConfernceData();

        toast.current.show({
          severity: "success",
          summary: "Image Uploaded",
          detail: "Image saved successfully.",
          life: 3000,
        });
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
      <h6>Upload Images</h6>
      <div className="border rounded-2 mb-2">
        {uploads.map((upload) => (
          <div key={upload.id} className="flex-grow-1 w-100">
            <FileUpload
              showBorder={false}
              showTitle={false}
              dimensionNote="Recommended dimensions: Width 200px × Height 200px"
              imageUrl={upload.imageUrl || "/icons/DefaultPreviewImage.png"}
              onFileChange={(file) => handleFileChange(file, upload.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
