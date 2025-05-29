"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateLocationOverview } from "@/service/mainPageService"; // Replace with your actual API function
import { Button } from "primereact/button";

export default function NavLocationOverview({ Location, toast, fetchData }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      latitude: Location.latitude || "",
      longitude: Location.longitude || "",
      location: Location.location || "", // Typo preserved as per original
      dates: Location.dates || "",
      headerTexting: Location.headerTexting || "", // Added for extra field
    },
    validationSchema: Yup.object({
      latitude: Yup.string().required("Latitude is required"),
      longitude: Yup.string().required("Longitude is required"),
      location: Yup.string().required("Location is required"),
      dates: Yup.string().required("Dates are required"),
      headerTexting: Yup.string().required("Header Texting is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await updateLocationOverview(values); // Call your backend service
        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail: response.data?.detail?.[0]?.msg || "Location updated successfully.",
            life: 3000,
          });
          fetchData();
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Warning!",
            detail: response.data?.detail?.[0]?.msg || "Unexpected response.",
            life: 3000,
          });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to update location. Please try again.",
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const valuesChanged =
    formik.values.latitude !== Location.latitude ||
    formik.values.longitude !== Location.longitude ||
    formik.values.location !== Location.loation ||
    formik.values.dates !== Location.dates ||
    formik.values.headerTexting !== Location.headerTexting;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-4 row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Latitude</label>
          <input
            type="text"
            name="latitude"
            className="form-control"
            placeholder="13.0843° N"
            {...formik.getFieldProps("latitude")}
          />
          {formik.touched.latitude && formik.errors.latitude && (
            <div className="text-danger">{formik.errors.latitude}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Longitude</label>
          <input
            type="text"
            name="longitude"
            className="form-control"
            placeholder="80.2705° E"
            {...formik.getFieldProps("longitude")}
          />
          {formik.touched.longitude && formik.errors.longitude && (
            <div className="text-danger">{formik.errors.longitude}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            placeholder="Dubai, UAE"
            {...formik.getFieldProps("location")}
          />
          {formik.touched.location && formik.errors.location && (
            <div className="text-danger">{formik.errors.location}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Dates</label>
          <input
            type="text"
            name="dates"
            className="form-control"
            placeholder="26-27 February 2025"
            {...formik.getFieldProps("dates")}
          />
          {formik.touched.dates && formik.errors.dates && (
            <div className="text-danger">{formik.errors.dates}</div>
          )}
        </div>

        <div className="col-md-12 mb-3">
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
        </div>
      </div>

      <div className="mt-5 p-2 d-flex justify-content-start gap-2">

          <Button
                         label="Save Changes"
                         type="submit"
                         className="btn px-5 btn-warning text-white"
                         loading={loading}
                        disabled={!formik.isValid || !valuesChanged}
                         style={{ outline: "none", boxShadow: "none" }}
                       />
      </div>
    </form>
  );
}
