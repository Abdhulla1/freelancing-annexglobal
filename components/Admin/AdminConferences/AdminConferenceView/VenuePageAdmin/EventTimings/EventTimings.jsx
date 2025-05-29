"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveEventTimingsSection } from "@/service/AdminConfernecePages/confernce";
 
export default function EventTimings({
  selectedConferenceID,
  toast,
  eventTimings,
  fetchConfernceData,
}) {
    const [buttonLoading, setButtonLoading] = useState(false);
     const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          eventDate: eventTimings.eventDate || "",
          eventTime: eventTimings.eventTime || "",
          hotelAddress: eventTimings.hotelAddress || "",
         
        },
        validationSchema: Yup.object({
          eventDate: Yup.string().required("EventDate is required"),
          eventTime: Yup.string().required("EventTime is required"),
          hotelAddress: Yup.string().required("HotelAddress is required"),
        }),
        onSubmit: async (values) => {
  
          try {
         const payload = {
          ...values,
        };
            const response = await saveEventTimingsSection(
              payload,
              selectedConferenceID
            );
            if (response.status=== 200) {
              toast.current.show({
                severity: "success",
                summary: "Success!",
                detail:
                  response.data?.detail?.[0]?.msg ||
                  "Event TimingsSection saved successfully.",
                life: 3000,
              });
              fetchConfernceData();
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
              detail: error.message || "Failed to save Landing Page.",
              life: 3000,
            });
          } finally {
            setButtonLoading(false);
          }
        },
      });
    
  return (
    <form onSubmit={formik.handleSubmit} className='mt-5 '>

      <div className="row mt-4">
        {[
          [" Event Date ", "eventDate", "text", "March 10-11, 2025"],
          ["Event Time ", "eventTime", "text", "09:00 AM - 06:00 PM"],
          ["Hotel Address", "hotelAddress", "text", "City Seasons hotel, Deira 2 27th st-port saeed - Dubai - UAE "],
      
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
  )
}
