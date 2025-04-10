"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

export default function FileUpload({title}) {
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
    }else{
        setFileName("No File Chosen");
    }
  };
  const handleButtonClick = () => {
    inputRef.current.click();
  };
  return (
    <div className="p-2">
        <h6>{title}</h6>
      <div className="border rounded-2 p-3 d-flex align-item-center justify-content-center gap-4 ">
        <Image
          src={previewSrc}
          width={100}
          height={100}
          alt="Upload Preview"
          className="rounded-2"
        />
        <div className="p-2 ">
        <p className="fw-light text-black">
          <em>Please upload square image, size less than 100KB</em>
        </p>
        <input
          type="file"
          ref={inputRef}
          id="imageInput"
          accept="image/*"
          onChange={handleImageChange}
          className="d-none"
        />
  <div className="d-flex align-items-center gap-2">
    <button
      className="btn btn-outline-warning px-3"
      onClick={handleButtonClick}
    >
      Choose File
    </button>
    <p className="mb-0 ms-3 small text-muted text-truncate col-5">{fileName}</p>
  </div>
        </div>
     
      </div>
    </div>
  );
}
