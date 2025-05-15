"use client";
import React, { useState, useRef } from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import PricingTable from "./PricingTable/PricingTable";
import Accommodation from "./Accommodation/Accommodation";
import { Toast } from "primereact/toast";
export default function RegistrationForm({ selectedConferenceID }) {
  const toast = useRef(null);
  const [activeTab, setActiveTab] = useState("Personal Details"); // default to first tab
  const tabs = {
    "Personal Details": <PersonalDetails toast={toast} />,
    Pricing: <PricingTable />,
    Accommodation: <Accommodation />,
    // Topics: <TopicsAdmin />,
    // "Supporting Journal": <SupportingJournalAdmin />,
    // Testimonial: <TestimonialAdmin />,
    // "Scientific Program": <ScientificProgramAdmin />,
    // "Hotels Registration": <HotelsRegistration />,
  };

  return (
    <>
      <Toast ref={toast} />

      <div className="d-flex justify-content-between">
        <h5>Registration Form</h5>
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
