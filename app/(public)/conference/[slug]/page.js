import AboutConference from '@/components/AboutConference/AboutConference'
import React from 'react'
import { conferenceData } from '@/service/conferenceData';
import { notFound } from 'next/navigation';
const ConferencePage = async({ params }) => {
   const { slug } = await params; 

  const selectedConference=conferenceData.find((conf) => conf.id === slug);
  if (!selectedConference) {
    return notFound();
  }
  return (
    <AboutConference conference={selectedConference} />
  )
}

export default ConferencePage
