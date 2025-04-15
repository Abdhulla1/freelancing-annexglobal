"use client";
import React, { useState } from "react";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";

export default function LandingPage() {
  const [uploads, setUploads] = useState([{ id: Date.now() }]);
  const [startDate, setStartDate] = useState(new Date());

  const handleAddUpload = () => {
    setUploads([...uploads, { id: Date.now() }]);
    console.log(uploads);
  };

  const handleRemoveUpload = (id) => {
    if (uploads.length > 2) {
      setUploads(uploads.filter((upload) => upload.id !== id));
    }
  };

  return (
    <>
      <div className="mb-2">
        <label className="form-label">Upload Landing page images</label>
        <button
          name="view"
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
              <FileUpload showBorder={false} showTitle={false} />
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleRemoveUpload(upload.id)}
              title="Delete"
            >
              <i className="bx bx-trash" style={{ fontSize: "20px" }}></i>
            </button>
          </div>
        ))}
      </div>
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
            id="startDate"
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date of Conference
          </label>
          <input
            type="date"
            name="startDate"
            className="form-control"
            id="startDate"
            required
          />
        </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="eventLocation" className="form-label">
              Event Location
            </label>
            <input
              type="text"
              name="eventLocation"
              className="form-control"
              id="eventLocation"
              placeholder="DUBAI, United Arab Emirates"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="eventAddress" className="form-label">
              Event Address
            </label>
            <input
              type="text"
              name="eventAddress"
              className="form-control"
              id="eventAddress"
              placeholder="DUBAI, United Arab Emirates"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="eventStartTime" className="form-label">
              Event Start Time
            </label>
            <input
              type="time"
              name="eventStartTime"
              className="form-control"
              id="eventStartTime"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="eventEndTime" className="form-label">
              Event End Time
            </label>
            <input
              type="time"
              name="eventEndTime"
              className="form-control"
              id="eventEndTime"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
}
