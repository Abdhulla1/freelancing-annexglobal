"use client";
import ConferenceSpeakers from '@/components/ConferenceSpeakers/ConferenceSpeakers'
import React from 'react'
import { useConferenceLandingPage } from "@/hooks/useWeather";
import { useParams, useRouter } from "next/navigation";

const SpeakersPage = () => {
  const { slug } = useParams();
  const { data: conferenceData } = useConferenceLandingPage("upcoming");

  if (!conferenceData) return null;

  const selectedConference = conferenceData?.detail?.find(
    (conf) => conf.name === slug
  );

  if (!selectedConference) {
    // optionally handle not found UI here
    return <div>Conference not found</div>;
  }

  return <ConferenceSpeakers conference={selectedConference} />;
};

export default SpeakersPage;
