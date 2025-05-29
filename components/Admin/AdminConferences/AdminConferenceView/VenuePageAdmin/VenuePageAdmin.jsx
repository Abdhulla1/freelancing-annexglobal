"use client";
import React,{useState,useRef} from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import VenueImageUploads from "./VenueImageUploads/VenueImageUploads";
import VenueWelcomeContent from "./VenueWelcomeContent/VenueWelcomeContent";
import VenueMapUploads from "./VenueMapUploads/VenueMapUploads";
import EventTimings from "./EventTimings/EventTimings";
import { Toast } from "primereact/toast";

export default function VenuePageAdmin({
  selectedConferenceID,
  venuePage,
  fetchConfernceData,
}) {
      const toast = useRef(null);
  
  const [activeTab, setActiveTab] = useState("Venue Content"); // default to first tab
  const tabs = {
    "Venue Content": <VenueWelcomeContent selectedConferenceID={selectedConferenceID}
        welcomeContent={venuePage.content}
        fetchConfernceData={fetchConfernceData}
        toast={toast}/>,
    "Header Panel Images": <VenueImageUploads selectedConferenceID={selectedConferenceID}
        headerPannelImages={venuePage.headerPanelImages}
        fetchConfernceData={fetchConfernceData}
        toast={toast}/>,
    "Map Uploads": <VenueMapUploads selectedConferenceID={selectedConferenceID}
        LocationData={venuePage.maps}
        fetchConfernceData={fetchConfernceData}
        toast={toast}/>,
        "Event Timings": <EventTimings selectedConferenceID={selectedConferenceID}
        eventTimings={venuePage.headerPanelImages}
        fetchConfernceData={fetchConfernceData}
        toast={toast}/>,

  };
  
  return (
    <>
      <Toast ref={toast} />

      <div className="d-flex justify-content-between">
        <h5>Venue</h5>
        <button className="btn btn-warning text-white">
       Publish
        </button>
            {/* <i className="pi pi-eye px-2"></i> */}
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
