"use client";
import React, { useState } from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import UploadBrochure from "../ConferencePageAdmin/UploadBrochure/UploadBrochure";
export default function BrochureAdmin() {
 const [activeTab, setActiveTab] = useState("Upload Brochure"); // default to first tab

    const tabs = {
      "Upload Brochure": (
        <UploadBrochure/>
      ),

    };

    
  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>Brochure</h5>
        {/* <button className="btn btn-warning text-white">
           Publish
        </button> */}
      </div>
      <div className="mt-4 ">
          <ScrollableTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="mt-5">{tabs[activeTab]}</div>

      </div>
    </>
  );
}
