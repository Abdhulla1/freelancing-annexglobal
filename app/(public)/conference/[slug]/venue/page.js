import React from 'react'
import Venue from '@/components/Venue/Venue'
import { getSelectedConference } from '@/service/conferenceData';
export default async function page({ params }) {
    const {slug}=await params;
    const selectedConference=getSelectedConference(slug);
  return (
   <Venue conference={selectedConference}/>
  )
}
