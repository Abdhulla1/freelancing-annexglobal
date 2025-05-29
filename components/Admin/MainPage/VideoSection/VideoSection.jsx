import React, { useState } from "react";
import RichTextEditor from "../../AdminConferences/AdminConferenceView/ConferencePageAdmin/LandingPage/RichTextEditor";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateMainVideoSection } from "@/service/mainPageService"; // Adjust path if needed

export default function VideoSection({ VideoSection, toast, fetchData }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      videoUrl: VideoSection.videoUrl || "",
      title: VideoSection.title || "",
      content: VideoSection.content || "",
    },
    validationSchema: Yup.object({
      videoUrl: Yup.string()
        .url("Must be a valid URL")
        .required("Video link is required"),
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await updateMainVideoSection(values);
        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail: response.data?.detail?.[0]?.msg || "Video section updated",
            life: 3000,
          });
          fetchData();
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
    formik.values.videoUrl !== VideoSection.videoUrl ||
    formik.values.title !== VideoSection.title ||
    formik.values.content !== VideoSection.content;

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

      <div className="mb-4">
        <label htmlFor="title" className="form-label">
          Title*
        </label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Enter Title"
          {...formik.getFieldProps("title")}
          autoComplete="off"
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-danger mt-1">{formik.errors.title}</div>
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

        <Button
          label="Save Changes"
          type="submit"
          className="btn px-1 px-md-5 btn-warning text-white"
          loading={loading}
          disabled={!formik.isValid || !valuesChanged}
          style={{ outline: "none", boxShadow: "none" }}
        />
      </div>
    </form>
  );
}
