import React from 'react'
import Topics from '@/components/Topics/Topics'
import { getSelectedConference } from '@/service/conferenceData';
const page= async({ params })=>{
  const { slug } = await params;
  const selectedConference = getSelectedConference(slug);
  return (
   <Topics conference={selectedConference}/>
  )
}

export default  page;