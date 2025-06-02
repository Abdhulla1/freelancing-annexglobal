import React from 'react'
// import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
// import AlumniSpeakers from './AlumniSpeakers/AlumniSpeakers'
import AlumniSpeakers from '../Home/AlumniSpeakers/AlumniSpeakers'
import Prospectus from '../AboutConference/Prospectus/Prospectus'
import EnquiryForm from '../Home/EnquiryForm/EnquiryForm'
import ConferenceDetails from '../AboutConference/ConferenceDetails/ConferenceDetails'
import bgImage from '@/public/images/conferences/ocm-bg.png'
import RightPannel from './RightPannel/RightPannel'
const ConferenceSpeakers = ({conference}) => {
  const landingPageContent = conference?.conference?.landingPage || "";
  const id = conference?._id
  console.log("Conference ID from ConferenceSpeakers:", conference);
 
  return (
    <div>
      <ConferenceDetails conference={landingPageContent} bgImage={bgImage} id={id} conferenceName={conference?.name} Component={RightPannel} />
      <AlumniSpeakers conference={conference}/>
      <Prospectus/>
      <EnquiryForm/>
    </div>
  )
}

export default ConferenceSpeakers