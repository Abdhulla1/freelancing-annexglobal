import React from "react";

import DiscoverySessions from "./DiscoverySessions/DiscoverySessions";
import Prospectus from "../AboutConference/Prospectus/Prospectus";
import ConferenceDetails from "./ConferenceDetails/ConferenceDetails";
import ResearchCarouusel from "./ResearchCarousel/ResearchCarouusel";
import TopicCentric from "./TopicCentric/TopicCentric";
// import bgImage from '@public/images/conferences/webinar-program-bg.png'
export default function Topics({ conference }) {
  const prospectUsContent = conference?.conference?.eventDetails || "";
  const id = conference?._id;
  const conferenceName = conference?.conference?.landingPage?.conference;
  const logoUrl = conference?.logoUrl;
  const discoverySessions = conference?.conference?.topics || "";
 const brochure=conference?.brochure || null;
  return (
    <>
      <ConferenceDetails
        conferenceName={conferenceName}
        logoUrl={logoUrl}
        id={id}
        conference={conference}
      />
      <DiscoverySessions conference={discoverySessions} />
      <Prospectus conference={prospectUsContent} id={id} brochure={brochure} />
    </>
  );
}
