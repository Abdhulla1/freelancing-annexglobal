import React from 'react'
import PastConferenceReport from '@/components/ConferencePastConference/PastConferenceReport/PastConferenceReport'
import { conferenceData } from '@/service/conferenceData';
export default async function page({params}) {
       const { slug } = await params; 
    
      const selectedConference=conferenceData.find((conf) => conf.id === slug);
      if (!selectedConference) {
        return notFound();
      }
  return (
    <PastConferenceReport conference={selectedConference}/>
  )
}
