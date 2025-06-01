'use client';

import React from 'react';
import Testimonials from "@/components/ConferencePastConference/Testimonials/Testimonials";
import PastConferenceMain from '@/components/ConferencePastConference/PastConferenceMain/PastConferenceMain';
import { useConferenceLandingPage } from '@/hooks/useWeather';
import { useParams } from 'next/navigation';

const Page = () => {
  const { data: conferenceData } = useConferenceLandingPage();
  const params = useParams();
  const slug = params?.slug;

  const selectedConference = conferenceData?.detail?.find(
    (conf) => conf.permalink === slug
  );

  if (!selectedConference) {
    return <div>Conference not found.</div>; // Better than returning null
  }


  return <Testimonials conference={selectedConference} />;
};

export default Page;
