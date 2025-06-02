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

import { useEffect } from 'react'

const Home = () => {
  const { data: visitorData, refetch: refetchVisitor } = useVisitor()

  useEffect(() => {
    refetchVisitor()
  }, [refetchVisitor])

  return (
    <div>
      <Banner/>
      <Counter/>
      <AboutAnnex/>
      <AboutMission/>
      <UpcomingConference/>
      <AlumniSpeakers/>
      <ReputedOrganizations/>
      <ConnectWithOthers/>
      <section id='newsletter'>
      <EnquiryForm/>
      </section>
  

    </div>
  )
}

export default Home
