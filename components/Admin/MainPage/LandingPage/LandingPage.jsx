"use client";
import React, { useState, useEffect } from "react";
// import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import FileUploadVideo from "@/components/Reusable/Admin/FileUpload/FileUploadVideo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadVideo, deleteMedia } from "@/service/mediaManagemnt";
import { updateMainLandingPage } from "@/service/mainPageService";
import { Button } from "primereact/button";

export default function LandingPage({ LandingPageData, toast,fetchData }) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [upload, setUpload] = useState({
    file: null,
    imageUrl: LandingPageData.imageUrl || null,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      heading: LandingPageData.heading || "",
      subTitle: LandingPageData.subTitle || "",
    },
    validationSchema: Yup.object({
      heading: Yup.string().required("Header Texting is required"),
      subTitle: Yup.string().required("Theme is required"),
    }),
    onSubmit: async (values) => {
      setButtonLoading(true);

      try {
        let imageUrl = upload.imageUrl;

        if (upload.file) {
        
           // Upload new video
          const res = await uploadVideo(upload.file);
          if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
            throw new Error("Failed to upload Video");
          }
          imageUrl = res.data.detail.message[0].url;
        }
        const finalPayload = {
          imageUrl: imageUrl,
          ...values,
        };

        const response = await updateMainLandingPage(finalPayload);

        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail:
              response.data?.detail?.[0]?.msg ||
              "The Landing Page submitted successfully.",
            life: 3000,
          });
            // Delete old video if it exists and is not a blob
          if (
            LandingPageData.imageUrl &&
            !LandingPageData.imageUrl.startsWith("blob:")
          ) {
            await deleteMedia("video",LandingPageData.imageUrl);
          }
          fetchData(); // Refresh data after successful update
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Warning",
            detail:
              response.data?.detail?.[0]?.msg ||
              "Something went wrong. Please try again.",
            life: 3000,
          });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Submission failed",
          detail: "Failed to Update the LandingPage. Please try again.",
          life: 3000,
        });
      } finally {
        setButtonLoading(false);
      }
    },
  });
  // const handleFileChange = (file) => {
  //   const preview = file ? URL.createObjectURL(file) : null;
  //   setUpload({ file, imageUrl: preview });
  // };
  const handleFileChange = (file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    setUpload((prev) => ({
      ...prev,
      file,
      imageUrl: preview,
    }));
  };

  useEffect(() => {
    return () => {
      if (upload.imageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(upload.imageUrl);
      }
    };
  }, [upload.imageUrl]);

  const valuesChanged =
    formik.values.heading !== LandingPageData.heading ||
    formik.values.subTitle !== LandingPageData.subTitle;

  const imageChanged =
    upload.file !== null || upload.imageUrl !== LandingPageData.imageUrl;

  const isSubmitDisabled = !formik.isValid || (!valuesChanged && !imageChanged);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FileUploadVideo
        title="Upload Video"
        onFileChange={handleFileChange}
        videoUrl={upload.imageUrl || null}
        dimensionNote="Recommended dimensions: Width 1900px × Height 1000px"
        style={{ objectFit: "cover", borderRadius: "8px" }}
      />
      <div className="mt-4">
        <div className="col-md-8 mb-3">
          <label className="form-label">Header Texting</label>
          <input
            type="text"
            className="form-control"
            placeholder="Join more than 7,000+ Marketers in Budapest 4-5 September 2025"
            {...formik.getFieldProps("heading")}
          />
          {formik.touched.heading && formik.errors.heading && (
            <div className="text-danger">{formik.errors.heading}</div>
          )}
        </div>
        <div className="col-md-8 mb-3">
          <label className="form-label">Theme</label>
          <input
            type="text"
            className="form-control"
            placeholder="Exploring New Realms..."
            {...formik.getFieldProps("subTitle")}
          />
          {formik.touched.subTitle && formik.errors.subTitle && (
            <div className="text-danger">{formik.errors.subTitle}</div>
          )}
        </div>
      </div>

      {/* <div className="col-md-12 mb-3">
          <label className="form-label">Header Texting</label>
          <input
            type="text"
            name="headerTexting"
            className="form-control"
            placeholder="Join more than 7,000+ Marketers in Budapest 4-5 September 2025"
            {...formik.getFieldProps("headerTexting")}
          />
          {formik.touched.headerTexting && formik.errors.headerTexting && (
            <div className="text-danger">{formik.errors.headerTexting}</div>
          )}
        </div> */}
      <div className=" mt-4 p-2 d-flex justify-content-start align-items-center gap-2 w-100">
        <Button
          label="Save Changes"
          type="submit"
          className="btn px-5 btn-warning text-white"
          loading={buttonLoading}
          style={{ outline: "none", boxShadow: "none" }}
        />
      </div>
    </form>
  );
}
