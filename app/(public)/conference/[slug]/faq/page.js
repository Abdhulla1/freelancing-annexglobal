import React from 'react'
import FAQ from '@/components/FAQ/FAQ';
import { getSelectedConference } from '@/service/conferenceData';
const page= async({ params })=>{
    const { slug } = await params;
    const selectedConference = getSelectedConference(slug);
    return (
      <FAQ conference={selectedConference}/>
    )
  }
export default page;
