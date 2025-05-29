"use client";
import { useRef, useState, useEffect } from "react";

export default function DropZoneFile({
  onFileSelect,
  uploadedFileUrl,
  onRemove,
  progress = 0,
}) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect(selectedFile); // Notify parent
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      onFileSelect(droppedFile); // Notify parent
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleRemove = () => {
    setFile(null);
    fileInputRef.current.value = "";
    onRemove(); // Notify parent
  };

  useEffect(() => {
    // Reset file if uploadedFileUrl is cleared by parent
    if (!uploadedFileUrl) setFile(null);
  }, [uploadedFileUrl]);

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 KB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <>
      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.svg"
        className="d-none"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {!file && uploadedFileUrl ? (
        // Show existing uploaded file preview
        <div className="border rounded-4 p-3 shadow-sm" style={{ borderColor: "#a78bfa" }}>
          <div className="d-flex align-items-center gap-3 mb-2">
            <div
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: 40, height: 40, backgroundColor: "#f5f3ff" }}
            >
              <i className="pi pi-file-pdf pi-sm text-danger"></i>
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold text-truncate" style={{ width: 250 }}>
                <a
                  href={uploadedFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  View Uploaded Brochure
                </a>
              </div>
            </div>
            <button className="btn p-0" onClick={handleRemove}>
              <i className="bx bx-trash bx-sm"></i>
            </button>
          </div>
        </div>
      ) : !file ? (
        // Upload prompt UI
        <label
          className="border border-primary-subtle rounded-4 w-100 p-5 text-center"
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{ cursor: "pointer", borderStyle: "dashed" }}
        >
          <div
            className="rounded-circle bg-light d-flex justify-content-center align-items-center mx-auto mb-3"
            style={{ width: 60, height: 60 }}
          >
            <i className="pi pi-cloud-upload pi-sm text-secondary"></i>
          </div>
          <p className="mb-1">
            <span className="text-primary fw-medium">Click to upload</span> or drag and drop
          </p>
          <small className="text-muted">PDF, PNG, JPG, SVG (max. 800×400px)</small>
        </label>
      ) : (
        // Show selected file upload UI with progress
        <div className="border rounded-4 p-3 shadow-sm" style={{ borderColor: "#a78bfa" }}>
          <div className="d-flex align-items-center gap-3 mb-2">
            <div
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: 40, height: 40, backgroundColor: "#f5f3ff" }}
            >
              <i className="pi pi-file pi-sm text-primary"></i>
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold text-truncate" style={{ width: 250 }}>
                {file.name}
              </div>
              <div className="text-muted small">{formatSize(file.size)}</div>
            </div>
            <button className="btn p-0" onClick={handleRemove}>
              <i className="bx bx-trash bx-sm"></i>
            </button>
          </div>
          <div className="progress" style={{ height: 6 }}>
            <div
              className="progress-bar"
              style={{
                width: `${progress}%`,
                backgroundColor: "#3306D6",
              }}
            ></div>
          </div>
          <div className="text-end small mt-1 text-dark">{progress}%</div>
        </div>
      )}
    </>
  );
}
