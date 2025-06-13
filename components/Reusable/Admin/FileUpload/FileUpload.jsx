"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { deleteMedia } from "@/service/mediaManagemnt";

export default function FileUpload({
  title = "Upload Image",
  showTitle = true,
  showBorder = true,
  showDelete = false,
  imageUrl = "",
  onFileChange,
  dimensionNote = "",
  toast,
}) {
  const inputRef = useRef();
  const [previewSrc, setPreviewSrc] = useState(
    "/icons/DefaultPreviewImage.png"
  );
  const [fileName, setFileName] = useState("No File Chosen");
  useEffect(() => {
    if (imageUrl) {
      setPreviewSrc(imageUrl);
    }
  }, [imageUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
      onFileChange(file);
    } else {
      setFileName("No File Chosen");
      setPreviewSrc("/icons/DefaultPreviewImage.png");
    }
  };
  // const handleDelete = () => {
  //   setPreviewSrc("/icons/DefaultPreviewImage.png");
  //   setFileName("No File Chosen");
  //   imageUrl="";
  //   inputRef.current.value = "";
  //   onFileChange?.("");
  // };
  const handleDelete = async () => {
    try {
      // ✅ If the image is from server (not a blob), call onDelete to trigger API
      if (imageUrl && !imageUrl.startsWith("blob:")) {
        await deleteMedia("image", imageUrl);
        console.log("deleted");
      }

      // Reset everything
      setPreviewSrc("/icons/DefaultPreviewImage.png");
      setFileName("No File Chosen");
      inputRef.current.value = "";
      onFileChange?.(null); // notify parent image is removed
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Submission failed",
        detail:  "Failed to Delete Image Page.",
        life: 3000,
      });
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
          <p className="fw-light text-black mb-2" style={{ fontSize: "13px" }}>
            <em>Please upload square image, size less than 100KB</em>
          </p>
          {dimensionNote && (
            <p className=" text-black" style={{ fontSize: "10px" }}>
              <em>{dimensionNote}</em>
            </p>
          )}
          <input
            type="file"
            ref={inputRef}
            accept="image/*"
            onChange={handleImageChange}
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
              style={{
                maxWidth: "100%",
                width: "150px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {imageUrl ? "" : fileName}
            </p>
          </div>
        </div>
        {showDelete && (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger text-center"
            onClick={handleDelete}
            title="Delete"
          >
            <i className="bx bx-trash" style={{ fontSize: "20px" }}></i>
          </button>
        )}
      </div>
    </div>
  );
}
