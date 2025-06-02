import React from 'react'
import AboutWebinarStyles from './AboutWebinar.module.css';
// import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
import ConferenceDetails from '../AboutConference/ConferenceDetails/ConferenceDetails';
import WelcomeContent from './WelcomeContent/WelcomeContent';
import VisualRecap from './VisualRecap/VisualRecap';
import OrganizingCommitee from '../AboutConference/OrganizingCommitee/OrganizingCommitee';
import DiscoverySessions from '../AboutConference/DiscoverySessions/DiscoverySessions';
import AlumniSpeakers from '../Home/AlumniSpeakers/AlumniSpeakers';
import QueriesAnswered from '../AboutConference/QueriesAnswered/QueriesAnswered';
import Prospectus from '../AboutConference/Prospectus/Prospectus';
import ConnectWithOthers from '../Home/ConnectWithOthers/ConnectWithOthers';
import EnquiryForm from '../Home/EnquiryForm/EnquiryForm';
import RightPannel from './RightPannel/RightPannel';
import bgImage from "@/public/images/conferences/webinar-bg.webp";

const AboutWebinar = ({conference}) => {
  console.log("Conference ID from AboutWebinar:", conference);
  const discoverySessions = conference?.topics?.essentialInnovation || "";
  const alumniSpeakers = conference?.alumniSpeakers || [];
  const queriesAnswered = conference?.webinar?.queriesAns || "";
  const welcomeContent = conference?.webinar?.welcomeContent || "";
  return (
    <>
       
        <ConferenceDetails conference={conference} Component={RightPannel} bgImage={bgImage} buttonProps={{name:'Webinar Program',href:`/conference/${conference.id}/webinar-program`}} />
        <WelcomeContent conference={welcomeContent}/>
        <VisualRecap conference={conference}/>
        {/* <OrganizingCommitee conference={conference}/> */}
        <DiscoverySessions conference={discoverySessions}/>
        <AlumniSpeakers conference={conference}/>
        <QueriesAnswered conference={queriesAnswered}/>
        <Prospectus conference={conference}/>
        {/* <ConnectWithOthers conference={conference}/> */}
        <EnquiryForm/>
    </>
  )
}

export default AboutWebinar