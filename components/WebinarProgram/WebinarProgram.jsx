import React from 'react'
// import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
import ConferenceDetails from '../AboutConference/ConferenceDetails/ConferenceDetails'
import Prospectus from '../AboutConference/Prospectus/Prospectus'
import EnquiryForm from '../Home/EnquiryForm/EnquiryForm'
import WebinarProgramCarousel from './WebinarProgramCarousel/WebinarProgramCarousel'
import RightPannel from './RightPannel/RightPannel'
import bgImage from '@/public/images/conferences/webinar-program-bg.png'
const WebinarProgram = ({conference}) => {
  
  return (
    <>
    <ConferenceDetails conference={conference} Component={RightPannel} bgImage={bgImage}/>
    <WebinarProgramCarousel />
    <Prospectus/>
    <EnquiryForm/>
    </>
  )
}

export default WebinarProgram