"use client";
import React, { useEffect } from "react";
import ConferenceDetails from "@/components/AboutConference/ConferenceDetails/ConferenceDetails";
import { useConferenceDetails } from "@/hooks/useWeather";
import { useParams, notFound, useRouter } from "next/navigation";
import bgImage from "@/public/images/conferences/upcoming-bg.webp";

export default function ConferenceLayout({ children }) {
  const params = useParams();
  const router = useRouter();

  const slug =
    typeof params?.slug === "string" ? params.slug : params?.slug?.[0];
  const { data: conferenceData, isLoading } = useConferenceDetails(slug);
  const conference = conferenceData?.detail || null;
  useEffect(() => {
    if (!isLoading && !conferenceData) {
      // Manual redirect if no data is found
      router.push("/404"); // or any custom error route
    }
  }, [isLoading, conferenceData, router]);

  if (isLoading || !conferenceData) {
    return <div>Loading...</div>; // optional loading state
  }

  const id = conference?._id;
  const logoUrl = conference?.logoUrl;
  const conferenceName = conference?.conference?.landingPage?.conference;
  const landingPageContent = conference?.conference?.landingPage || "";

  return (
    <div>
      <ConferenceDetails
        conference={landingPageContent}
        bgImage={bgImage}
        conferenceName={conferenceName}
        logoUrl={logoUrl}
        id={id}
      />
      {children}
    </div>
  );
}
