import React from 'react'
import UpcomingConferences from './UpcomingConferences/UpcomingConferences'
import UpcomingConference from './UpcomingConference/UpcomingConference'
import PastConferences from './PastConferences/PastConferences'

const Conferences = () => {
  return (
    <>
    <UpcomingConferences  />
    <UpcomingConference/>
    <PastConferences/>
    </>
  )
}

export default Conferences