"use client";
import React,{useState,useRef} from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import WebinarLandingAdmin from "./WebinarLandingAdmin/WebinarLandingAdmin";
import WebinarWelcomeContent from "./WebinarWelcomeContent/WebinarWelcomeContent";
import WebinarVideoSection from "./WebinarVideoSection/WebinarVideoSection";
import WebinarFAQAdmin from "./WebinarFAQAdmin/WebinarFAQAdmin";
import { Toast } from "primereact/toast";




export default function WebinarPageAdmin({ selectedConferenceID,webinar,fetchConfernceData}) {
    const toast = useRef(null);
  
  const [activeTab, setActiveTab] = useState("Header Panel Images"); // default to first tab
  const tabs = {
    "Header Panel Images": <WebinarLandingAdmin selectedConferenceID={selectedConferenceID}
        PastGalleryData={webinar.headerPanelImages}
        fetchConfernceData={fetchConfernceData} 
        toast={toast}/>,
    "Welcome Content": <WebinarWelcomeContent selectedConferenceID={selectedConferenceID}
        welcomeContent={webinar.welcomeContent}
        fetchConfernceData={fetchConfernceData} 
        toast={toast}/>,
    "Video Section": <WebinarVideoSection selectedConferenceID={selectedConferenceID}
        WebinarVideoSectionData={[webinar.videoSection]}
        fetchConfernceData={fetchConfernceData} 
        toast={toast}/>,
    "Queries Answered":<WebinarFAQAdmin selectedConferenceID={selectedConferenceID}
        FaQData={webinar.queriesAns}
        fetchConfernceData={fetchConfernceData} 
        toast={toast}/> ,
  };
  
  return (
    <>
      <Toast ref={toast} />

      <div className="d-flex justify-content-between">
        <h5>Webinar</h5>
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
