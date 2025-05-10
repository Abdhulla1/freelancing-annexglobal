import AboutConference from '@/components/AboutConference/AboutConference'
import React from 'react'
import { conferenceData } from '@/service/conferenceData';

const ConferencePage = async({ params }) => {
   const { slug } = await params; 

  const selectedConference=conferenceData.find((conf) => conf.id === slug);
  return (
    <AboutConference conference={selectedConference} />
  )
}

export default ConferencePage
