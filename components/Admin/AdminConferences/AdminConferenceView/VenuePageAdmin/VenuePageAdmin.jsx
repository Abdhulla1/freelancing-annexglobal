"use client";
import React,{useState} from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import VenueImageUploads from "./VenueImageUploads/VenueImageUploads";
import VenueWelcomeContent from "./VenueWelcomeContent/VenueWelcomeContent";
import VenueMapUploads from "./VenueMapUploads/VenueMapUploads";
import EventTimings from "./EventTimings/EventTimings";
export default function VenuePageAdmin() {
  const [activeTab, setActiveTab] = useState("Venue Content"); // default to first tab
  const tabs = {
    "Venue Content": <VenueWelcomeContent/>,
    "Header Panel Images": <VenueImageUploads/>,
    "Map Uploads": <VenueMapUploads/>,
        "Event Timings": <EventTimings/>,

  };
  
  return (
    <>

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
