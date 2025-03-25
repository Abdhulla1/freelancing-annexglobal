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

const AboutConference = ({conference}) => {
  return (
    <>
      <ConferenceDetails conference={conference} />
      <WelcomeContent />
      <AboutMission/>
      <OrganizingCommitee/>
      <BroucherGrid/>
      <SupportingJournals/>
      <div className="mt-5"></div>
      <ReputedOrganizations/>
      <AlumniSpeakers/>
      <DiscoverySessions/>
      <PastConference/>
      <QueriesAnswered/>
      <LocationandServices/>
      <Prospectus/>
      <ConnectWithOthers/>
      <EnquiryForm/>
      
    </>
  );
};

export default AboutConference;
