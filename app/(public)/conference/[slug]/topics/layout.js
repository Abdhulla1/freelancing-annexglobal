import Topics from "@/components/Topics/Topics";
import React from "react";
import { getSelectedConference } from "@/service/conferenceData";
import ConferenceDetails from "@/components/Topics/ConferenceDetails/ConferenceDetails";
// import ConferenceDetails from "@/components/AboutConference/ConferenceDetails/ConferenceDetails";
import RightPannel from "@/components/Topics/RightPannel/RightPannel";
import Prospectus from "@/components/AboutConference/Prospectus/Prospectus";

import bgImage from "@/public/images/conferences/topics.webp";

export default async function layout({ children, params }) {
  const { slug } = await params;
  const selectedConference = getSelectedConference(slug);
  return (
    <>
      <ConferenceDetails conference={selectedConference} bgImage={bgImage} Component={RightPannel} />
      {children}
      <Prospectus />
    </>
  );
}
