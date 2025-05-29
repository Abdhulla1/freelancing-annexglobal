"use client";
import React, { useState ,useRef} from "react";
import WebinarProgramTableAdmin from "./WebinarProgramTableAdmin";
import HeaderPannelImages from "./HeaderPannelImages";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import { Toast } from "primereact/toast";

export default function OCMAdmin({
  selectedConferenceID,
  webinarProgram,
  fetchConfernceData,
}) {
       const toast = useRef(null);
  
 const [activeTab, setActiveTab] = useState("Header Panel Images"); // default to first tab
  const tabs = {
      "Header Panel Images":  <HeaderPannelImages selectedConferenceID={selectedConferenceID}
              headerPannelImages={webinarProgram.headerPanelImages}
              fetchConfernceData={fetchConfernceData}
              toast={toast}/>,
    "Webinar Program Admin": <WebinarProgramTableAdmin selectedConferenceID={selectedConferenceID}
              webinarProgram={webinarProgram.scientificProgramAdmin}
              fetchConfernceData={fetchConfernceData}
              toast={toast}/>,
  };
  
  return (
    <>
      <Toast ref={toast} />
      <div className="d-flex justify-content-between">
   <h5>Webinar Program</h5>
     
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
