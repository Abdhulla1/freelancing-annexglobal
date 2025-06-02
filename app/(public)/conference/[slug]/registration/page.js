"use client";

import React from "react";
import Registration from "@/components/Registration/Registration";
import { useConferenceLandingPage } from "@/hooks/useWeather";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";

const Page = () => {
  const { slug } = useParams();
  const { data: conferenceData } = useConferenceLandingPage("upcoming");

  if (!conferenceData) return null; // or a loading spinner

  const selectedConference = conferenceData?.detail?.find(
    (conf) => conf.name === slug
  );

  if (!selectedConference) {
    notFound();
    return null;
  }

  return <Registration conference={selectedConference} />;
};

export default Page;
