"use client";
import React, { useState, useRef, useEffect } from "react";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { Toast } from "primereact/toast";
import { uploadImage } from "@/service/mediaManagemnt";
import { getAllGallery, saveAllGallery } from "@/service/galleryService";
import { Button } from "primereact/button";

export default function GalleryImageUploads() {
  const toastRef = useRef(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [uploads, setUploads] = useState(
    Array.from({ length: 15 }, () => ({ file: null }))
  );

  // Fetch gallery images on mount
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await getAllGallery();
        const galleryUrls = response.data?.detail?.imageUrls || [];
        console.log(response)
        const updatedUploads = Array.from({ length: 15 }, (_, index) => {
          const url = galleryUrls[index];
          return url
            ? { file: { isUploaded: true, preview: url } }
            : { file: null };
        });

        setUploads(updatedUploads);
      } catch (error) {
        toastRef.current?.show({
          severity: "error",
          summary: "Failed to load gallery",
          detail: error.message || "Could not fetch gallery images.",
          life: 3000,
        });
      }
    };

    fetchGalleryImages();
  }, []);

  // Handle file upload per index
  const handleFileChange = (file, index) => {
    const updatedUploads = [...uploads];
    updatedUploads[index].file = file;
    setUploads(updatedUploads);
  };

  // Disable submit if any file is missing or invalid
  const isSubmitDisabled = uploads.some(
    (upload) => !upload.file || !upload.file.name && !upload.file.isUploaded
  );

  const handleSubmit = async () => {
    setButtonLoading(true);

    try {
      const uploadPromises = uploads.map(async ({ file }) => {
        if (file?.isUploaded) {
          return { url: file.preview };
        } else if (file) {
          const response = await uploadImage(file);
          return response.data?.detail.message[0]; // expects { url: '...' }
        } else {
          return null;
        }
      });

      const responses = await Promise.all(uploadPromises);
      const imageUrls = responses.filter(Boolean).map((res) => res.url);

      const finalPayload = {
        imageUrls: imageUrls,
      };

      const response = await saveAllGallery(finalPayload);

      if (response.status === 200) {
        toastRef.current.show({
          severity: "success",
          summary: "Success!",
          detail:
            response.data.detail[0].msg || "Gallery submitted successfully.",
          life: 3000,
        });
      }
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Submission failed",
        detail:
          error.message || "Failed to submit the form. Please try again.",
        life: 3000,
      });
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <>
      <div className="mb-2">
        <label className="form-label">
          Upload Landing page images (15 Images)
        </label>
      </div>

      <div
        className="border rounded p-2 d-flex flex-column gap-3"
        style={{
          height: "60vh",
          overflowY: "auto",
        }}
      >
        {uploads.map((upload, i) => (
          <div
            key={i}
            className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2 px-2"
          >
            <div className="flex-grow-1 w-100">
              <FileUpload
                showBorder={false}
                showTitle={false}
                onFileChange={(file) => handleFileChange(file, i)}
                dimensionNote="Recommended dimensions: Width 1000px × Height 700px"
                imageUrl={
                  upload.file?.isUploaded ? upload.file.preview : null
                }
              />
            </div>
          </div>
        ))}
      </div>

      {isSubmitDisabled && (
        <p className="text-danger mt-2">
          Please upload all 15 images to enable submission.
        </p>
      )}

      <div className="mt-3 text-end">
        <Button
          label="Submit"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="btn px-5 btn-warning text-white"
          loading={buttonLoading}
          style={{ outline: "none", boxShadow: "none" }}
        />
      </div>

      <Toast ref={toastRef} />
    </>
  );
}
