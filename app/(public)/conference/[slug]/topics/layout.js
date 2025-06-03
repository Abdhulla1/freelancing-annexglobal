"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import Topics from "@/components/Topics/Topics";
import ConferenceDetails from "@/components/Topics/ConferenceDetails/ConferenceDetails";
import RightPannel from "@/components/Topics/RightPannel/RightPannel";
import Prospectus from "@/components/AboutConference/Prospectus/Prospectus";

import { useConferenceDetails } from "@/hooks/useWeather";
import bgImage from "@/public/images/conferences/topics.webp";

export default function Layout({ children }) {
  const params = useParams();
  const router = useRouter();

  const slug =
    typeof params?.slug === "string" ? params.slug : params?.slug?.[0];
  const { data: conferenceData, isLoading } = useConferenceDetails(slug);

  useEffect(() => {
    if (!isLoading && !conferenceData?.detail) {
      router.push("/404");
    }
  }, [isLoading, conferenceData, router]);

  if (isLoading || !conferenceData?.detail) {
    return <div>Loading...</div>;
  }

  const landingPage = conferenceData?.detail?.conference?.landing_page;
  const id = conference?._id;
  const logoUrl = conference?.logoUrl;
  const conferenceName = conference?.conference?.landingPage?.conference;
  const prospectUsContent = conference?.conference?.eventDetails || "";

  return (
    <>
      <ConferenceDetails
        conference={landingPage}
        bgImage={bgImage}
        Component={RightPannel}
        conferenceName={conferenceName}
        logoUrl={logoUrl}
        id={id}
      />
      {children}
      <Prospectus conference={prospectUsContent} id={id} />
    </>
  );
}
