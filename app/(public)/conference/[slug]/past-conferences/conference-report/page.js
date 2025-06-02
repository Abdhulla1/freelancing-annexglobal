'use client';

import React from 'react';
import PastConferenceReport from '@/components/ConferencePastConference/PastConferenceReport/PastConferenceReport';
import { useConferenceDetails } from '@/hooks/useWeather';
import { useParams } from 'next/navigation';

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

  return <PastConferenceReport conference={conferenceData} />;
};

export default Page;
