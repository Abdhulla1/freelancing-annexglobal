import React, { useState } from "react";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";

export default function LandingPage({
  visibleDetails,
  setVisibleDetails,
}) {
  return (
    <div className="container">
    <h6>Landing Page Images</h6>
      <div className="border rounded-2 mb-2">
        <FileUpload showTitle={false} showBorder={false} />
        <FileUpload showTitle={false} showBorder={false} />
        <FileUpload showTitle={false} showBorder={false} />
        <FileUpload showTitle={false} showBorder={false} />
        <FileUpload showTitle={false} showBorder={false} />
     
      </div>

    </div>
  );
}
