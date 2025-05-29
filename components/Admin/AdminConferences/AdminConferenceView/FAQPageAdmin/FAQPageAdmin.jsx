"use client";
import React, { useState ,useRef} from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import GeneralFAQ from "./GeneralFAQ/GeneralFAQ";
import TicketsFAQ from "./TicketsFAQ/TicketsFAQ";
import AttendingEventFAQ from "./AttendingEventFAQ/AttendingEventFAQ";
import { Toast } from "primereact/toast";

export default function FAQPageAdmin({
  selectedConferenceID,
  faq,
  fetchConfernceData,
}) {
     const toast = useRef(null);
  
  const [activeTab, setActiveTab] = useState("General"); // default to first tab
  const tabs = {
    "General": <GeneralFAQ selectedConferenceID={selectedConferenceID} generalFaq={faq.general}  toast={toast} fetchConfernceData={fetchConfernceData} />,
    "Tickets": <TicketsFAQ selectedConferenceID={selectedConferenceID} ticketsFAQ={faq.tickets}  toast={toast} fetchConfernceData={fetchConfernceData}/>,
    "Attending Event": <AttendingEventFAQ  selectedConferenceID={selectedConferenceID} attendingEventFAQ={faq.attendingEvent}  toast={toast} fetchConfernceData={fetchConfernceData}/>,
  };

  return (
    <>
          <Toast ref={toast} />
    
      <div className="d-flex justify-content-between">
        <h5>FAQ</h5>
        
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
