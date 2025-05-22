import React from 'react'
import ConferenceAttendees from '@/components/ConferencePastConference/ConferenceAttendees/ConferenceAttendees';
import { conferenceData } from '@/service/conferenceData';
export default async function page({params}) {
       const { slug } = await params; 
    
      const selectedConference=conferenceData.find((conf) => conf.id === slug);
      if (!selectedConference) {
        return notFound();
      }
  return (
    <ConferenceAttendees conference={selectedConference}/>
  )
}
