"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import SponsorsExhibitors from "@/components/SponsorsExhibitors/SponsorsExhibitors";
import { useConferenceDetails } from "@/hooks/useWeather";

const Page = () => {
  const params = useParams();
  const router = useRouter();

  // Handle slug extraction safely
  const slug = typeof params?.slug === "string" ? params.slug : params?.slug?.[0];

  const { data: conferenceData, isLoading } = useConferenceDetails(slug);

  useEffect(() => {
    if (!isLoading && !conferenceData?.detail) {
      router.push("/404"); // Redirect to 404 if no data found
    }
  }, [isLoading, conferenceData, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!conferenceData?.detail) {
    // Optionally return null or fallback UI to avoid flicker before redirect
    return null;
  }

  return <SponsorsExhibitors conference={conferenceData.detail} />;
};

export default Page;
