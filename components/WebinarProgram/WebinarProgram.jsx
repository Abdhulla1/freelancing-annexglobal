import React from "react";
// import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
import ConferenceDetails from "../AboutConference/ConferenceDetails/ConferenceDetails";
import Prospectus from "../AboutConference/Prospectus/Prospectus";
import EnquiryForm from "../Home/EnquiryForm/EnquiryForm";
import WebinarProgramCarousel from "./WebinarProgramCarousel/WebinarProgramCarousel";
import RightPannel from "./RightPannel/RightPannel";
import bgImage from "@/public/images/conferences/webinar-program-bg.png";
const WebinarProgram = ({ conference }) => {
  console.log("Conference Data in WebinarProgram:", conference);
  const id = conference?._id;
  const logoUrl = conference?.logoUrl;
  const welcomeContent = conference?.conference?.welcomeContent || "";
  const landingPageContent = conference?.conference?.landingPage || "";
  const webinarProgramContent = conference?.webinarProgram?.scientificProgramAdmin || "";
  return (
    <>
      <ConferenceDetails
        conferenceName={conference?.name}
        logoUrl={logoUrl}
        id={id}
        conference={landingPageContent}
        Component={RightPannel}
        bgImage={bgImage}
      />
      <WebinarProgramCarousel conference={webinarProgramContent} />
      <Prospectus />
      <EnquiryForm />
    </>
  );
};

export default WebinarProgram;
