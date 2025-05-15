"use client";
import React, { useState } from "react";
import SpeakerTabelAdmin from "./SpeakerTabelAdmin/SpeakerTabelAdmin";
import LandingPage from "./LandingPage/LandingPage";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
export default function SpeakerAdmin() {
  const [activeTab, setActiveTab] = useState("Speakers"); // default to first tab
  const tabs = {
    "Speakers": <SpeakerTabelAdmin/>,
    "Landing Page": <LandingPage/>,
  };
  
  return (
    <>

      <div className="d-flex justify-content-between">
        <h5>Speakers</h5>
        <button className="btn btn-warning text-white">
       Publish
        </button>
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
