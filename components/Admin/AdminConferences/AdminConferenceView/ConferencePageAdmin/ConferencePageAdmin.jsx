"use client";
import React, { useState, useRef } from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import LandingPage from "./LandingPage/LandingPage";
import WelcomeContent from "./WelcomeContent/WelcomeContent";
import VideoSection from "./VideoSection/VideoSection";
import FAQAdmin from "./FAQAdmin/FAQAdmin";
import TopicsAdmin from "./TopicsAdmin/TopicsAdmin";
import PastGallery from "./PastGallery/PastGallery";
import SupportingJournalAdmin from "./SupportingJournalAdmin/SupportingJournalAdmin";
import TestimonialAdmin from "./TestimonialAdmin/TestimonialAdmin";
import HotelsRegistration from "./HotelsRegistration/HotelsRegistration";
import ScientificProgramAdmin from "./ScientificProgramAdmin/ScientificProgramAdmin";
import { Toast } from "primereact/toast";
export default function ConferencePageAdmin({ selectedConferenceID }) {
  const toast = useRef(null);
  const [activeTab, setActiveTab] = useState("Landing Page"); // default to first tab
  const tabs = {
    "Landing Page": (
      <LandingPage selectedConferenceID={selectedConferenceID} toast={toast} />
    ),
    "Welcome Content": (
      <WelcomeContent
        selectedConferenceID={selectedConferenceID}
        toast={toast}
      />
    ),
    "Video Section": <VideoSection   selectedConferenceID={selectedConferenceID} toast={toast} />,
    FAQ: <FAQAdmin />,
    "Past Gallery": <PastGallery />,
    Topics: <TopicsAdmin />,
    "Supporting Journal": <SupportingJournalAdmin />,
    Testimonial: <TestimonialAdmin />,
    "Scientific Program": <ScientificProgramAdmin />,
    "Hotels Registration": <HotelsRegistration />,
  };

  return (
    <>
      <Toast ref={toast} />

      <div className="d-flex justify-content-between">
        <h5>Conference</h5>
        <button className="btn btn-warning text-white">
          <i className="pi pi-eye px-2"></i> Preview
        </button>
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
