import React, { useState, useEffect } from "react";
import RichTextEditor from "../../AdminConferences/AdminConferenceView/ConferencePageAdmin/LandingPage/RichTextEditor";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { updateMainWelcomeContent } from "@/service/mainPageService";
export default function WelcomeContent({WelcomeContent,toast,fetchData}) {
  const [buttonLoading, setButtonLoading] = useState(false);

const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      heading: WelcomeContent.heading || "",
      title: WelcomeContent.title || "",
      content: WelcomeContent.content || "",
    },
    validationSchema: Yup.object({
      heading: Yup.string().required("Heading is required"),
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      setButtonLoading(true);
      try {
        const response = await updateMainWelcomeContent(values);

       if (response.status===200) {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail:response.data?.detail?.[0]?.msg  ||  "Welcome content updated successfully",
            life: 3000,
          });
          fetchData(); // Refresh data after successful update
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Unknown response",
            detail: response.data?.detail?.[0]?.msg  ||  "Unknown server response",
            life: 3000,
          });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Submission failed",
          detail: "Failed to submit Welcome Content. Please try again.",
          life: 3000,
        });
      }finally{
        setButtonLoading(false);
      }
    },
  });
const valuesChanged =
    formik.values.heading !== WelcomeContent.heading ||
    formik.values.title !== WelcomeContent.title ||
    formik.values.content !== WelcomeContent.content;
  return (
      <form onSubmit={formik.handleSubmit} className="mt-5">
      <div className="mb-4">
        <label htmlFor="heading" className="form-label">
          Heading
        </label>
        <input
          type="text"
          name="heading"
          className="form-control"
          placeholder="Enter Heading"
          {...formik.getFieldProps("heading")}
        />
        {formik.touched.heading && formik.errors.heading && (
          <div className="text-danger">{formik.errors.heading}</div>
        )}
      </div>

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

      <RichTextEditor
        labelName="Content"
        initialValue={formik.values.content}
        onChange={(value) => formik.setFieldValue("content", value)}
        height="320px"
      />
      {formik.touched.content && formik.errors.content && (
        <div className="text-danger mt-2">{formik.errors.content}</div>
      )}

      <div className=" mt-4 p-2 d-flex justify-content-start align-items-center gap-2 w-100">
  

                <Button
                  label="Save Changes"
                  type="submit"
                  className="btn px-5 btn-warning text-white"
                  loading={buttonLoading}
                   disabled={!formik.isValid || !valuesChanged}
                  style={{ outline: "none", boxShadow: "none" }}
                />
      </div>
    </form>
  );
}
