import React from "react";
import ConferenceDetails from "./ConferenceDetails/ConferenceDetails";
import WelcomeContent from "./WelcomeContent/WelcomeContent";
import AboutMission from "./AboutMission/AboutMission";
import ConnectWithOthers from "../Home/ConnectWithOthers/ConnectWithOthers";
import EnquiryForm from "../Home/EnquiryForm/EnquiryForm";
import OrganizingCommitee from "./OrganizingCommitee/OrganizingCommitee";
import ReputedOrganizations from "../Home/ReputedOrganizations/ReputedOrganizations";
import AlumniSpeakers from "../Home/AlumniSpeakers/AlumniSpeakers";
import BroucherGrid from "./BroucherGrid/BroucherGrid";
import SupportingJournals from "./SupportingJournals/SupportingJournals";
import DiscoverySessions from "./DiscoverySessions/DiscoverySessions";
import PastConference from "./PastConference/PastConference";
import QueriesAnswered from "./QueriesAnswered/QueriesAnswered";
import LocationandServices from "./LocationandServices/LocationandServices";
import Prospectus from "./Prospectus/Prospectus";
import RightPannel from "./ConferenceDetails/RightPannel/RightPannel";

import bgImage from "@/public/images/conferences/upcoming-bg.webp";

const AboutConference = ({conference}) => {

  return (
    <>
      <ConferenceDetails conference={conference} Component={RightPannel} bgImage={bgImage} buttonProps={{name:'Scientific Program',href:`/conference/${conference.id}/scientific-program`}} />
      <WelcomeContent />
      <AboutMission/>
      <OrganizingCommitee/>
      <DiscoverySessions conference={conference.id}/>

      {/* <BroucherGrid/> */}
      {/* <SupportingJournals/> */}
      <div className="mt-5"></div>
      {/* <ReputedOrganizations/> */}
      <AlumniSpeakers/>
      {/* <DiscoverySessions conference={conference.id}/> */}
      <PastConference/>
      <ConnectWithOthers/>
            <SupportingJournals/>

      {/* <QueriesAnswered/> */}
      <LocationandServices/>
      <Prospectus/>
      {/* <ConnectWithOthers/> */}
      <EnquiryForm/>
      
    </>
  );
};

export default AboutConference;
