import React from "react";
// import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
import ConferenceDetails from "../AboutConference/ConferenceDetails/ConferenceDetails";
import OrganizingCommitee from "../AboutConference/OrganizingCommitee/OrganizingCommitee";
import Prospectus from "../AboutConference/Prospectus/Prospectus";
import EnquiryForm from "../Home/EnquiryForm/EnquiryForm";
import RightPannel from "./RightPannel/RightPannel";
import bgImage from "@/public/images/conferences/ocm-bg.png";
const OrganizingComiteeMembers = ({ conference }) => {
  console.log("Conference Data in OrganizingComiteeMembers:", conference);
  const id = conference?._id;
  const logoUrl = conference?.logoUrl;
  const welcomeContent = conference?.conference?.welcomeContent || "";
  const landingPageContent = conference?.conference?.landingPage || "";
  const landingPageSpeakers = conference?.conference?.ladingPageSpeakers || [];
  const organizingCommittee = conference?.ocm || "";
  const conferenceName = conference?.conference?.landingPage?.conference;
  const prospectUsContent = conference?.conference?.eventDetails || "";
  const headerPanelImages = conference?.ocm?.headerPanelImages || [];
   const brochure=conference?.brochure || null;
  return (
    <>
      <ConferenceDetails
        conferenceName={conferenceName}
        logoUrl={logoUrl}
        headerPanelImages={headerPanelImages}
        id={id}
        conference={landingPageContent}
        Component={RightPannel}
        bgImage={bgImage}
      />
      <OrganizingCommitee organizingCommittee={organizingCommittee} />
      <Prospectus conference={prospectUsContent} id={id} brochure={brochure} />
      <EnquiryForm />
    </>
  );
};

export default OrganizingComiteeMembers;
