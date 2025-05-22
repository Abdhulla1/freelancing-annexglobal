import React from 'react'
import PastConferenceMain from '@/components/ConferencePastConference/PastConferenceMain/PastConferenceMain';
import { conferenceData } from '@/service/conferenceData';
export default async function page({params}) {
     const { slug } = await params; 
  
    const selectedConference=conferenceData.find((conf) => conf.id === slug);
    if (!selectedConference) {
      return notFound();
    }
  return (
   <PastConferenceMain conference={selectedConference}/>
  )
}
