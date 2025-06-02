'use client';

import React, { useEffect } from 'react';
import WebinarProgram from "@/components/WebinarProgram/WebinarProgram";
import { useConferenceDetails } from '@/hooks/useWeather';
import { useParams, useRouter } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const router = useRouter();

  // Handle slug as string or array
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const { data: conferenceData, isLoading } = useConferenceDetails(slug);

  useEffect(() => {
    if (!isLoading && !conferenceData?.detail) {
      router.push('/404'); // Redirect to custom 404 page
    }
  }, [isLoading, conferenceData, router]);

  if (isLoading || !conferenceData?.detail) {
    return <div>Loading...</div>;
  }

  return <WebinarProgram conference={conferenceData.detail} />;
};

export default Page;
