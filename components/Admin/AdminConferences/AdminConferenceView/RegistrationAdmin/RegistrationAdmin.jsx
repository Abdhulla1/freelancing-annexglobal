"use client";
import React, { useState } from "react";
import RegistrationTabelAdmin from "./RegistrationTabelAdmin/RegistrationTabelAdmin";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import PersonalDetails from "./RegistrationForm/PersonalDetails/PersonalDetails";
import PricingTable from "./RegistrationForm/PricingTable/PricingTable";
import Accommodation from "./RegistrationForm/Accommodation/Accommodation";
export default function RegistrationAdmin() {
  const [activeTab, setActiveTab] = useState("Personal Details"); // default to first tab
  const tabs = {
    "Personal Details": <PersonalDetails  />,
    Pricing: <PricingTable />,
    Accommodation: <Accommodation />,
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>Registration</h5>
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
