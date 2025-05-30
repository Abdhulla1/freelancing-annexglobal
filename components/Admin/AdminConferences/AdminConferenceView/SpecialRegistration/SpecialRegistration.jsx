"use client";
import React, { useState, useRef } from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import { Toast } from "primereact/toast";
export default function SpecialRegistration({ selectedConferenceID,specialRegistration,fetchConfernceData}) {
  const toast = useRef(null);
  const [activeTab, setActiveTab] = useState("Personal Details"); // default to first tab
  const tabs = {
    "Personal Details": <PersonalDetails selectedConferenceID={selectedConferenceID}
        PersonalDetails={specialRegistration.personalDetails}
        fetchConfernceData={fetchConfernceData} 
        toast={toast}/>,

  };

  return (
    <>
      <Toast ref={toast} />

      <div className="d-flex justify-content-between">
        <h5>Special Registration Form</h5>
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
