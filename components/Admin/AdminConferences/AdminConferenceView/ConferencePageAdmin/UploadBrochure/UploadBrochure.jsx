import React, { useState, useEffect } from "react";
import DropZoneFile from "@/components/Reusable/DropeZone/DropZoneFile";
import { uploadPDF } from "@/service/mediaManagemnt";
import { updateBroucher } from "@/service/AdminConfernecePages/confernce";
export default function UploadBrochure({
  selectedConferenceID,
  brochure,
  fetchConfernceData,
  toast,
}) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(brochure||"");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setUploadProgress(0);
    try {
      const response = await uploadPDF(file, (percent) => {
        setUploadProgress(percent);
      });

      const url = response.data?.detail?.message?.[0]?.url;
      if (url) {

      const response = await updateBroucher(selectedConferenceID,{brochure: url});
        if (response.status === 200) {
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Brochure uploaded successfully",
            life: 3000,
          });
          fetchConfernceData();
        } else {
          throw new Error("Failed to update brochure");
        }

        setUploadedFileUrl(url);
      } else {
        throw new Error("Upload failed. No URL returned.");
      }
    } catch (error) {
        toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: error.message||"Brochure uploaded Failed",
            life: 3000,
          });
    }
  };
  const handleRemove = () => {
    setSelectedFile(null);
    setUploadedFileUrl("");
    setUploadProgress(0);
  };

  return (
    <div className="mt-5 ">
      <div className="d-flex justify-content-between"></div>
      <div>
        <div>
          <label className="form-label">Upload Brochure</label>
          <DropZoneFile
            onFileSelect={handleFileSelect}
            uploadedFileUrl={uploadedFileUrl}
            onRemove={handleRemove}
            progress={uploadProgress}
          />{" "}
        </div>
      </div>
    </div>
  );
}
