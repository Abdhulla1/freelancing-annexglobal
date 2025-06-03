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

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  console.log("slug", slug);
  const { data: conferenceData, isLoading } = useConferenceDetails(slug);

  useEffect(() => {
    if (!isLoading && (!conferenceData || !conferenceData?.detail)) {
      router.push("/404");
    }
  }, [isLoading, conferenceData, router]);

  if (isLoading || !conferenceData?.detail) {
    return <div>Loading...</div>;
  }

  console.log("Conference Data topics:11111", conferenceData);

  const landingPage = conferenceData?.detail?.conference?.landingPage;
  console.log("landingPage afgasfdg sdfg dfg", landingPage);
  const id = conferenceData._id;
  const logoUrl = conferenceData?.detail?.logoUrl;
  console.log("logoUrl", logoUrl);
  const conferenceName = conferenceData.detail.conference?.landingPage?.conference;
  const prospectUsContent = conferenceData.detail.conference?.eventDetails || "";
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
