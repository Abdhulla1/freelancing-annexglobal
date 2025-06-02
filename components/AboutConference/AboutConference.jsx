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
  const id = conference?._id
  const logoUrl = conference?.logoUrl 
  const welcomeContent = conference?.conference?.welcomeContent || "";
  const landingPageContent = conference?.conference?.landingPage || "";
  const landingPageSpeakers = conference?.conference?.ladingPageSpeakers || [];
  // const aboutAnnex = conference?.aboutAnnex || "";         
  // const aboutMission = conference?.aboutMission || "";
  const organizingCommittee = conference?.ocm || "";
  const discoverySessions = conference?.conference?.topics || "";
  const pastConference = conference?.conference?.pastGallery || "";
  // const queriesAnswered = conference?.queriesAnswered || "";
  const locationAndServices = conference?.conference?.location || "";
  // const prospectus = conference?.prospectus || "";
  const supportingJournals = conference?.conference?.supportingJournal || "";
  const testimonialContent = conference?.conference?.testimonial || [];


  return (
    <>
      <ConferenceDetails
        conference={landingPageContent}
       Component={() => <RightPannel conference={landingPageSpeakers} id={id} />}
        bgImage={bgImage}
        conferenceName={conference?.name}
        logoUrl={logoUrl}
        id={id}
        buttonProps={{
          name: "Scientific Program",
          href: `/conference/${conference?._id}/scientific-program`,
        }}
      />
      <WelcomeContent welcomeContent={welcomeContent} />
      <AboutMission />
      <OrganizingCommitee organizingCommittee={organizingCommittee} id={id} />
      {/* commit by jk need to uncommit */}
      <DiscoverySessions conference={discoverySessions} />

      {/* <BroucherGrid/> */}
      {/* <SupportingJournals/> */}
      <div className="mt-5"></div>
      {/* <ReputedOrganizations/> */}
      <AlumniSpeakers  />
      {/* commit by jk need to uncommit */}

      <PastConference pastConference={pastConference} />
      <ConnectWithOthers conference={testimonialContent} />
      {/* commit by jk need to uncommit */}
      

      <SupportingJournals supportingJournals={supportingJournals} />

      {/* <QueriesAnswered/> */}
        {/* commit by jk need to uncommit */}
      <LocationandServices locationAndServices={locationAndServices} landingPageContent={landingPageContent} id={id} />
      <Prospectus />
      {/* <ConnectWithOthers/> */}
      <EnquiryForm />
    </>
  );
};

export default AboutConference;
