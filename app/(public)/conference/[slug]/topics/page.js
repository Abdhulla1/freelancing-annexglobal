"use client";
import DiscoverySessions from "@/components/Topics/DiscoverySessions/DiscoverySessions";
import React, { useEffect } from 'react';
import { useConferenceDetails } from "@/hooks/useWeather";
import { useParams, useRouter } from "next/navigation";

const SpeakersPage = () => {
  const params = useParams();
  const router = useRouter();

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  console.log("slug", slug);
  const { data: conferenceData, isLoading } = useConferenceDetails(slug);

  useEffect(() => {
    if (!isLoading && (!conferenceData || !conferenceData?.detail)) {
      router.push('/404');
    }
  }, [isLoading, conferenceData, router]);

  if (isLoading || !conferenceData?.detail) {
    return <div>Loading...</div>;
  }

  console.log("Conference Data topicssss:", conferenceData);

  return <DiscoverySessions conference={conferenceData.detail} />;
};

export default SpeakersPage;
