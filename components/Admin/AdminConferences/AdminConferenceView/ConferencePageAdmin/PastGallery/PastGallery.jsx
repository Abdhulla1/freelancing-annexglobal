"use client";
import React, { useState, useEffect } from "react";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { uploadImage, deleteMedia } from "@/service/mediaManagemnt";
import {
  patchPastGallery,
  deletePastGalleryImage,
} from "@/service/AdminConfernecePages/confernce";

export default function PastGallery({
  selectedConferenceID,
  toast,
  PastGalleryData = [],
  fetchConfernceData,
}) {
  const [uploads, setUploads] = useState([]);

  // Initialize or sync uploads from backend
  useEffect(() => {
    const maxInitial = 7;
    const existing = PastGalleryData.map((img, i) => ({
      id: img.imageId || `slot-${i}`,
      imageUrl: img.imageUrl,
      imageId: img.imageId,
      uploaded: true,
    }));

    const fillers = Array.from(
      { length: maxInitial - existing.length },
      (_, i) => ({
        id: `empty-${i}`,
        imageUrl: "",
        imageId: null,
        uploaded: false,
      })
    );

    setUploads([...existing, ...fillers]);
  }, [PastGalleryData]);

  const handleAddUpload = () => {
    const newId = `new-${Date.now()}`;
    setUploads((prev) => [
      ...prev,
      { id: newId, imageUrl: "", imageId: null, uploaded: false },
    ]);
  };

  const handleRemoveUpload = async (upload) => {
    if (upload.uploaded && upload.imageId) {
      try {
        const response = await deletePastGalleryImage(selectedConferenceID, {
          imageId: upload.imageId,
        });

        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Image Deleted",
            detail:
              response.data?.detail?.[0]?.msg || "Deleted successfully.",
            life: 3000,
          });

          try {
            await deleteMedia("image", upload.imageUrl);
          } catch {
            console.warn("Failed to delete media image");
          }

          await fetchConfernceData();
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Delete Failed",
          detail: error.message || "Failed to delete image.",
          life: 3000,
        });
        return;
      }
    }

    setUploads((prev) => prev.filter((u) => u.id !== upload.id));
  };

  const handleFileChange = async (file, id) => {
    try {
      const preview = file ? URL.createObjectURL(file) : null;

      const uploadItem = uploads.find((u) => u.id === id);
      const oldImageUrl = uploadItem?.imageUrl;
      const imageIdToPatch = uploadItem?.imageId || null;

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

      const patchRes = await patchPastGallery(
        selectedConferenceID,
        { imageUrl },
        imageIdToPatch
      );

      if (patchRes.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Image Uploaded",
          detail:
            patchRes.data?.detail?.[0]?.msg || "Image saved successfully.",
          life: 3000,
        });

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

        if (uploadItem?.uploaded && oldImageUrl && oldImageUrl !== imageUrl) {
          try {
            await deleteMedia("image", oldImageUrl);
          } catch (err) {
            console.warn("Old image deletion failed", err);
          }
        }

        await fetchConfernceData();
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
    <>
      <div className="mb-2 d-flex align-items-center">
        <label className="form-label">Upload Images</label>
        <button
          type="button"
          className="btn btn-outline-warning rounded ms-2"
          onClick={handleAddUpload}
        >
          <i className="bx bx-plus"></i>
        </button>
      </div>

      <div
        className="border rounded p-2 d-flex flex-column gap-3"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        {uploads.map((upload, index) => (
          <div
            key={upload.id}
            className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2 px-2"
          >
            <div className="flex-grow-1 w-100">
              <FileUpload
                showBorder={false}
                showTitle={false}
                dimensionNote="Recommended dimensions: Width 800px × Height 500px"
                imageUrl={
                  upload.imageUrl || "/icons/DefaultPreviewImage.png"
                }
                onFileChange={(file) => handleFileChange(file, upload.id)}
              />
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleRemoveUpload(upload)}
              title="Delete"
              disabled={index < 7}
            >
              <i className="bx bx-trash" style={{ fontSize: "20px" }}></i>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
