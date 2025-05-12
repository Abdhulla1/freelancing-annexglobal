import React from 'react'
import Venue from '@/components/Venue/Venue'
import { getSelectedConference } from '@/service/conferenceData';
import { notFound } from 'next/navigation';
export default async function page({ params }) {
    const {slug}=await params;
    const selectedConference=getSelectedConference(slug);
     if (!selectedConference) {
        return notFound();
      }
  return (
   <Venue conference={selectedConference}/>
  )
}
