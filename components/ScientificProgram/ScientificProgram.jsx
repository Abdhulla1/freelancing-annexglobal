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
  const headerPanelImages = conference?.scientificProgram?.headerPanelImages || [];
 const brochure=conference?.brochure || null;
  return (
    <>
      <ConferenceDetails
        conferenceName={conferenceName}
        logoUrl={logoUrl}
        id={id}
        headerPanelImages={headerPanelImages}
        conference={landingPageContent}
        bgImage={bgImage}
        Component={RightPannel}
      />
      <ScientificProgramCarousel conference={conference} />
      <Prospectus conference={prospectUsContent} id={id} brochure={brochure} />
      <EnquiryForm />
    </>
  );
};

export default ScientificProgram;
