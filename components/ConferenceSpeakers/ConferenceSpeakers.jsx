import React from 'react'
import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
import AlumniSpeakers from './AlumniSpeakers/AlumniSpeakers'
import Prospectus from '../AboutConference/Prospectus/Prospectus'
import EnquiryForm from '../Home/EnquiryForm/EnquiryForm'

const ConferenceSpeakers = ({conference}) => {
  return (
    <div>
      <ConferenceDetails conference={conference}/>
      <AlumniSpeakers/>
      <Prospectus/>
      <EnquiryForm/>
    </div>
  )
}

export default ConferenceSpeakers