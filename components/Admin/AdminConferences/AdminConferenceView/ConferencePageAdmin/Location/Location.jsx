"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import RichTextEditor from "../LandingPage/RichTextEditor";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { uploadImage ,deleteMedia} from "@/service/mediaManagemnt";
import { saveLocationSection } from "@/service/AdminConfernecePages/confernce";
export default function Location({
  selectedConferenceID,
  toast,
  LocationData,
  fetchConfernceData,
}) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [upload, setUpload] = useState({
    file: null,
    imageUrl: LocationData.imageUrl || "",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: LocationData.title || "",
      content: LocationData.content || "",
      mapsEmbedLink: LocationData.mapsEmbedLink || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      mapsEmbedLink: Yup.string()
        .url("Enter a valid URL")
        .required("Map link is required"),
    }),
    onSubmit: async (values) => {
      setImageError("");
      setButtonLoading(true);

      try {
        let imageUrl = upload.imageUrl;
        if (upload.file) {
          const res = await uploadImage(upload.file);
          if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
            throw new Error("Image upload failed");
          }
          imageUrl = res.data.detail.message[0].url;
        }

        const payload = {
          ...values,
          imageUrl: imageUrl,
        };

        const response = await saveLocationSection(
          payload,
          selectedConferenceID
        );

        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail:
              response.data?.detail?.[0]?.msg ||
              "Location info saved successfully.",
            life: 3000,
          });
          if (
            upload.file &&
            LocationData.imageUrl &&
            !LocationData.imageUrl.startsWith("blob:")
          ) {
            try {
              await deleteMedia("image", LocationData.imageUrl);
            } catch {
              throw new Error("Failed to Delete");
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
          detail: error.message || "Failed to save location info.",
          life: 3000,
        });
      } finally {
        setButtonLoading(false);
      }
    },
  });

  const handleFileChange = (file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    setUpload({ file, imageUrl: preview });
    setImageError(""); // clear on valid image selection
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
        height="250px"
      />
      {formik.touched.content && formik.errors.content && (
        <div className="text-danger mt-1">{formik.errors.content}</div>
      )}

      <div className="mt-3">
        <FileUpload
          title="Upload Google Maps Screenshot (Image Upload)"
          onFileChange={handleFileChange}
          imageUrl={upload.imageUrl || "/icons/DefaultPreviewImage.png"}
          showBorder={true}
          dimensionNote="Recommended dimensions: Width 530px × Height 470px"
        />
        {imageError && <div className="text-danger mt-1">{imageError}</div>}
      </div>

      <div className="mt-4">
        <label htmlFor="mapsEmbedLink" className="form-label">
          Google Maps Embed Link
        </label>
        <div className="input-group border rounded p-1">
          <span
            className="btn rounded-2 text-white me-1"
            id="basic-addon1"
            style={{ backgroundColor: "#111880" }}
          >
            <i className="bx bx-link-alt"></i>
          </span>
          <input
            type="url"
            name="mapsEmbedLink"
            id="mapsEmbedLink"
            className="form-control border-0"
            placeholder="Enter Map Link"
            {...formik.getFieldProps("mapsEmbedLink")}
          />
        </div>
        {formik.touched.mapsEmbedLink && formik.errors.mapsEmbedLink && (
          <div className="text-danger mt-1">{formik.errors.mapsEmbedLink}</div>
        )}
      </div>

      <div className=" mt-5 p-2 d-flex justify-content-start gap-2 w-100">
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
