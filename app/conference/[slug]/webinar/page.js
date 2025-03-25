import AboutWebinar from '@/components/AboutWebinar/AboutWebinar'
import React from 'react'
import { getSelectedConference } from '@/service/conferenceData';

const AboutWebinarPage = async({ params }) => {

    const { slug } = await params; 
    const selectedConference=getSelectedConference(slug);
  return (
    <AboutWebinar conference={selectedConference}/>
  )
}

export default AboutWebinarPage