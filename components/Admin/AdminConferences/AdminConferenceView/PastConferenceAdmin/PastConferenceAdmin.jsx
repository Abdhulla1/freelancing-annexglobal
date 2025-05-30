"use client";
import React,{useState,useRef} from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import PastGallery from "./PastGallery/PastGallery";
import ConferenceReport from "./ConferenceReport/ConferenceReport";
import TestimonialAdmin from "./TestimonialAdmin/TestimonialAdmin";
import ConferenceAttendees from "./ConferenceAttendees/ConferenceAttendees";

import { Toast } from "primereact/toast";

export default function PastConferenceAdmin({ selectedConferenceID,pastConference,fetchConfernceData}) {
      const toast = useRef(null);
  
  const [activeTab, setActiveTab] = useState("Conference Report"); // default to first tab
  const tabs = {
    "Conference Report": <ConferenceReport selectedConferenceID={selectedConferenceID}
        conferenceReport={pastConference.conferenceReport}
        fetchConfernceData={fetchConfernceData} 
        toast={toast}/>,
    "Past Gallery": <PastGallery selectedConferenceID={selectedConferenceID}
        pastGallery={pastConference.pastGallery}
        fetchConfernceData={fetchConfernceData} 
        toast={toast}/>,
    "Testimonial ": <TestimonialAdmin selectedConferenceID={selectedConferenceID}
        testimonialData={pastConference.testimonial}
        fetchConfernceData={fetchConfernceData} 
        toast={toast}/>,
    "Conference Attendees ": <ConferenceAttendees selectedConferenceID={selectedConferenceID}
        conferenceAttendees={pastConference.conferenceAttendees}
        fetchConfernceData={fetchConfernceData} 
        toast={toast}/>,

  };
  
  return (
    <>
      <Toast ref={toast} />

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
