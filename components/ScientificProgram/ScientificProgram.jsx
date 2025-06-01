import React from 'react'
// import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
import Prospectus from '../AboutConference/Prospectus/Prospectus'
import EnquiryForm from '../Home/EnquiryForm/EnquiryForm'
import ScientificProgramCarousel from './ScientificProgramCarousel/ScientificProgramCarousel'
import ConferenceDetails from '../AboutConference/ConferenceDetails/ConferenceDetails'
import bgImage from '@/public/images/conferences/webinar-program-bg.png'
import RightPannel from '../WebinarProgram/RightPannel/RightPannel'
const ScientificProgram = ({conference}) => {

  console.log("Scientific Program Conference:", conference);
  
  return (
    <>
    <ConferenceDetails conference={conference} bgImage={bgImage} Component={RightPannel}/>
    <ScientificProgramCarousel />
    <Prospectus/>
    <EnquiryForm/>
    </>
  )
}

export default ScientificProgram
