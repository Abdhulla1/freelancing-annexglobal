import React from 'react'
import AboutWebinarStyles from './AboutWebinar.module.css';
import ConferenceDetails from './ConferenceDetails/ConferenceDetails';
import WelcomeContent from './WelcomeContent/WelcomeContent';
import VisualRecap from './VisualRecap/VisualRecap';
import OrganizingCommitee from '../AboutConference/OrganizingCommitee/OrganizingCommitee';
import DiscoverySessions from '../AboutConference/DiscoverySessions/DiscoverySessions';
import AlumniSpeakers from '../Home/AlumniSpeakers/AlumniSpeakers';
import QueriesAnswered from '../AboutConference/QueriesAnswered/QueriesAnswered';
import Prospectus from '../AboutConference/Prospectus/Prospectus';
import ConnectWithOthers from '../Home/ConnectWithOthers/ConnectWithOthers';
import EnquiryForm from '../Home/EnquiryForm/EnquiryForm';

const AboutWebinar = ({conference}) => {
  return (
    <>
        <ConferenceDetails conference={conference}/>
        <WelcomeContent/>
        <VisualRecap/>
        <OrganizingCommitee/>
        <DiscoverySessions/>
        <AlumniSpeakers/>
        <QueriesAnswered/>
        <Prospectus/>
        <ConnectWithOthers/>
        <EnquiryForm/>
    </>
  )
}

export default AboutWebinar