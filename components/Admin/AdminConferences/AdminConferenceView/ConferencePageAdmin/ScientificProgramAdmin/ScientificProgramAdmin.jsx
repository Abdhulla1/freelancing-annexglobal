"use client";
import React, { useState,useRef } from "react";
import ScientificProgramTableAdmin from "./ScientificProgramTableAdmin";
import HeaderPannelImages from "./HeaderPannelImages";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import { Toast } from "primereact/toast";

export default function ScientificProgramAdmin({
  selectedConferenceID,
  scientificProgram,
  fetchConfernceData,
}) {
     const toast = useRef(null);
  
 const [activeTab, setActiveTab] = useState("Header Panel Images"); // default to first tab
  const tabs = {
      "Header Panel Images": <HeaderPannelImages selectedConferenceID={selectedConferenceID}
        headerPannelImages={scientificProgram.headerPanelImages}
        fetchConfernceData={fetchConfernceData}
        toast={toast}/>,
    "Scientific Program Admin": <ScientificProgramTableAdmin  selectedConferenceID={selectedConferenceID}
        scientificProgram={scientificProgram.scientificProgramAdmin}
        fetchConfernceData={fetchConfernceData}
        toast={toast} />,
  };
  
  return (
    <>
      <Toast ref={toast} />

      <div className="d-flex justify-content-between">
   <h5>Scientific Program</h5>
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
