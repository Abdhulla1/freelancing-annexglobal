"use client";
import React, { useState } from "react";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";

export default function PastGallery() {
  const [uploads, setUploads] = useState([{ id: Date.now() }]);
  
  const handleAddUpload = () => {
    setUploads([...uploads, { id: Date.now() }]);
  };

  const handleRemoveUpload = (id) => {
    if (uploads.length > 3) {
      setUploads(uploads.filter((upload) => upload.id !== id));
    }
  };

  return (
    <>
          <FileUpload title={"Upload Gallery Card Image"} showBorder={true} />
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={''}
                  onChange={(e)=>console.log(e.value)}
                  placeholder="Nursing 2025"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Date And Location</label>
                <input
                  type="text"
                  name="conference"
                  className="form-control"
                  value={''}
                  onChange={(e)=>console.log(e.value)}
                  placeholder="March 10/11/2025 | Dubai, UAE"
                  required
                />
              </div>
            </div>
    <div className="mb-2">
    <label className="form-label">Gallery images</label>
      <button
        name="view"
        className="btn btn-outline-warning rounded ms-2"
        onClick={handleAddUpload}
      >
        <i className="bx bx-plus"></i>
      </button>
    </div>
    
    <div className="border rounded p-2 d-flex flex-column gap-3" style={{maxHeight:"500px",overflowY:"auto"}}>
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
         <div className="bg-secondary bg-opacity-10 mt-4 p-2 d-flex justify-content-end align-items-center gap-2 w-100">
        <button
          type="button"
          className="btn px-5 bg-white border"
        >
          Cancel
        </button>
        <button
          className="btn px-1 px-md-5 btn-warning text-white"
 
        >
          Save Changes
        </button>
      </div>
    </>
  );
}
