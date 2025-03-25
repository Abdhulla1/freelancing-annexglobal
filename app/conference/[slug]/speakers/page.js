import ConferenceSpeakers from '@/components/ConferenceSpeakers/ConferenceSpeakers'
import React from 'react'
import { getSelectedConference } from '@/service/conferenceData';
const SpeakersPage = async({ params }) => {

    const { slug } = await params; 
    const selectedConference=getSelectedConference(slug);
  return (
    <ConferenceSpeakers conference={selectedConference}/>
  )
}

export default SpeakersPage