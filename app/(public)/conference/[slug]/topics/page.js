import React from "react";
import DiscoverySessions from "@/components/Topics/DiscoverySessions/DiscoverySessions";

const page = async ({ params }) => {
  const { slug } = await params;
  return <DiscoverySessions conferenceId={slug} />;
};

export default page;
