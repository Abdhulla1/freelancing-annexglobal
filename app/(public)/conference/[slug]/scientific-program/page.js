'use client';

import React, { useEffect } from 'react';
import { useConferenceLandingPage } from '@/hooks/useWeather';
import { useParams, useRouter } from 'next/navigation';
import ScientificProgram from '@/components/ScientificProgram/ScientificProgram';

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const { data: conferenceData, isLoading } = useConferenceLandingPage();

  const slug = params?.slug;
  const selectedConference = conferenceData?.detail?.find(
    (conf) => conf.permalink === slug
  );

  useEffect(() => {
    if (!isLoading && !selectedConference) {
      router.replace('/404'); // programmatic redirect
    }
  }, [isLoading, selectedConference, router]);

  if (isLoading || !selectedConference) return null;

  return <ScientificProgram conference={selectedConference} />;
};

export default Page;
