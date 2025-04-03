import React from 'react'
import Registration from '@/components/Registration/Registration';
import { getSelectedConference } from '@/service/conferenceData';
const page= async ({ params })=>{

  const {slug}= await params;
  const selectedConference=getSelectedConference(slug);
  return (
  <Registration conference={selectedConference}/>
  )
}

export default  page;