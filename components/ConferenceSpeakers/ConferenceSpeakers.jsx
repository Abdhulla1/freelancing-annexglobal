import React from 'react'
// import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
import AlumniSpeakers from './AlumniSpeakers/AlumniSpeakers'
import Prospectus from '../AboutConference/Prospectus/Prospectus'
import EnquiryForm from '../Home/EnquiryForm/EnquiryForm'
import ConferenceDetails from '../AboutConference/ConferenceDetails/ConferenceDetails'
import bgImage from '@/public/images/conferences/ocm-bg.png'
import RightPannel from './RightPannel/RightPannel'
const ConferenceSpeakers = ({conference}) => {
  return (
    <div>
      <ConferenceDetails conference={conference} bgImage={bgImage} Component={RightPannel} />
      <AlumniSpeakers/>
      <Prospectus/>
      <EnquiryForm/>
    </div>
  )
}

export default ConferenceSpeakers