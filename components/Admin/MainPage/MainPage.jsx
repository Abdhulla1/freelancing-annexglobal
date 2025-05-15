"use client";
import React, { useState, useRef } from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import LandingPage from "./LandingPage/LandingPage";
import CategoryPage from "./Category/CategoryPage";
import VideoSection from "./VideoSection/VideoSection";
import NavLocationOverview from "./NavLocationOverview/NavLocationOverview";
import WelcomeContent from "./WelcomeContent/WelcomeContent";
import { Toast } from "primereact/toast";


export default function MainPage({ selectedConferenceID }) {
  const toast = useRef(null);
  const [activeTab, setActiveTab] = useState("Landing Page"); // default to first tab
  const tabs = {
    "Landing Page": <LandingPage toast={toast} />,
    "Welcome Content": <WelcomeContent />,
    "Video Section": <VideoSection />,
    "Category": <CategoryPage toast={toast} />,
    "Location Overview": <NavLocationOverview toast={toast} />,
    
  };

  return (
    <>
      <Toast ref={toast} />

      <div className="d-flex justify-content-between">
        <h5>Main Page</h5>
      </div>
      <div className="mt-4 container bg-white rounded px-4 py-3">
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
