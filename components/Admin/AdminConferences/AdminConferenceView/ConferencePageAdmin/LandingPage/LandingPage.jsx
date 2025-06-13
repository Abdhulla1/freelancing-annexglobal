"use client";
import React, { useState } from "react";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadImage, deleteMedia } from "@/service/mediaManagemnt";
import { saveConferenceLandingPage } from "@/service/AdminConfernecePages/confernce";
import RichTextEditor from "./RichTextEditor";

export default function LandingPage({
  selectedConferenceID,
  toast,
  LandingPageData,
  fetchConfernceData,
}) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [upload, setUpload] = useState({
    file: null,
    imageUrl: LandingPageData.certificationImage || "",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: LandingPageData.title || "",
      conference: LandingPageData.conference || "",
      theme: LandingPageData.theme || "",
      startDate: LandingPageData.startDate || "",
      endDate: LandingPageData.endDate || "",
      location: LandingPageData.location || "",
      address: LandingPageData.address || "",
      startTime: LandingPageData.startTime || "",
      endTime: LandingPageData.endTime || "",
      overview: LandingPageData.overview || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      conference: Yup.string().required("Conference is required"),
      theme: Yup.string().required("Theme is required"),
      startDate: Yup.string().required("Start Date is required"),
      endDate: Yup.string().required("End Date is required"),
      location: Yup.string().required("Location is required"),
      address: Yup.string().required("Address is required"),
      startTime: Yup.string().required("Start Time is required"),
      endTime: Yup.string().required("End Time is required"),
      overview: Yup.string().required("Conference Overview is required"),
    }),
    onSubmit: async (values) => {
      // if (!upload.imageUrl || (!upload.file && !LandingPageData.imageUrl)) {
      //   setImageError("Image is required");
      //   return;
      // }

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
          certificationImage: imageUrl,
          ...values,
        };

        const response = await saveConferenceLandingPage(
          payload,
          selectedConferenceID
        );
        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail:
              response.data?.detail?.[0]?.msg ||
              "Landing Page saved successfully.",
            life: 3000,
          });
          if (
            upload.file && LandingPageData.certificationImage &&
            !LandingPageData.certificationImage.startsWith("blob:")
          ) {
            try {
              await deleteMedia("image", LandingPageData.certificationImage);
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
          detail: error.message || "Failed to save Landing Page.",
          life: 3000,
        });
      } finally {
        setButtonLoading(false);
      }
    },
  });

  const handleFileChange = (file) => {
    const preview = file ? URL.createObjectURL(file) : "";
    setUpload({ file, imageUrl: preview });
    setImageError(""); // clear on valid image selection
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <FileUpload
        title="Upload Certificate Image"
        onFileChange={handleFileChange}
        imageUrl={upload.imageUrl || "/icons/DefaultPreviewImage.png"}
        showBorder={true}
        showDelete={true}
        dimensionNote="Recommended dimensions: Width 570px × Height 760px"
        toast={toast}
      />
      {imageError && <div className="text-danger mt-1">{imageError}</div>}

      <div className="row mt-4">
        {[
          ["Title", "title", "text", "2nd International Conference On"],
          ["Conference", "conference", "text", "e.g. Primary Healthcare..."],
          ["Theme", "theme", "text", "e.g. Enhancing Women’s Health..."],
          ["Start Date", "startDate", "date"],
          ["End Date", "endDate", "date"],
          ["Location", "location", "text", "e.g. DUBAI"],
          ["Address", "address", "text", "Venue full address"],
          ["Start Time", "startTime", "time"],
          ["End Time", "endTime", "time"],
        ].map(([label, name, type, placeholder = ""]) => (
          <div className="col-md-6 mb-3" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              name={name}
              className="form-control"
              placeholder={placeholder}
              {...formik.getFieldProps(name)}
            />
            {formik.touched[name] && formik.errors[name] && (
              <div className="text-danger">{formik.errors[name]}</div>
            )}
          </div>
        ))}
      </div>

      {/* Conference Overview */}
      <div className="col-12 mb-3">
        <RichTextEditor
          labelName={"Conference Overview"}
          height="130px"
          initialValue={formik.values.overview}
          onChange={(value) => formik.setFieldValue("overview", value)}
        />
        {formik.touched.conferenceOverview &&
          formik.errors.conferenceOverview && (
            <div className="text-danger">
              {formik.errors.conferenceOverview}
            </div>
          )}
      </div>

      <div className=" mt-4 p-2 d-flex justify-content-start gap-2 w-100">
        <button
          type="submit"
          className="btn px-5 btn-warning text-white"
          disabled={!formik.isValid}
        >
          {buttonLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
