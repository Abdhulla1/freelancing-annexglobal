"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveConferenceWebinarLandingPage } from "@/service/AdminConfernecePages/confernce";
export default function LandingPage({
  selectedConferenceID,
  toast,
  LandingPageData,
  fetchConfernceData,
}) {
  const [buttonLoading, setButtonLoading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
     
      startDate: LandingPageData?.startDate || "",
      endDate: LandingPageData?.endDate || "",
      location: LandingPageData?.location || "",
      address: LandingPageData?.address || "",
      startTime: LandingPageData?.startTime || "",
      endTime: LandingPageData?.endTime || "",
    },
    validationSchema: Yup.object({
  
      startDate: Yup.string().required("Start Date is required"),
      endDate: Yup.string().required("End Date is required"),
      location: Yup.string().required("Location is required"),
      address: Yup.string().required("Address is required"),
      startTime: Yup.string().required("Start Time is required"),
      endTime: Yup.string().required("End Time is required"),
   
    }),
    onSubmit: async (values) => {
      setButtonLoading(true);
      try {
        const payload = {
          ...values,
        };
        const response = await saveConferenceWebinarLandingPage(
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

  return (
    <form onSubmit={formik.handleSubmit}>

      <div className="row mt-4">
        {[
  
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
