"use client";

import React, { useEffect } from "react";
import Registration from "@/components/Registration/Registration";
import { useConferenceDetails } from "@/hooks/useWeather";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";

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


  return <Registration conference={conferenceData?.detail} />;
};

export default Page;
