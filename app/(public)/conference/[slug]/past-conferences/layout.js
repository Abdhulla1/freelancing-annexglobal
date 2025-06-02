'use client';
import ConferenceDetails from "@/components/AboutConference/ConferenceDetails/ConferenceDetails";
import { useConferenceDetails } from "@/hooks/useWeather";
import { useParams, notFound } from "next/navigation";

export default function ConferenceLayout({ children }) {
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


  return (
    <div>
      <ConferenceDetails conference={conferenceData} />
      {children}
    </div>
  );
}
