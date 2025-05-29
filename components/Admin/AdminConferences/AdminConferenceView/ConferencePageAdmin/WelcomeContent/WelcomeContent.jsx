import React, { useState, useEffect } from "react";
import RichTextEditor from "../LandingPage/RichTextEditor";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveWelcomeContent } from "@/service/AdminConfernecePages/confernce";
export default function WelcomeContent({ selectedConferenceID,welcomeContent,fetchConfernceData,toast}) {
  const [buttonLoading, setButtonLoading] = useState(false);

const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: welcomeContent.title || "",
      content: welcomeContent.content || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      setButtonLoading(true);
      try {
        const payload={
            contentType: "Conference",
            ...values,
        }
        const response = await saveWelcomeContent(payload, selectedConferenceID); 
        console.log("Response from server:", response);
       if (response.status===200) {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail:response.data?.detail?.[0]?.msg  ||  "Welcome content updated successfully",
            life: 3000,
          });
          fetchConfernceData(); // Refresh data after successful update
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
    formik.values.title !== welcomeContent.title ||
    formik.values.content !== welcomeContent.content;
  return (
      <form onSubmit={formik.handleSubmit} className="mt-5">

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
          {buttonLoading ? "Saving..." : "Save Changes"}
        </button>
    
      </div>
    </form>
  );
}
