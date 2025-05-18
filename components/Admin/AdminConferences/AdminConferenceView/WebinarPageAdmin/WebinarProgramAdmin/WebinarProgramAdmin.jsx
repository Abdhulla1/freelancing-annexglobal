"use client";
import React, { useState } from "react";
import WebinarProgramTableAdmin from "./WebinarProgramTableAdmin";
import HeaderPannelImages from "./HeaderPannelImages";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";

export default function OCMAdmin() {
 const [activeTab, setActiveTab] = useState("Header Panel Images"); // default to first tab
  const tabs = {
      "Header Panel Images": <HeaderPannelImages/>,
    "Scientific Program Admin": <WebinarProgramTableAdmin/>,
  };
  
  return (
    <>

      <div className="d-flex justify-content-between">
   <h5>Webinar Program</h5>
        {/* <button className="btn btn-warning text-white">
       Publish
        </button> */}
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
