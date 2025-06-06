'use client';

import React, { useEffect } from 'react';
import Testimonials from "@/components/ConferencePastConference/Testimonials/Testimonials";
import PastConferenceMain from '@/components/ConferencePastConference/PastConferenceMain/PastConferenceMain';
import { useConferenceDetails } from '@/hooks/useWeather';
import { useParams, useRouter } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const router = useRouter();

  const slug = typeof params?.slug === 'string' ? params.slug : params?.slug?.[0];
  const { data: conferenceData, isLoading } = useConferenceDetails(slug);

  useEffect(() => {
    if (!isLoading && !conferenceData?.detail) {
      // Manual redirect if no data is found
      router.push('/404'); // or any custom error route
    }
  }, [isLoading, conferenceData, router]);

  if (isLoading || !conferenceData?.detail) {
    return <div>Loading...</div>; // optional loading state
  }


  return <Testimonials conference={conferenceData?.detail} />;
};

export default Page;
