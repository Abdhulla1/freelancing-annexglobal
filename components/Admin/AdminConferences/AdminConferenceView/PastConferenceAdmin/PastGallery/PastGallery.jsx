"use client";
import React, { useState } from "react";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { uploadImage } from "@/service/mediaManagemnt";
import { useFormik } from "formik";
import * as Yup from "yup";
import { savePastConferenceGallery } from "@/service/AdminConfernecePages/confernce";

export default function PastGallery({
  selectedConferenceID,
  pastGallery,
  fetchConfernceData,
  toast,
}) {
const [uploads, setUploads] = useState(() => {
  const existing = (pastGallery.galleryImages || []).map((url, i) => ({
    id: Date.now() + i,
    imageUrl: url,
    uploaded: true,
    file: null,
  }));

  const total = 7;
  const fillers = Array.from({ length: total - existing.length }, (_, i) => ({
    id: Date.now() + 100 + i,
    imageUrl: "",
    uploaded: false,
    file: null,
  }));

  return [...existing, ...fillers];
});



  const [buttonLoading, setButtonLoading] = useState(false);
  const [cardImage, setCardImage] = useState({
    file: null,
    imageUrl: pastGallery.cardImage || "",
  });
const initialImageUrls = (pastGallery.galleryImages || []).filter(Boolean);
const initialCardImageUrl = pastGallery.cardImage || "";

  const handleAddUpload = () => {
    setUploads([
      ...uploads,
      { id: Date.now(), imageUrl: "", imageId: null, uploaded: false },
    ]);
  };

  const handleRemoveUpload = (upload) => {
    setUploads((prev) => prev.filter((u) => u.id !== upload.id));
  };

  const handleFileChange = (file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    setCardImage({ file, imageUrl: preview });
  };

const handleUploadsFileChange = async (file, id) => {
  try {
    const preview = file ? URL.createObjectURL(file) : null;

    // Show preview while uploading
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === id ? { ...upload, imageUrl: preview, file } : upload
      )
    );

    const res = await uploadImage(file);
    if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
      throw new Error("Image upload failed");
    }

    const uploadedUrl = res.data.detail.message[0].url;

    // Save uploaded URL to state
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === id
          ? {
              ...upload,
              imageUrl: uploadedUrl,
              uploaded: true,
              file: null, // Clear file, now we have imageUrl
            }
          : upload
      )
    );
  } catch (error) {
    toast.current.show({
      severity: "error",
      summary: "Upload Failed",
      detail: error.message || "Failed to upload image.",
      life: 3000,
    });
  }
};


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: pastGallery.title || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
    }),
    onSubmit: async (values) => {
      setButtonLoading(true);
      try {
        let cardImageUrl = cardImage.imageUrl;
        if (cardImage.file) {
          const res = await uploadImage(cardImage.file);
          if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
            throw new Error("Image upload failed");
          }
          cardImageUrl = res.data.detail.message[0].url;
        }

      const imageUrls = uploads
  .map((upload) => upload.imageUrl)
  .filter((url) => url); // only non-empty


        const payload = {
          cardImage: cardImageUrl,
          ...values,
          galleryImages: imageUrls,
        };

        const response = await savePastConferenceGallery(payload, selectedConferenceID);

        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail:
              response.data?.detail?.[0]?.msg ||
              "Past Conference Gallery successfully saved",
            life: 3000,
          });
          fetchConfernceData();
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Unknown response",
            detail: response.data?.detail?.[0]?.msg || "Unknown server response",
            life: 3000,
          });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Submission failed",
          detail:
            error.message ||
            "Failed to submit Past Conference Gallery. Please try again.",
          life: 3000,
        });
      } finally {
        setButtonLoading(false);
      }
    },
  });

const currentImageUrls = uploads
  .map((u) => u.imageUrl)
  .filter((url) => !!url);

const cardImageChanged = cardImage.imageUrl !== initialCardImageUrl;
const galleryChanged = JSON.stringify(currentImageUrls) !== JSON.stringify(initialImageUrls);

// Final condition to enable save button
const isSubmitDisabled =
  !formik.isValid ||
  !cardImage.imageUrl || // card image must be present
  currentImageUrls.length === 0 || // at least one gallery image
  (!cardImageChanged && !galleryChanged); // no actual change

  return (
    <form onSubmit={formik.handleSubmit}>
      <FileUpload
        title={"Upload Gallery Card Image"}
        showBorder={true}
        onFileChange={handleFileChange}
        imageUrl={cardImage.imageUrl || "/icons/DefaultPreviewImage.png"}
        dimensionNote="Recommended dimensions: Width 200px × Height 200px"
      />

      <div className="mb-4">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Enter Title"
          {...formik.getFieldProps("title")}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-danger">{formik.errors.title}</div>
        )}
      </div>

      <div className="mb-2">
        <label className="form-label">Gallery images</label>
        <button
          name="view"
          className="btn btn-outline-warning rounded ms-2"
          type="button"
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
                dimensionNote="Recommended dimensions: Width 200px × Height 200px"
                imageUrl={upload.imageUrl || "/icons/DefaultPreviewImage.png"}
                onFileChange={(file) => handleUploadsFileChange(file, upload.id)}
              />
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleRemoveUpload(upload)}
              title="Delete"
              disabled={index < 7}
              type="button"
            >
              <i className="bx bx-trash" style={{ fontSize: "20px" }}></i>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 p-2 d-flex justify-content-start align-items-center gap-2 w-100">
        <button
          type="submit"
          className="btn px-5 btn-warning text-white"
          disabled={isSubmitDisabled}
        >
          {buttonLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
