"use client";

import React, { useEffect, useMemo } from "react";
import CountdownBanner from "@/components/AboutConference/CountdownBanner/CountdownBanner";
import { useConferenceDetails } from "@/hooks/useWeather";
import { useParams, useRouter, usePathname } from "next/navigation";

export default function Layout({ children }) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const { data: conferenceData, isLoading } = useConferenceDetails(slug);

  useEffect(() => {
    if (!isLoading && (!conferenceData || !conferenceData?.detail)) {
      router.push("/404");
    }
  }, [isLoading, conferenceData, router]);
  const conferenceTiming = useMemo(() => {
    if (!conferenceData?.detail) return null;
console.log(conferenceData.detail.webinar?.landingPage)
    return pathname.includes("webinar-program") || pathname.includes("webinar")
      ? conferenceData.detail.webinar?.landingPage
      : conferenceData.detail.conference?.landingPage;
  }, [pathname, conferenceData]);

  if (isLoading || !conferenceData?.detail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {children}
      <CountdownBanner conferenceTiming={conferenceTiming} id={conferenceData._id} />
    </>
  );
}
