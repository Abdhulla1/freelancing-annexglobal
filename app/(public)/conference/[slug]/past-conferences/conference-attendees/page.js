'use client';

import React from 'react';
import ConferenceAttendees from '@/components/ConferencePastConference/ConferenceAttendees/ConferenceAttendees';
import { useConferenceLandingPage } from '@/hooks/useWeather';
import { useParams } from 'next/navigation';

const Page = () => {
  const { data: conferenceData, isLoading, error } = useConferenceLandingPage();
  const params = useParams();
  const slug = params?.slug;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading conference data.</div>;

  const selectedConference = conferenceData?.detail?.find(
    (conf) => conf.name === slug
  );

  if (!selectedConference) {
    return <div>Conference not found.</div>;
  }

  return <ConferenceAttendees conference={selectedConference} />;
};

export default Page;
