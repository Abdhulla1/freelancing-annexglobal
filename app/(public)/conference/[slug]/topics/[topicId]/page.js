import React from "react";
import TopicCentric from "@/components/Topics/TopicCentric/TopicCentric";
const page =async({params}) => {
  const { slug, topicId } = await params;
  return <TopicCentric topicId={topicId} conferenceId={slug} />;
};

export default page;
