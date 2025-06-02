'use client';
import ConferenceDetails from "@/components/AboutConference/ConferenceDetails/ConferenceDetails";
import { useConferenceLandingPage } from "@/hooks/useWeather";
import { useParams, notFound } from "next/navigation";

export default function ConferenceLayout({ children }) {
  const { slug } = useParams();
  const { data: conferenceData } = useConferenceLandingPage("upcoming");

  if (!conferenceData) return null; // loading state

  const selectedConference = conferenceData?.detail?.find(
    (conf) => conf.name === slug
  );

  if (!selectedConference) {
    return notFound();
  }

  return (
    <div>
      <ConferenceDetails conference={selectedConference} />
      {children}
    </div>
  );
}
