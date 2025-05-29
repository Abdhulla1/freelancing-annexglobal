"use client";
import React, { useState,useRef } from "react";
import { Toast } from "primereact/toast";

import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import UploadAbstract from "../ConferencePageAdmin/UploadAbstract/UploadAbstract";

export default function SubmitAbstractAdmin({ selectedConferenceID,abstract,fetchConfernceData}) {
     const toast = useRef(null);

  const [activeTab, setActiveTab] = useState("Upload Abstract"); // default to first tab
  
      const tabs = {
        "Upload Abstract": (
          <UploadAbstract selectedConferenceID={selectedConferenceID}
        abstract={abstract}
        fetchConfernceData={fetchConfernceData}
        toast={toast}/>
        ),

      };
  
  return (
    <>
              <Toast ref={toast} />
    
      <div className="d-flex justify-content-between">
        <h5>Submit Abstract</h5>
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
