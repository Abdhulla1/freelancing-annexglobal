import React, { useState, useRef } from "react";
import Image from "next/image";

export default function FileUpload({
  title = "Upload Image",
  showTitle = true,
  showBorder = true,
  showDelete = false,
}) {
  const inputRef = useRef();
  const [previewSrc, setPreviewSrc] = useState(
    "/icons/DefaultPreviewImage.png"
  );
  const [fileName, setFileName] = useState("No File Chosen");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("No File Chosen");
      setPreviewSrc("/icons/DefaultPreviewImage.png");
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="p-2">
      {showTitle && <h6>{title}</h6>}
      <div
        className={`p-3 d-flex flex-column flex-md-row align-items-center gap-3 ${
          showBorder ? "border rounded-2" : ""
        }`}
      >
        {/* Responsive Preview Container */}
        <div
          style={{
            width: "100%",
            maxWidth: "100px",
            height: "100px",
            overflow: "hidden",
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
            flexShrink: 0,
          }}
        >
          <Image
            src={previewSrc}
            alt="Upload Preview"
            width={100}
            height={100}
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
        </div>

        {/* File upload UI */}
        <div className="w-100">
          <p className="fw-light text-black mb-2" style={{ fontSize: "14px" }}>
            <em>Please upload square image, size less than 100KB</em>
          </p>
          <input
            type="file"
            ref={inputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="d-none"
          />
          <div className="d-flex mt-md-4 flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
            <button
              className="btn btn-outline-warning px-3"
              style={{ whiteSpace: "nowrap", minWidth: "120px" }}
              onClick={handleButtonClick}
            >
              Choose File
            </button>
            <p
              className="mb-0 text-muted small text-truncate"
              style={{
                maxWidth: "100%",
                width: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {fileName}
            </p>
            
          </div>
          
        </div>
        {showDelete &&   <button
                    className="btn btn-sm btn-outline-danger text-center"
                    title="Delete"
                  >
                    <i className="bx bx-trash" style={{ fontSize: "20px" }}></i>
                  </button>}
      
      </div>
      
    </div>
  );
}
