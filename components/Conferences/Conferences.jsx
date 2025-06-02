'use client'
import React from 'react'
import UpcomingConferences from './UpcomingConferences/UpcomingConferences'
import UpcomingConference from './UpcomingConference/UpcomingConference'
import PastConferences from './PastConferences/PastConferences'
import { useConferenceLandingPage } from '@/hooks/useWeather'
const Conferences = () => {
  const { data: conferenceData } = useConferenceLandingPage("upcoming");
  const { data: pastConferenceData } = useConferenceLandingPage("past");
  return (
    <>
    <UpcomingConferences   />
    <UpcomingConference conference={conferenceData}/>
    <PastConferences pastConference={pastConferenceData}/>
    </>
  )
}

export default Conferences