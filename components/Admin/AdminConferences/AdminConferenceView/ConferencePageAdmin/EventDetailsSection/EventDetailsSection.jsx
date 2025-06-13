"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import RichTextEditor from "../LandingPage/RichTextEditor";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { uploadImage, deleteMedia } from "@/service/mediaManagemnt";
import { saveEventDetailsSection } from "@/service/AdminConfernecePages/confernce";

export default function EventDetailsSection({
  selectedConferenceID,
  toast,
  EventDetailsSectionData,
  fetchConfernceData,
}) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState(["", "", ""]);
  const [uploads, setUploads] = useState(
    [0, 1, 2].map((i) => ({
      file: null,
      imageUrl: EventDetailsSectionData?.images?.[i] || "",
    }))
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: EventDetailsSectionData.title || "",
      content: EventDetailsSectionData.content || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      const missingImageIndexes = uploads
        .map((upload, i) => (!upload.imageUrl ? i : null))
        .filter((i) => i !== null);

      if (missingImageIndexes.length > 0) {
        const newErrors = ["", "", ""];
        missingImageIndexes.forEach((i) => {
          newErrors[i] = "Image is required";
        });
        setImageErrors(newErrors);
        return;
      }

      setButtonLoading(true);
      setImageErrors(["", "", ""]);

      try {
        const uploadedUrls = await Promise.all(
          uploads.map(async (upload) => {
            if (upload.file) {
              const res = await uploadImage(upload.file);
              if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
                throw new Error("Image upload failed");
              }

              return res.data.detail.message[0].url;
            }
            return upload.imageUrl;
          })
        );

        const payload = {
          ...values,
          images: uploadedUrls,
        };

        const response = await saveEventDetailsSection(
          payload,
          selectedConferenceID
        );

        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail:
              response.data?.detail?.[0]?.msg ||
              "Event details saved successfully.",
            life: 3000,
          });

          for (let i = 0; i < uploads.length; i++) {
            const upload = uploads[i];
            const oldImage = EventDetailsSectionData?.images?.[i];

            if (
              upload.file && // a new file was uploaded
              oldImage && // old image exists
              oldImage !== upload.imageUrl && // image was actually replaced
              !oldImage.startsWith("blob:")
            ) {
              try {
                await deleteMedia("image", oldImage);
              } catch {
                throw new Error("Failed to Delete");
              }
            }
          }

          fetchConfernceData();
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Unknown response",
            detail:
              response.data?.detail?.[0]?.msg || "Unknown server response",
            life: 3000,
          });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Submission failed",
          detail: error.message || "Failed to save event details.",
          life: 3000,
        });
      } finally {
        setButtonLoading(false);
      }
    },
  });

  const handleFileChange = (index, file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    setUploads((prev) =>
      prev.map((upload, i) =>
        i === index ? { file, imageUrl: preview } : upload
      )
    );
    setImageErrors((prev) => prev.map((err, i) => (i === index ? "" : err)));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="mt-5">
      <div className="mb-4">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          placeholder="Enter Title"
          {...formik.getFieldProps("title")}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-danger">{formik.errors.title}</div>
        )}
      </div>

      <RichTextEditor
        labelName="Content"
        initialValue={formik.values.content}
        onChange={(value) => formik.setFieldValue("content", value)}
        height="150px"
      />
      {formik.touched.content && formik.errors.content && (
        <div className="text-danger mt-1">{formik.errors.content}</div>
      )}

      <div className="mt-3">
        <label className="form-label">Upload Images</label>
        <div className="border rounded p-2 d-flex flex-column gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2 px-2"
            >
              <div className="flex-grow-1 w-100">
                <FileUpload
                  showBorder={false}
                  showTitle={false}
                  imageUrl={
                    uploads[i].imageUrl || "/icons/DefaultPreviewImage.png"
                  }
                  onFileChange={(file) => handleFileChange(i, file)}
                  dimensionNote="Recommended dimensions: Width 600px × Height 400px"
                />
                {imageErrors[i] && (
                  <div className="text-danger mt-1">{imageErrors[i]}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 p-2 d-flex justify-content-start align-items-center gap-2 w-100">
        <button
          type="submit"
          className="btn px-1 px-md-5 btn-warning text-white"
          disabled={!formik.isValid || buttonLoading}
        >
          {buttonLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
