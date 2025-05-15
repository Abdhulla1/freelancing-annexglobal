import React, { useState } from "react";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";

export default function LandingPage({
  visibleDetails,
  setVisibleDetails,
}) {
  return (
    <div className="container">
      <div className=" mb-2">
        <FileUpload title={"Landing Image*"} showBorder={true} />
        <div>
          <label htmlFor="eventLocation" className="form-label">
            Name*
          </label>
          <input
            type="text"
            name="eventLocation"
            className="form-control"
            id="eventLocation"
            placeholder="Enter Name"
            required
          />
        </div>
      </div>

      <div className=" mb-2">
        <FileUpload title={"Landing Image*"} showBorder={true} />
        <div>
          <label htmlFor="eventLocation" className="form-label">
            Name*
          </label>
          <input
            type="text"
            name="eventLocation"
            className="form-control"
            id="eventLocation"
            placeholder="Enter Name"
            required
          />
        </div>
      </div>
    </div>
  );
}
