'use client';
import AboutConference from '@/components/AboutConference/AboutConference'
import React from 'react';
import { useConferenceLandingPage } from '@/hooks/useWeather';
import { useParams, useRouter } from 'next/navigation';

const ConferencePage = () => {
  const { data: conferenceData } = useConferenceLandingPage("upcoming");
  const params = useParams();
  const router = useRouter();


  const slug = params?.slug;
  const selectedConference = conferenceData?.detail?.find((conf) => conf.name === slug);
  if (!selectedConference) {
    // Programmatic redirect since `notFound()` doesn't work in client components
    // router.replace('/404');
    return null;
  }

  return (
    <AboutConference conference={selectedConference} />
  );
};

export default ConferencePage;
