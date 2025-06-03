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
  const conferenceName = conference?.conference?.landingPage?.conference;
  const logoUrl = conference?.logoUrl || "";
  const id = conference?._id
  const prospectUsContent = conference?.conference?.eventDetails || "";
  const headerPanelImages = conference?.speakers?.headerPanelImages || [];
 
  return (
    <div>
      <ConferenceDetails conference={landingPageContent} logoUrl={logoUrl} headerPanelImages={headerPanelImages} bgImage={bgImage} id={id} conferenceName={conferenceName} Component={RightPannel} />
      <AlumniSpeakers conference={conference}/>
      <Prospectus conference={prospectUsContent} id={id} />
      <EnquiryForm/>
    </div>
  )
}

export default ConferenceSpeakers