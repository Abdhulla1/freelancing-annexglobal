'use client';

import React, { useEffect } from 'react';
import SpecialRegistration from '@/components/SpecialRegistration/SpecialRegistration';
import { useConferenceDetails } from '@/hooks/useWeather';
import { useParams, useRouter } from 'next/navigation';

const Page = () => {
  const { slug } = useParams();
  const router = useRouter();

  const { data: conferenceData, isLoading } = useConferenceDetails(slug);

  useEffect(() => {
    if (!isLoading && !conferenceData?.detail) {
      router.push('/404');
    }
  }, [isLoading, conferenceData, router]);

  if (isLoading || !conferenceData?.detail) {
    return <div>Loading...</div>;
  }

  return <SpecialRegistration conference={conferenceData.detail} />;
};

export default Page;
