'use client';

import React, { useEffect } from 'react';
import TopicCentric from '@/components/Topics/TopicCentric/TopicCentric';
import { useConferenceDetails } from '@/hooks/useWeather';
import { useParams, useRouter } from 'next/navigation';

const Page = () => {
  const { slug, topicId } = useParams();
  const router = useRouter();

  const { data: conferenceData, isLoading } = useConferenceDetails(slug);

  useEffect(() => {
    if (!isLoading && !conferenceData?.detail) {
      router.push('/404');
    }
  }, [isLoading, conferenceData, router]);

  if (isLoading || !conferenceData?.detail) {
    return <div>Loading...</div>;
  }

  const {
    researchGroundBreaking = [],
    essentialInnovation = [],
  } = conferenceData.detail.topics || {};

  const topicFromResearch = researchGroundBreaking.find((t) => t.topicId === topicId);
  const topicFromEssential = essentialInnovation.find((t) => t.topicId === topicId);

  const topic = topicFromResearch || topicFromEssential;

  if (!topic) {
    return <div>Topic not found</div>;
  }

  const topicList = topicFromResearch ? researchGroundBreaking : essentialInnovation;

  return (
    <TopicCentric
      topic={topic}
      topics={topicList}
    />
  );
};

export default Page;
