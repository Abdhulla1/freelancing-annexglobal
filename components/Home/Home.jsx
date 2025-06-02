"use client"

import React from 'react'
import Banner from './Banner/Banner'
import Counter from './Counter/Counter'
import AboutAnnex from './AboutAnnex/AboutAnnex'
import AboutMission from './AboutMission/AboutMission'
import UpcomingConference from './UpcomingConference/UpcomingConference'
import AlumniSpeakers from './AlumniSpeakers/AlumniSpeakers'
import ReputedOrganizations from './ReputedOrganizations/ReputedOrganizations'
import EnquiryForm from './EnquiryForm/EnquiryForm'
import ConnectWithOthers from './ConnectWithOthers/ConnectWithOthers'
import { useVisitor } from '@/hooks/useWeather'
import { useConferenceLandingPage, useMainPage, useTestimonial } from '@/hooks/useWeather'
import { useEffect } from 'react'

const Home = () => {
  const { data: mainPageData } = useMainPage();
  const { data: conferenceData } = useConferenceLandingPage("upcoming");
  const { data: visitorData, refetch: refetchVisitor } = useVisitor()
  const { data: testimonialData } = useTestimonial();

  console.log("Main Page Data:", testimonialData);
  useEffect(() => {
    refetchVisitor()
  }, [refetchVisitor])



  return (
    <div>
      <Banner data={mainPageData} />
      <Counter/>
      <AboutAnnex data={mainPageData}/>
      <AboutMission conference={mainPageData}/>
      <UpcomingConference conference={conferenceData} honeyComb={mainPageData} />
      {/* <AlumniSpeakers/> */}
      <ReputedOrganizations />
      <ConnectWithOthers conference={testimonialData} />
      <section id='newsletter'>
      <EnquiryForm/>
      </section>
  

    </div>
  )
}

export default Home
