"use client";
import React, { useState, useRef } from "react";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { Toast } from "primereact/toast";
import { uploadImage } from "@/service/mediaManagemnt";
import { saveConferenceLandingPage } from "@/service/adminConference";
export default function LandingPage({ selectedConferenceID }) {
  const [uploads, setUploads] = useState([{ id: Date.now(), file: null }]);
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    location: "",
    address: "",
    startTime: "",
    endTime: "",
  });

  const isFormFilled =
  formData.startDate &&
  formData.endDate &&
  formData.location &&
  formData.address &&
  formData.startTime &&
  formData.endTime;

const hasAtLeastOneFile = uploads.some((upload) => upload.file);
const formValid = isFormFilled && hasAtLeastOneFile;

  // Add new upload block
  const handleAddUpload = () => {
    setUploads([...uploads, { id: Date.now(), file: null }]);
  };

  // Remove upload block
  const handleRemoveUpload = (id) => {
    if (uploads.length > 2) {
      setUploads(uploads.filter((upload) => upload.id !== id));
    }
  };

  // Set file for a specific upload
  const handleFileChange = (file, id) => {
    setUploads((prev) =>
      prev.map((upload) => (upload.id === id ? { ...upload, file } : upload))
    );
  };

  // Handle input fields
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle full form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if at least one file is uploaded
    const hasAtLeastOneFile = uploads.some((upload) => upload.file);
    if (!hasAtLeastOneFile) {
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

      // Handle image uploads
      try {
        const uploadPromises = uploads
          .filter((upload) => upload.file) // Filter out uploads without files
          .map((upload) => uploadImage(upload.file)); // Call uploadImage function for each file

        const imageUploadResponses = await Promise.all(uploadPromises);
        imageUrls = imageUploadResponses.map((res) => res.url || ""); // Store URLs in imageUrls
      } catch (imageError) {
        toast.current.show({
          severity: "error",
          summary: "Image Upload Error",
          detail:
            "Failed to upload one or more landing images. Please try again.",
          life: 3000,
        });
        return;
      }
      // Final payload
      const finalPayload = {
        images: imageUrls,
        ...formData,
      };

      const response = await saveConferenceLandingPage(
        finalPayload,
        selectedConferenceID
      );

      if (response[0].msg === "Landing page updated successfully") {
        setUploads([{ id: Date.now(), file: null }]);
        setFormData({
          startDate: "",
          endDate: "",
          location: "",
          address: "",
          startTime: "",
          endTime: "",
        });
        toast.current.show({
          severity: "success",
          summary: "Success!",
          detail: "The form has been submitted successfully.",
          life: 3000,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Submission failed",
        detail: "Failed to Submission The Form . Please try again.",
        life: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toast ref={toast} />

      <div className="mb-2">
        <label className="form-label">Upload Landing Page Images</label>
        <button
          type="button"
          className="btn btn-outline-warning rounded ms-2"
          onClick={handleAddUpload}
        >
          <i className="bx bx-plus"></i>
        </button>
      </div>

      <div className="border rounded p-2 d-flex flex-column gap-3">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2 px-2"
          >
            <div className="flex-grow-1 w-100">
              <FileUpload
                showBorder={false}
                showTitle={false}
                onFileChange={(file) => handleFileChange(file, upload.id)}
              />
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleRemoveUpload(upload.id)}
              title="Delete"
            >
              <i className="bx bx-trash" style={{ fontSize: "20px" }}></i>
            </button>
          </div>
        ))}
      </div>

      {/* Conference Date Inputs */}
      <div className="mt-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="startDate" className="form-label">
              Start Date of Conference
            </label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date of Conference
            </label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Event Details */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="location" className="form-label">
              Event Location
            </label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="DUBAI, United Arab Emirates"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="address" className="form-label">
              Event Address
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="DUBAI, United Arab Emirates"
              required
            />
          </div>
        </div>

        {/* Event Time */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="startTime" className="form-label">
              Event Start Time
            </label>
            <input
              type="time"
              name="startTime"
              className="form-control"
              value={formData.startTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="endTime" className="form-label">
              Event End Time
            </label>
            <input
              type="time"
              name="endTime"
              className="form-control"
              value={formData.endTime}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="bg-secondary bg-opacity-10 mt-4 p-2 d-flex justify-content-end align-items-center gap-2 w-100">
          <button type="button" className="btn px-5 bg-white border"   disabled={!formValid}>
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
      </div>
    </form>
  );
}
