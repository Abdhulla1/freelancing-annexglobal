"use client";
import React, { useState, useEffect } from "react";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { uploadImage, deleteMedia } from "@/service/mediaManagemnt";
import { useFormik } from "formik";
import * as Yup from "yup";
import { savePastConferenceGallery } from "@/service/AdminConfernecePages/confernce";

export default function PastGallery({
  selectedConferenceID,
  pastGallery,
  fetchConfernceData,
  toast,
}) {
  const initialGallery = pastGallery.galleryImages || [];
  const initialCardImageUrl = pastGallery.cardImage || "";

  const [uploads, setUploads] = useState(() => {
    const existing = initialGallery.map((url, i) => ({
      id: `existing-${i}`,
      imageUrl: url,
      uploaded: true,
      file: null,
    }));

    const fillers = Array.from({ length: 7 - existing.length }, (_, i) => ({
      id: `empty-${i}`,
      imageUrl: "",
      uploaded: false,
      file: null,
    }));

    return [...existing, ...fillers];
  });

  const [buttonLoading, setButtonLoading] = useState(false);
  const [cardImage, setCardImage] = useState({
    file: null,
    imageUrl: initialCardImageUrl,
  });

  const [replacedImages, setReplacedImages] = useState([]);
  const [replacedCardImage, setReplacedCardImage] = useState(null);

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

        // Upload new card image if changed
        if (cardImage.file) {
          const res = await uploadImage(cardImage.file);
          if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
            throw new Error("Card image upload failed");
          }
          setReplacedCardImage(cardImage.imageUrl);
          cardImageUrl = res.data.detail.message[0].url;
        }

        const galleryImageUrls = uploads
          .filter((u) => u.imageUrl)
          .map((u) => u.imageUrl);

        const payload = {
          title: values.title,
          cardImage: cardImageUrl,
          galleryImages: galleryImageUrls,
        };

        const response = await savePastConferenceGallery(
          payload,
          selectedConferenceID
        );

        if (response.status === 200) {
          // Delete old gallery images
          for (const url of replacedImages) {
            if (url && typeof url === "string" && !url.startsWith("blob:")) {
              try {
                await deleteMedia("image", url);
              } catch (err) {
                console.warn("Failed to delete replaced gallery image:", err);
              }
            }
          }

          // Delete old card image
          if (
            replacedCardImage &&
            typeof replacedCardImage === "string" &&
            !replacedCardImage.startsWith("blob:")
          ) {
            try {
              await deleteMedia("image", replacedCardImage);
            } catch (err) {
              console.warn("Failed to delete old card image:", err);
            }
          }

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
          throw new Error(
            response.data?.detail?.[0]?.msg || "Unknown server response"
          );
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Submission failed",
          detail: error.message || "Failed to submit Past Conference Gallery.",
          life: 3000,
        });
      } finally {
        setButtonLoading(false);
      }
    },
  });

  const handleFileChange = (file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    if (cardImage.imageUrl && !cardImage.file) {
      setReplacedCardImage(cardImage.imageUrl);
    }
    setCardImage({ file, imageUrl: preview });
  };

  const handleUploadsFileChange = async (file, id) => {
    try {
      const preview = file ? URL.createObjectURL(file) : null;

      const uploadItem = uploads.find((u) => u.id === id);
      if (uploadItem?.imageUrl && !uploadItem?.file) {
        setReplacedImages((prev) => [...prev, uploadItem.imageUrl]);
      }

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

      setUploads((prev) =>
        prev.map((upload) =>
          upload.id === id
            ? {
                ...upload,
                imageUrl: uploadedUrl,
                uploaded: true,
                file: null,
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

  const handleAddUpload = () => {
    setUploads([
      ...uploads,
      {
        id: `new-${Date.now()}`,
        imageUrl: "",
        uploaded: false,
        file: null,
      },
    ]);
  };

  const handleRemoveUpload = (upload) => {
    if (upload.imageUrl && !upload.file) {
      setReplacedImages((prev) => [...prev, upload.imageUrl]);
    }
    setUploads((prev) => prev.filter((u) => u.id !== upload.id));
  };

  const currentImageUrls = uploads.map((u) => u.imageUrl).filter(Boolean);
  const cardImageChanged = cardImage.imageUrl !== initialCardImageUrl;
  const galleryChanged =
    JSON.stringify(currentImageUrls) !== JSON.stringify(initialGallery);

  const isSubmitDisabled =
    !formik.isValid ||
    !cardImage.imageUrl ||
    currentImageUrls.length === 0 ||
    (!cardImageChanged && !galleryChanged);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FileUpload
        title="Upload Gallery Card Image"
        showBorder={true}
        onFileChange={handleFileChange}
        imageUrl={cardImage.imageUrl || "/icons/DefaultPreviewImage.png"}
        dimensionNote="Recommended dimensions: Width 380px × Height 250px"
      />

      <div className="mb-4">
        <label htmlFor="title" className="form-label">
          Title
        </label>
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
                dimensionNote="Recommended dimensions: Width 280px × Height 150px"
                imageUrl={upload.imageUrl || "/icons/DefaultPreviewImage.png"}
                onFileChange={(file) =>
                  handleUploadsFileChange(file, upload.id)
                }
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
