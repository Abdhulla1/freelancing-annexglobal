
import React, { useState } from "react";
import Sidenav from "../../Dashboard/Sidenav/Sidenav";
import ConferencePageAdmin from "./ConferencePageAdmin/ConferencePageAdmin";
import WebinarPageAdmin from "./WebinarPageAdmin/WebinarPageAdmin";
import SpeakerAdmin from "./SpeakerAdmin/SpeakerAdmin";
import OCMAdmin from "./OCMAdmin/OCMAdmin";
import TopicsAdmin from "./TopicsAdmin/TopicsAdmin";
import VenuePageAdmin from "./VenuePageAdmin/VenuePageAdmin";
import RegistrationAdmin from "./RegistrationAdmin/RegistrationAdmin";
export default function AdminConferenceView({
  selectedConference,
  setSelectedConference,
}) {
  const [activeMenu, setActiveMenu] = useState("Conference");

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

  return (
    <div className="container p-2">
      <h5 className="fw-bold">
        <i
          className="bx bx-chevron-left text-center cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedConference(null);
            sessionStorage.removeItem("selectedConference");
          }}
        ></i>
        {selectedConference?.title}
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
