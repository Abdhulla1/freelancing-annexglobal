import React, { useState } from "react";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { patchHeaderPannelImages ,deleteHeaderPannelImages} from "@/service/AdminConfernecePages/confernce";
import { uploadImage } from "@/service/mediaManagemnt";
export default function LandingPage({
  selectedConferenceID,
  headerPannelImages = [],
  fetchConfernceData,
  toast,
}) {
  const [uploads, setUploads] = useState(() => {
    if (headerPannelImages.length > 0) {
      const existing = headerPannelImages.map((img, i) => ({
        id: Date.now() + i,
        imageUrl: img.imageUrl,
        imageId: img.imageId,
        uploaded: true,
      }));

      const fillers = Array.from({ length: 3 - existing.length }, (_, i) => ({
        id: Date.now() + 100 + i,
        imageUrl: "",
        imageId: null,
        uploaded: false,
      }));

      return [...existing, ...fillers];
    } else {
      return Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        imageUrl: "",
        imageId: null,
        uploaded: false,
      }));
    }
  });
  const handleFileChange = async (file, id) => {
    try {
      const preview = file ? URL.createObjectURL(file) : null;
      setUploads((prev) =>
        prev.map((upload) =>
          upload.id === id ? { ...upload, imageUrl: preview } : upload
        )
      );

      const res = await uploadImage(file);
      if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
        throw new Error("Image upload failed");
      }

      const imageUrl = res.data.detail.message[0].url;
 const payload = { imageUrl:imageUrl }; 
      const uploadItem = uploads.find((u) => u.id === id);
      const patchRes = await patchHeaderPannelImages(
        selectedConferenceID,
           {  contentType: "ocm",
              imageUrl: imageUrl
            },
        uploadItem?.imageId || null
      );

      if (patchRes.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Image Uploaded",
          detail:
          "Image saved successfully.",
          life: 3000,
        });

        const updatedImageId = patchRes.data?.detail?.[0]?.id; // optional

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

        fetchConfernceData();
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
      <h6>Landing Page Images</h6>
      <div className="border rounded-2 mb-2">
        {uploads.map((upload, index) => (
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
