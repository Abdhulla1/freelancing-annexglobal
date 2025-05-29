"use client";
import React, { useState, useRef } from "react";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { Toast } from "primereact/toast";
import { uploadImage } from "@/service/mediaManagemnt";
import { getAllGallery,saveAllGallery } from "@/service/galleryService";
import { Button } from "primereact/button";
export default function GalleryImageUploads() {
  const toastRef = useRef(null);
    const [buttonLoading, setButtonLoading] = useState(false);
  
  const [uploads, setUploads] = useState(
    Array.from({ length: 15 }, () => ({ file: null }))
  );

  // Handle file upload per index
  const handleFileChange = (file,index) => {
    const updatedUploads = [...uploads];
    updatedUploads[index].file = file;
    setUploads(updatedUploads);
  };

const isSubmitDisabled = uploads.some((upload, index) => {
  const isInvalid = !upload.file || !upload.file.name;
  return isInvalid;
});


  const handleSubmit = async (e) => {
    setButtonLoading(true)

    try {
      const uploadPromises = uploads.map(async ({ file }) => {
        if (file?.isUploaded) {
          return { url: file.preview };
        } else if (file) {
          const response= await uploadImage(file);
          return response.data?.detail.message[0]; // uploadImage should return { url: '...' }
        } else {
          return null;
        }
      });

      const responses = await Promise.all(uploadPromises);
      const imageUrls = responses.filter(Boolean).map((res) => res.url);

      const finalPayload = {
        imageUrls: imageUrls,
      };
console.log("finalPayload", finalPayload)
      const response = await saveAllGallery(finalPayload );

      if (response.status === 201) {
        toastRef.current.show({
          severity: "success",
          summary: "Success!",
          detail: response.data.detail[0].msg || "Gallery submitted successfully.",
          life: 3000,
        });
      } 
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Submission failed",
        detail: error.message || "Failed to submit the form. Please try again.",
        life: 3000,
      });
    }finally{
          setButtonLoading(false)
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

              />
            </div>
          </div>
        ))}
      </div>
{isSubmitDisabled && (
  <p className="text-danger mt-2">Please upload all 15 images to enable submission.</p>
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
