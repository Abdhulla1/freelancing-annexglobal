"use client";
import ConferenceSpeakers from '@/components/ConferenceSpeakers/ConferenceSpeakers'
import SubmitAbstract from '@/components/SubmitAbstract/SubmitAbstract';
import React, { useEffect } from 'react'
import { useConferenceDetails } from "@/hooks/useWeather";
import { useParams, useRouter } from "next/navigation";

const SubmitAbstractPage = () => {
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


  return <SubmitAbstract conference={conferenceData?.detail} />;
};

export default SubmitAbstractPage;
