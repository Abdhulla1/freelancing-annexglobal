import React from 'react'
import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
import Prospectus from '../AboutConference/Prospectus/Prospectus'
import EnquiryForm from '../Home/EnquiryForm/EnquiryForm'
import WebinarProgramCarousel from './WebinarProgramCarousel/WebinarProgramCarousel'

const WebinarProgram = ({conference}) => {
  
  return (
    <>
    <ConferenceDetails conference={conference}/>
    <WebinarProgramCarousel />
    <Prospectus/>
    <EnquiryForm/>
    </>
  )
}

export default WebinarProgram