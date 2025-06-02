"use client";
import React, { useState,useRef } from "react";
import OCMTabelAdmin from "./OCMTabelAdmin/OCMTabelAdmin";
import LandingPage from "./LandingPage/LandingPage";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import { Toast } from "primereact/toast";

export default function OCMAdmin({
  selectedConferenceID,
  ocm,
  fetchConfernceData,
}) {
 const [activeTab, setActiveTab] = useState("Organizing Committee Members"); 
   const toast = useRef(null);
 // default to first tab
  const tabs = {
    "Organizing Committee Members": <OCMTabelAdmin selectedConferenceID={selectedConferenceID}
        ocmData={ocm.ocms}
        fetchConfernceData={fetchConfernceData}
        toast={toast}/>,
    "Header Panel Images": <LandingPage  selectedConferenceID={selectedConferenceID}
        headerPannelImages={ocm.headerPanelImages}
        fetchConfernceData={fetchConfernceData}
        toast={toast} />,
  };
  
  return (
    <>
      <Toast ref={toast} />

      <div className="d-flex justify-content-between">
        <h5>Organizing Committee Members</h5>
       
           {/* <i className="pi pi-eye px-2"></i>  */}
      </div>
      <div className="mt-4 ">
        {/*Tabs */}
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
