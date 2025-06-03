'use client';

import React, { useEffect } from 'react';
import CountdownBanner from "@/components/AboutConference/CountdownBanner/CountdownBanner";
import { useConferenceDetails } from '@/hooks/useWeather';
import { useParams, useRouter } from 'next/navigation';

export default function Layout({ children }) {
  const params = useParams();
  const router = useRouter();

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const { data: conferenceData, isLoading } = useConferenceDetails(slug);

  useEffect(() => {
    if (!isLoading && (!conferenceData || !conferenceData?.detail)) {
      router.push("/404");
    }
  }, [isLoading, conferenceData, router]);

  if (isLoading || !conferenceData?.detail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CountdownBanner conference={conferenceData.detail} />
      {children}
    </div>
  );
}
