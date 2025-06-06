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
import LandingPageSpeakers from "./LandingPageSpeakers/LandingPageSpeakers";
import ScientificProgramAdmin from "./ScientificProgramAdmin/ScientificProgramAdmin";
import UploadBrochure from "./UploadBrochure/UploadBrochure";
import Location from "./Location/Location";
import EventDetailsSection from "./EventDetailsSection/EventDetailsSection";
import NavLocationOverview from "./NavLocationOverview/NavLocationOverview";
import { Toast } from "primereact/toast";
export default function ConferencePageAdmin({ selectedConferenceID,conference,fetchConfernceData,conferencevideoSection}) {
  const toast = useRef(null);
  const [activeTab, setActiveTab] = useState("Landing Page"); // default to first tab
    const [isDisabled, setIsDisabled] = useState(true);
  const tabs = {
    "Landing Page": (
      <LandingPage selectedConferenceID={selectedConferenceID} LandingPageData={conference.landingPage}  toast={toast} fetchConfernceData={fetchConfernceData} />
    ),
    "Landing Page Speaker": (
      <LandingPageSpeakers selectedConferenceID={selectedConferenceID} LandingPageSpeakers={conference.ladingPageSpeakers} fetchConfernceData={fetchConfernceData}  toast={toast} />
    ),
    "Welcome Content": (
      <WelcomeContent
        selectedConferenceID={selectedConferenceID}
        welcomeContent={conference.welcomeContent}
        fetchConfernceData={fetchConfernceData} 
        toast={toast}
      />
    ),
    "Video Section": (
      <VideoSection selectedConferenceID={selectedConferenceID} VideoSectionData={conferencevideoSection}  fetchConfernceData={fetchConfernceData}  toast={toast} />
    ),
    // FAQ: <FAQAdmin />,
    Topics: <TopicsAdmin  selectedConferenceID={selectedConferenceID} topicsData={conference.topics}  toast={toast} fetchConfernceData={fetchConfernceData}/>,
    "Past Gallery": <PastGallery  selectedConferenceID={selectedConferenceID} PastGalleryData={conference.pastGallery}  toast={toast} fetchConfernceData={fetchConfernceData} />,
    Testimonial: <TestimonialAdmin selectedConferenceID={selectedConferenceID} testimonialData={conference.testimonial}  toast={toast} fetchConfernceData={fetchConfernceData}  />,
    "Supporting Journal": <SupportingJournalAdmin selectedConferenceID={selectedConferenceID} supportingJournalData={conference.supportingJournal}  toast={toast} fetchConfernceData={fetchConfernceData}/>,
    Location: <Location   selectedConferenceID={selectedConferenceID} LocationData={conference.location}  toast={toast} fetchConfernceData={fetchConfernceData} />,
    'Event Details Section': <EventDetailsSection selectedConferenceID={selectedConferenceID} EventDetailsSectionData={conference.eventDetails}  toast={toast} fetchConfernceData={fetchConfernceData}  />,
    "Location Overview": <NavLocationOverview Location={selectedConferenceID} toast={toast} fetchData={fetchConfernceData}/>,

  };
  const handleEditClick = (e) => {
    setIsDisabled(false);
  };
  return (
    <>
      <Toast ref={toast} />

      <div className="d-flex justify-content-between">
        <h5>Conference</h5>
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
