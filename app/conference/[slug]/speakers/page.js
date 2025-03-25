import ConferenceSpeakers from '@/components/ConferenceSpeakers/ConferenceSpeakers'
import React from 'react'
import { conferenceData } from '@/service/conferenceData';

const SpeakersPage = async({ params }) => {

  const { slug } = await params; 
    const selectedConference=conferenceData.find((conf) => conf.id === slug);
  

  return (
    <ConferenceSpeakers conference={selectedConference}/>
  )
}

export default SpeakersPage