import React from 'react'
// import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
import ConferenceDetails from '../AboutConference/ConferenceDetails/ConferenceDetails'
import OrganizingCommitee from '../AboutConference/OrganizingCommitee/OrganizingCommitee'
import Prospectus from '../AboutConference/Prospectus/Prospectus'
import EnquiryForm from '../Home/EnquiryForm/EnquiryForm'
import RightPannel from './RightPannel/RightPannel'
import bgImage from '@/public/images/conferences/ocm-bg.png'
const OrganizingComiteeMembers = ({ conference }) => {
  return (
    <>
    <ConferenceDetails conference={conference} Component={RightPannel} bgImage={bgImage} />
    <OrganizingCommitee/>
    <Prospectus/>
    <EnquiryForm/>
    </>
  )
}

export default OrganizingComiteeMembers