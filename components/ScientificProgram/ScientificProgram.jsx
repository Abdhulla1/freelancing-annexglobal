import React from "react";
// import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
import Prospectus from "../AboutConference/Prospectus/Prospectus";
import EnquiryForm from "../Home/EnquiryForm/EnquiryForm";
import ScientificProgramCarousel from "./ScientificProgramCarousel/ScientificProgramCarousel";
import ConferenceDetails from "../AboutConference/ConferenceDetails/ConferenceDetails";
import bgImage from "@/public/images/conferences/webinar-program-bg.png";
import RightPannel from "../WebinarProgram/RightPannel/RightPannel";
const ScientificProgram = ({ conference }) => {
  console.log("Conference Data in ScientificProgram:", conference);
  const id = conference?._id;
  const logoUrl = conference?.logoUrl;
  const welcomeContent = conference?.conference?.welcomeContent || "";
  const landingPageContent = conference?.conference?.landingPage || "";
  const conferenceName = conference?.conference?.landingPage?.conference;
  const prospectUsContent = conference?.conference?.eventDetails || "";

  return (
    <>
      <ConferenceDetails
        conferenceName={conferenceName}
        logoUrl={logoUrl}
        id={id}
        conference={landingPageContent}
        bgImage={bgImage}
        Component={RightPannel}
      />
      <ScientificProgramCarousel conference={conference} />
      <Prospectus conference={prospectUsContent} id={id} />
      <EnquiryForm />
    </>
  );
};

export default ScientificProgram;
