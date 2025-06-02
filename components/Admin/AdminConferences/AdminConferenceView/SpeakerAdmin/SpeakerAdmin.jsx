"use client";
import React, { useState ,useRef} from "react";
import SpeakerTabelAdmin from "./SpeakerTabelAdmin/SpeakerTabelAdmin";
import LandingPage from "./LandingPage/LandingPage";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import { Toast } from "primereact/toast";

export default function SpeakerAdmin({
  selectedConferenceID,
  speakers,
  fetchConfernceData,
}) {
  const [activeTab, setActiveTab] = useState("Speakers"); // default to first tab
  const toast = useRef(null);

  const tabs = {
    Speakers: (
      <SpeakerTabelAdmin
        selectedConferenceID={selectedConferenceID}
        speakerData={speakers.speakers}
        fetchConfernceData={fetchConfernceData}
        toast={toast}
      />
    ),
    "Header Panel Images": <LandingPage   selectedConferenceID={selectedConferenceID}
        headerPannelImages={speakers.headerPanelImages}
        fetchConfernceData={fetchConfernceData}
        toast={toast}/>,
  };

  return (
    <>
      <Toast ref={toast} />

      <div className="d-flex justify-content-between">
        <h5>Speakers</h5>
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
