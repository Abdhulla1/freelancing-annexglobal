"use client";
import React, { useState, useEffect } from "react";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { uploadImage } from "@/service/mediaManagemnt";
import {
  saveConferenceLandingPage,
  getSelectedConference,
} from "@/service/adminConference";

export default function LandingPage({ selectedConferenceID, toast }) {
  const [uploads, setUploads] = useState([{ id: Date.now(), file: null }]);
  const [formData, setFormData] = useState({
    title:"",
    conference: "",
    theme: "",
    startDate: "",
    endDate: "",
    location: "",
    address: "",
    startTime: "",
    endTime: "",
  });

  // Fetch data on component mount or ID change
  useEffect(() => {
    const fetchLandingPageData = async () => {
      try {
        const res = await getSelectedConference(selectedConferenceID);
        const landing = res?.conference?.landingPage;
        if (res.status === 404) {
          router.push("/notFound");
        }
        if (landing) {
          setFormData({
                title: landing.title || "",
            conference: landing.conference || "",
            theme: landing.theme || "",
            startDate: landing.startDate || "",
            endDate: landing.endDate || "",
            location: landing.location || "",
            address: landing.address || "",
            startTime: landing.startTime || "",
            endTime: landing.endTime || "",
          });

          if (landing.images && landing.images.length > 0) {
            setUploads(
              landing.images.map((imgUrl) => ({
                id: Date.now() + Math.random(),
                file: { preview: imgUrl, isUploaded: true }, // Custom format for existing images
              }))
            );
          }
        }
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Fetch Error",
          detail: "Failed to load existing landing page data.",
          life: 3000,
        });
      }
    };

    fetchLandingPageData();
  }, [selectedConferenceID]);

  const isFormFilled =
    formData.title &&
    formData.conference &&
    formData.theme &&
    formData.startDate &&
    formData.endDate &&
    formData.location &&
    formData.address &&
    formData.startTime &&
    formData.endTime;

  const hasAtLeastOneFile = uploads.some((upload) => upload.file);
  const formValid = isFormFilled && hasAtLeastOneFile;

  const handleAddUpload = () => {
    setUploads([...uploads, { id: Date.now(), file: null }]);
  };

  const handleRemoveUpload = (id) => {
    if (uploads.length > 2) {
      setUploads(uploads.filter((upload) => upload.id !== id));
    }
  };

  const handleFileChange = (file, id) => {
    setUploads((prev) =>
      prev.map((upload) => (upload.id === id ? { ...upload, file } : upload))
    );
  };

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
      {/* <div className="mb-2">
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
                imageUrl={upload.file?.preview}
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
      </div> */}

      <div className="mt-4">
            <FileUpload
                title={'Upload Certificate Image'}
                showBorder={true}
              />
        <div className="row">
                    <div className="col-md-6 mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="2nd International Conference On"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Conference</label>
            <input
              type="text"
              name="conference"
              className="form-control"
              value={formData.conference}
              onChange={handleInputChange}
              placeholder="Primary Healthcare, Pain Management & Functional Structure"
              required
            />
          </div>

   
        </div>
        <div className="row">
                 <div className="col-md-6 mb-3">
            <label className="form-label">Theme</label>
            <input
              type="text"
              name="theme"
              className="form-control"
              value={formData.theme}
              onChange={handleInputChange}
              placeholder="Theme: “Enhancing Women’s Health: Improvement, Difficulties, and Innovative Thoughts in Obstetrics and Gynecology”"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Start Date of Conference</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>

    
        </div>

        <div className="row">
                <div className="col-md-6 mb-3">
            <label className="form-label">End Date of Conference</label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Event Location</label>
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

 
        </div>

        <div className="row">
                   <div className="col-md-6 mb-3">
            <label className="form-label">Event Address</label>
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
          <div className="col-md-6 mb-3">
            <label className="form-label">Event Start Time</label>
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
            <label className="form-label">Event End Time</label>
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

        <div className="bg-secondary bg-opacity-10 mt-4 p-2 d-flex justify-content-end align-items-center gap-2 w-100">
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
      </div>
    </form>
  );
}
