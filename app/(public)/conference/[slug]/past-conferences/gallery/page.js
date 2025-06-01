'use client';

import React from 'react';
import Gallery from '@/components/ConferencePastConference/Gallery/Gallery';
import { useConferenceLandingPage } from '@/hooks/useWeather';
import { useParams } from 'next/navigation';

const Page = () => {
  const { data: conferenceData } = useConferenceLandingPage();
  const params = useParams();
  const slug = params?.slug;

  const selectedConference = conferenceData?.detail?.find(
    (conf) => conf?.permalink === slug
  );

  if (!selectedConference) return <p>Loading or Not Found...</p>;

  return <Gallery conference={selectedConference} />;
};

export default Page;
