"use client";
import React,{useState} from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import WebinarLandingAdmin from "./WebinarLandingAdmin/WebinarLandingAdmin";
import WebinarWelcomeContent from "./WebinarWelcomeContent/WebinarWelcomeContent";
import WebinarVideoSection from "./WebinarVideoSection/WebinarVideoSection";
// import WebinarProgramAdmin from "./WebinarProgramAdmin/WebinarProgramAdmin";

import WebinarFAQAdmin from "./WebinarFAQAdmin/WebinarFAQAdmin";




export default function WebinarPageAdmin() {
  const [activeTab, setActiveTab] = useState("Header Panel Images"); // default to first tab
  const tabs = {
    "Header Panel Images": <WebinarLandingAdmin/>,
    "Welcome Content": <WebinarWelcomeContent/>,
    "Video Section": <WebinarVideoSection/>,
    "Queries Answered":<WebinarFAQAdmin/> ,
  };
  
  return (
    <>

      <div className="d-flex justify-content-between">
        <h5>Webinar</h5>
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
