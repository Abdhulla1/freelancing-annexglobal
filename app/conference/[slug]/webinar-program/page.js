import WebinarProgram from "@/components/WebinarProgram/WebinarProgram";
import React from "react";
import { getSelectedConference } from "@/service/conferenceData";
const page =  async({ params }) => {

    const { slug } = await params; 
    const selectedConference=getSelectedConference(slug);
  return <WebinarProgram conference={selectedConference} />;
};
export default page;
