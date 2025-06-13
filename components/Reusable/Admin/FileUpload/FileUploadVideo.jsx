"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function FileUploadVideo({
  title = "Upload Video",
  showTitle = true,
  showBorder = true,
  videoUrl = "",
  dimensionNote = "",
  onFileChange,
}) {
  const inputRef = useRef();
  // const [previewSrc, setPreviewSrc] = useState(null);
  const [fileName, setFileName] = useState("No File Chosen");
// useEffect(() => {
//   setPreviewSrc(videoUrl);
// }, [videoUrl]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setFileName(file.name);
      const reader = new FileReader();
      // reader.onload = () => {
      //   setPreviewSrc(reader.result);
      // };

      reader.readAsDataURL(file);
 
      onFileChange(file);
    } else {
      setFileName("No File Chosen");
    onFileChange(null);
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="p-2">
      {showTitle && <h6>{title}</h6>}
      <div
        className={`p-3 d-flex flex-column flex-md-row align-items-start gap-3 ${
          showBorder ? "border rounded-2" : ""
        }`}
      >
        {/* Preview box */}
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
          {videoUrl  ? (
            <video
            key={videoUrl}
              width="100%"
              height="100%"
              controls
              style={{ objectFit: "cover" }}
            >
              <source src={videoUrl } type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src="/icons/DefaultPreviewImage.png"
              width={100}
              height={100}
              alt="Default Preview"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          )}
        </div>

        {/* File upload UI */}
        <div className="w-100">
          <p className="fw-light text-black mb-2" style={{ fontSize: "14px" }}>
            <em>Please upload video</em>
          </p>
          {dimensionNote && (
            <p className=" text-black" style={{ fontSize: "10px" }}>
              <em>{dimensionNote}</em>
            </p>
          )}
          <input
            type="file"
            ref={inputRef}
            accept="video/*"
            onChange={handleVideoChange}
            className="d-none"
          />
          <div className="d-flex mt-md-4 flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
            <button
              type="button"
              className="btn btn-outline-warning px-3"
              style={{ whiteSpace: "nowrap", minWidth: "120px" }}
              onClick={handleButtonClick}
            >
              Choose File
            </button>
            <p
              className="mb-0 text-muted small text-truncate"
              style={{ maxWidth: "100%", width: "200px" }}
            >
              {videoUrl ? "":fileName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
