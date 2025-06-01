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

const AboutConference = ({ conference }) => {
  const id = conference?.name
  const logoUrl = conference?.logoUrl 
  const welcomeContent = conference?.conference?.welcomeContent || "";
  const landingPageContent = conference?.conference?.landingPage || "";
  const landingPageSpeakers = conference?.conference?.ladingPageSpeakers || [];
  // const aboutAnnex = conference?.aboutAnnex || "";         
  // const aboutMission = conference?.aboutMission || "";
  const organizingCommittee = conference?.ocm || "";
  const discoverySessions = conference?.topics?.essentialInnovation || "";
  const pastConference = conference?.conference?.pastGallery || "";
  // const queriesAnswered = conference?.queriesAnswered || "";
  const locationAndServices = conference?.conference?.location || "";
  // const prospectus = conference?.prospectus || "";
  const supportingJournals = conference?.conference?.supportingJournal || "";
  
  console.log("Conference ID:", conference );
  
  return (
    <>
      <ConferenceDetails
        conference={landingPageContent}
       Component={() => <RightPannel conference={landingPageSpeakers} id={id} />}
        bgImage={bgImage}
        logoUrl={logoUrl}
        id={id}
        buttonProps={{
          name: "Scientific Program",
          href: `/conference/${conference.name}/scientific-program`,
        }}
      />
      <WelcomeContent welcomeContent={welcomeContent} />
      <AboutMission />
      <OrganizingCommitee organizingCommittee={organizingCommittee} id={id} />
      <DiscoverySessions conference={discoverySessions} />

      {/* <BroucherGrid/> */}
      {/* <SupportingJournals/> */}
      <div className="mt-5"></div>
      {/* <ReputedOrganizations/> */}
      <AlumniSpeakers />
      {/* <DiscoverySessions conference={conference.id}/> */}
      <PastConference pastConference={pastConference} />
      <ConnectWithOthers />
      <SupportingJournals supportingJournals={supportingJournals} />

      {/* <QueriesAnswered/> */}
      <LocationandServices locationAndServices={locationAndServices} landingPageContent={landingPageContent} id={id} />
      <Prospectus />
      {/* <ConnectWithOthers/> */}
      <EnquiryForm />
    </>
  );
};

export default AboutConference;
