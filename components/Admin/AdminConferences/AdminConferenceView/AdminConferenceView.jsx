'use client'
import React, { useState,useEffect } from "react";
import Sidenav from "../../Dashboard/Sidenav/Sidenav";
import ConferencePageAdmin from "./ConferencePageAdmin/ConferencePageAdmin";
import WebinarPageAdmin from "./WebinarPageAdmin/WebinarPageAdmin";
import SpeakerAdmin from "./SpeakerAdmin/SpeakerAdmin";
import OCMAdmin from "./OCMAdmin/OCMAdmin";
import TopicsAdmin from "./TopicsAdmin/TopicsAdmin";
import VenuePageAdmin from "./VenuePageAdmin/VenuePageAdmin";
import RegistrationAdmin from "./RegistrationAdmin/RegistrationAdmin";
import { getSelectedConference } from "@/service/adminConference";
import { useRouter } from "next/navigation";
export default function AdminConferenceView({conference}){

  const [activeMenu, setActiveMenu] = useState("Conference");
  const [selectedConference, setSelectedConference] = useState(null);
  const router=useRouter();
  const navItems = [
    { item: "Conference" },
    { item: "Webinar" },
    { item: "Speakers" },
    { item: "OCM" },
    { item: "Topics" },
    { item: "Venue" },
    { item: "Registration" },
  ];
  const componentMap = {
    Conference: <ConferencePageAdmin />,
    Webinar: <WebinarPageAdmin/>,
    Speakers: <SpeakerAdmin/>,
    OCM: <OCMAdmin/>,
    Topics: <TopicsAdmin/>,
    Venue: <VenuePageAdmin/>,
    Registration: <RegistrationAdmin/>,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSelectedConference(conference);
        setSelectedConference(data);
      } catch (error) {
        console.error("Failed to fetch conference data", error);
      }
    };
    fetchData();
  }, []);

  const handleBack = () => {
    router.push('/admin-annex-global-conferences/dashboard/conference')
  }
  return (
    <div className="container p-2">
      <h5 className="fw-bold">
        <i
          className="bx bx-chevron-left text-center cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={handleBack}
        ></i>
        {selectedConference?.name}
      </h5>
      <div className="row gap-2 gap-md-0 p-3">
        <div className="col-12 col-md-3">
          <Sidenav
            navItems={navItems}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
        <div className="col-md-9 col-12 p-3 bg-white rounded-2">
          {componentMap[activeMenu]}
        </div>
      </div>
    </div>
  );
}
