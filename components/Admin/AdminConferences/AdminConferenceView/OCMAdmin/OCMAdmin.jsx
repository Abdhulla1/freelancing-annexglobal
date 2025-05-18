"use client";
import React, { useState } from "react";
import OCMTabelAdmin from "./OCMTabelAdmin/OCMTabelAdmin";
import LandingPage from "./LandingPage/LandingPage";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";

export default function OCMAdmin() {
 const [activeTab, setActiveTab] = useState("Organizing Committee Members"); // default to first tab
  const tabs = {
    "Organizing Committee Members": <OCMTabelAdmin/>,
    "Header Panel Images": <LandingPage/>,
  };
  
  return (
    <>

      <div className="d-flex justify-content-between">
        <h5>Organizing Committee Members</h5>
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
