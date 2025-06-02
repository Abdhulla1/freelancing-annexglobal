"use client";

import React, { useEffect } from "react";
import Registration from "@/components/Registration/Registration";
import { useConferenceLandingPage } from "@/hooks/useWeather";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";

const Page = () => {
  const params = useParams();
  const router = useRouter();

  const slug = typeof params?.slug === 'string' ? params.slug : params?.slug?.[0];
  const { data: conferenceData, isLoading } = useConferenceDetails(slug);

  useEffect(() => {
    if (!isLoading && !conferenceData) {
      // Manual redirect if no data is found
      router.push('/404'); // or any custom error route
    }
  }, [isLoading, conferenceData, router]);

  if (isLoading || !conferenceData) {
    return <div>Loading...</div>; // optional loading state
  }


  return <Registration conference={conferenceData} />;
};

export default Page;
