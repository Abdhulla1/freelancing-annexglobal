"use client";
import React,{useState} from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import PastGallery from "./PastGallery/PastGallery";
import ConferenceReport from "./ConferenceReport/ConferenceReport";
import TestimonialAdmin from "./TestimonialAdmin/TestimonialAdmin";
import ConferenceAttendees from "./ConferenceAttendees/ConferenceAttendees";


export default function PastConferenceAdmin() {
  const [activeTab, setActiveTab] = useState("Conference Report"); // default to first tab
  const tabs = {
    "Conference Report": <ConferenceReport/>,
    "Past Gallery": <PastGallery/>,
    "Testimonial ": <TestimonialAdmin/>,
    "Conference Attendees ": <ConferenceAttendees/>,

  };
  
  return (
    <>

      <div className="d-flex justify-content-between">
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
