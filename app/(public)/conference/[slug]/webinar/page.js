"use client";

import React from "react";
import AboutWebinar from '@/components/AboutWebinar/AboutWebinar'
import Registration from "@/components/Registration/Registration";
import { useConferenceLandingPage } from "@/hooks/useWeather";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";

const AboutWebinarPage = () => {
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

  return <AboutWebinar conference={selectedConference} />;
};

export default AboutWebinarPage;
