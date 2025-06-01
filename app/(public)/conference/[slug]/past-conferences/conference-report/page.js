'use client';

import React from 'react';
import PastConferenceReport from '@/components/ConferencePastConference/PastConferenceReport/PastConferenceReport';
import { useConferenceLandingPage } from '@/hooks/useWeather';
import { useParams } from 'next/navigation';

const Page = () => {
  const { data: conferenceData, isLoading, error } = useConferenceLandingPage();
  const params = useParams();
  const slug = params?.slug;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading conference data.</div>;

  const selectedConference = conferenceData?.detail?.find(
    (conf) => conf.permalink === slug
  );

  if (!selectedConference) {
    return <div>Conference not found.</div>;
  }

  return <PastConferenceReport conference={selectedConference} />;
};

export default Page;
