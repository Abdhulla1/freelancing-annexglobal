"use client";
import React, { useState } from "react";
import FileUploadVideo from "@/components/Reusable/Admin/FileUpload/FileUploadVideo";
export default function WebinarLandingAdmin() {
  const [uploads, setUploads] = useState([{ id: Date.now() }]);
  
  const handleAddUpload = () => {
    setUploads([...uploads, { id: Date.now() }]);
  };

  const handleRemoveUpload = (id) => {
    if (uploads.length > 1) {
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
              <FileUploadVideo showBorder={false} showTitle={false} />
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
    </>
  );
}
