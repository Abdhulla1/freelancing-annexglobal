import React from 'react'
import PastConference from './PastConferenceCards/PastConference'
import UpcomingConferences from './UpcomingConferences/UpcomingConferences'
const PastConferenceMain = () => {
  return (
    <>
    <UpcomingConferences  />
    <PastConference/>
    </>
  )
}

export default PastConferenceMain;