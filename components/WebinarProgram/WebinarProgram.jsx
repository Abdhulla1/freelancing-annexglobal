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
  const webinarlandingPage = conference?.webinar?.landingPage || {};
  const webinarProgramContent = conference?.webinarProgram?.scientificProgramAdmin || "";
  const conferenceName = conference?.conference?.landingPage?.conference;
  const prospectUsContent = conference?.conference?.eventDetails || "";
  const headerPanelImages = conference?.webinarProgram?.headerPanelImages || [];
   const brochure=conference?.brochure || null;
    const landingPageData={
     ...landingPageContent,
    ... webinarlandingPage
    }
  return (
    <>
      <ConferenceDetails
        conferenceName={conferenceName}
        logoUrl={logoUrl}
        headerPanelImages={headerPanelImages}
        id={id}
        conference={landingPageData}
        Component={RightPannel}
        bgImage={bgImage}
      />
      <WebinarProgramCarousel conference={webinarProgramContent} />
      <Prospectus conference={prospectUsContent} id={id} brochure={brochure}/>
      <EnquiryForm />
    </>
  );
};

export default WebinarProgram;
