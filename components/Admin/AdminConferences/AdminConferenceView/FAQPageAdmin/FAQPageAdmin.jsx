"use client";
import React, { useState } from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import GeneralFAQ from "./GeneralFAQ/GeneralFAQ";
import TicketsFAQ from "./TicketsFAQ/TicketsFAQ";
import AttendingEventFAQ from "./AttendingEventFAQ/AttendingEventFAQ";
export default function FAQPageAdmin() {
  const [activeTab, setActiveTab] = useState("General"); // default to first tab
  const tabs = {
    "General": <GeneralFAQ />,
    "Tickets": <TicketsFAQ />,
    "Attending Event": <AttendingEventFAQ />,
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>FAQ</h5>
        {/* <button className="btn btn-warning text-white">
        Publish
        </button> */}
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
