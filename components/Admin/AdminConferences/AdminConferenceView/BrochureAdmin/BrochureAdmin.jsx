"use client";
import React, { useState,useRef } from "react";
import { Toast } from "primereact/toast";

import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import UploadBrochure from "../ConferencePageAdmin/UploadBrochure/UploadBrochure";
export default function BrochureAdmin({ selectedConferenceID,brochure,fetchConfernceData}) {
 const [activeTab, setActiveTab] = useState("Upload Brochure"); // default to first tab
     const toast = useRef(null);

    const tabs = {
      "Upload Brochure": (
        <UploadBrochure selectedConferenceID={selectedConferenceID}
        brochure={brochure}
        fetchConfernceData={fetchConfernceData}
        toast={toast}/>
      ),

    };

    
  return (
    <>
          <Toast ref={toast} />
    
      <div className="d-flex justify-content-between">
        <h5>Brochure</h5>

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
