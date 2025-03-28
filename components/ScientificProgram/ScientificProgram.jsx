import React from 'react'
import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
import Prospectus from '../AboutConference/Prospectus/Prospectus'
import EnquiryForm from '../Home/EnquiryForm/EnquiryForm'
import ScientificProgramCarousel from './ScientificProgramCarousel/ScientificProgramCarousel'

const ScientificProgram = ({conference}) => {
  
  return (
    <>
    <ConferenceDetails conference={conference}/>
    <ScientificProgramCarousel />
    <Prospectus/>
    <EnquiryForm/>
    </>
  )
}

export default ScientificProgram