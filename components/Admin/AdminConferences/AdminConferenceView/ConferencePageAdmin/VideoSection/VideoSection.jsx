import React, { useState,useEffect } from "react";
import RichTextEditor from "../LandingPage/RichTextEditor";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveVideoSection } from "@/service/AdminConfernecePages/confernce";
import { Button } from 'primereact/button';
export default function VideoSection({selectedConferenceID, VideoSectionData, fetchConfernceData, toast }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      videoUrl: VideoSectionData.videoUrl || "",
      content: VideoSectionData.content || "",
    },
    validationSchema: Yup.object({
      videoUrl: Yup.string()
        .url("Must be a valid URL")
        .required("Video link is required"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
           const payload={
            contentType: "Conference",
            title: "Dubai",
            ...values,
        }
        const response = await saveVideoSection(payload,selectedConferenceID);
        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail: response.data?.detail?.[0]?.msg || "Video section updated",
            life: 3000,
          });
          fetchConfernceData();
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Warning!",
            detail: response.data?.detail?.[0]?.msg || "Unexpected server response",
            life: 3000,
          });
        }
      } catch (err) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to update video section. Please try again.",
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const valuesChanged =
    formik.values.videoUrl !== VideoSectionData.videoUrl ||
    formik.values.content !== VideoSectionData.content;

  return (
    <form onSubmit={formik.handleSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="videoUrl" className="form-label">
          Video Link (YouTube)*
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
            name="videoUrl"
            className="form-control border border-0"
            placeholder="https://www.youtube.com/watch?v=..."
            {...formik.getFieldProps("videoUrl")}
            autoComplete="off"
          />
        </div>
        {formik.touched.videoUrl && formik.errors.videoUrl && (
          <div className="text-danger mt-1">{formik.errors.videoUrl}</div>
        )}
      </div>
      <RichTextEditor
        labelName="Content*"
        initialValue={formik.values.content}
        onChange={(value) => formik.setFieldValue("content", value)}
        height="120px"
      />
      {formik.touched.content && formik.errors.content && (
        <div className="text-danger mt-2">{formik.errors.content}</div>
      )}

      <div className=" mt-4 p-2 d-flex justify-content-start align-items-center gap-2 w-100">

        <button
          type="submit"
          className="btn px-5 btn-warning text-white"
  disabled={!formik.isValid || !valuesChanged}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
