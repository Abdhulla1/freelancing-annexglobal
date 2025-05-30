"use client";
import React, { useState,useRef } from "react";
import RegistrationTabelAdmin from "./RegistrationTabelAdmin/RegistrationTabelAdmin";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import PersonalDetails from "./RegistrationForm/PersonalDetails/PersonalDetails";
import PricingTable from "./RegistrationForm/PricingTable/PricingTable";
import Accommodation from "./RegistrationForm/Accommodation/Accommodation";
import RegisterationInfo from "./RegisterationInfo/RegisterationInfo";
import { Toast } from "primereact/toast";

export default function RegistrationAdmin({ selectedConferenceID,registration,fetchConfernceData}) {
    const toast = useRef(null);
  
  const [activeTab, setActiveTab] = useState("Personal Details"); // default to first tab
  const tabs = {
    "Personal Details": <PersonalDetails selectedConferenceID={selectedConferenceID}
            PersonalDetails={registration.personalDetails}
            fetchConfernceData={fetchConfernceData} 
            toast={toast} />,
    Pricing: <PricingTable  selectedConferenceID={selectedConferenceID}
            pricingTable={registration.pricing}
            fetchConfernceData={fetchConfernceData} 
            toast={toast} />,
    Accommodation: <Accommodation selectedConferenceID={selectedConferenceID}
            initialData={registration.accomodation}
            fetchConfernceData={fetchConfernceData} 
            toast={toast} />,
    "Registration Info": <RegisterationInfo selectedConferenceID={selectedConferenceID}
            registrationInfo={registration.registrationInfo}
            fetchConfernceData={fetchConfernceData} 
            toast={toast} />,
  };

  return (
    <>
          <Toast ref={toast} />
    
      <div className="d-flex justify-content-between">
        <h5>Registration</h5>
       
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
