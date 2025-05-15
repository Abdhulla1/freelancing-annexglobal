"use client";
import React, { useState, useEffect } from "react";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { uploadImage } from "@/service/mediaManagemnt";
import {
  saveConferenceLandingPage,
  getSelectedConference,
} from "@/service/adminConference";

export default function NavLocationOverview({ selectedConferenceID, toast }) {
  const [formData, setFormData] = useState({
   latitude: "",
  longitude: "",
  loation: "",
  dates: ""
  });

  // Fetch data on component mount or ID change
  // useEffect(() => {
  //   const fetchLandingPageData = async () => {
  //     try {
  //       const res= await getSelectedConference(selectedConferenceID);
  //       const landing = res?.conference?.landingPage;
  //       if (res.status === 404) {
  //         router.push("/notFound");
  //       }
  //       if (landing) {
  //         setFormData({
  //           startDate: landing.startDate || "",
  //           endDate: landing.endDate || "",
  //           location: landing.location || "",
  //           address: landing.address || "",
  //           startTime: landing.startTime || "",
  //           endTime: landing.endTime || "",
  //         });

  //         if (landing.images && landing.images.length > 0) {
  //           setUploads(
  //             landing.images.map((imgUrl) => ({
  //               id: Date.now() + Math.random(),
  //               file: { preview: imgUrl, isUploaded: true }, // Custom format for existing images
  //             }))

  //           );
  //         }
  //       }
  //     } catch (error) {
  //       toast.current?.show({
  //         severity: "error",
  //         summary: "Fetch Error",
  //         detail: "Failed to load existing landing page data.",
  //         life: 3000,
  //       });
  //     }
  //   };

  //   fetchLandingPageData();
  // }, [selectedConferenceID]);

  const isFormFilled = formData.title && formData.heading && formData.subTitle;

  const formValid = isFormFilled;

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasFile = uploads.some((upload) => upload.file);
    if (!hasFile) {
      toast.current.show({
        severity: "error",
        summary: "Image Upload Error",
        detail: "Please upload at least one landing image before submitting.",
        life: 3000,
      });
      return;
    }

    try {
      let imageUrls = [];

      const uploadPromises = uploads.map(async (upload) => {
        if (upload.file?.isUploaded) {
          return { url: upload.file.preview };
        } else if (upload.file) {
          return await uploadImage(upload.file);
        } else {
          return null;
        }
      });

      const responses = await Promise.all(uploadPromises);
      imageUrls = responses.filter(Boolean).map((res) => res.url);

      const finalPayload = {
        images: imageUrls,
        ...formData,
      };

      const response = await saveConferenceLandingPage(
        finalPayload,
        selectedConferenceID
      );

      if (response[0].msg === "Landing page updated successfully") {
        toast.current.show({
          severity: "success",
          summary: "Success!",
          detail: "The form has been submitted successfully.",
          life: 3000,
        });
      } else if (response[0].msg === "No modifications found") {
        toast.current.show({
          severity: "warn",
          summary: "Warning",
          detail: "No modifications found",
          life: 3000,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Submission failed",
        detail: "Failed to submit the form. Please try again.",
        life: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-4">

        <div className="row mb-3">
          <div className="col-md-6 ">
            <label className="form-label">Latitude</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={formData.latitude}
              onChange={handleInputChange}
              placeholder="Category Name"
              required
            />
          </div>
          <div className="col-md-6 ">
            <label className="form-label">Longitude</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.longitude}
              onChange={handleInputChange}
              placeholder="Category Name"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6 ">
            <label className="form-label">Loation</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={formData.loation}
              onChange={handleInputChange}
              placeholder="Category Name"
              required
            />
          </div>
          <div className="col-md-6 ">
            <label className="form-label">Dates</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.dates}
              onChange={handleInputChange}
              placeholder="Category Name"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-secondary bg-opacity-10 mt-5 p-2 d-flex justify-content-end align-items-center gap-2 w-100">
        <button
          type="button"
          className="btn px-5 bg-white border"
          disabled={!formValid}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn px-1 px-md-5 btn-warning text-white"
          disabled={!formValid}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
