import Topics from "@/components/Topics/Topics";
import React from "react";
import { getSelectedConference } from "@/service/conferenceData";
import ConferenceDetails from "@/components/Topics/ConferenceDetails/ConferenceDetails";
import Prospectus from "@/components/AboutConference/Prospectus/Prospectus";
export default async function layout({ children, params }) {
  const { slug } = await params;
  const selectedConference = getSelectedConference(slug);
  return (
    <>
      <ConferenceDetails conference={selectedConference} />
      {children}
      <Prospectus />
    </>
  );
}
