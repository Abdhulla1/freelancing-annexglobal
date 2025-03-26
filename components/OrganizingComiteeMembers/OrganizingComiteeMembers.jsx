import React from 'react'
import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
import OrganizingCommitee from '../AboutConference/OrganizingCommitee/OrganizingCommitee'
import Prospectus from '../AboutConference/Prospectus/Prospectus'
import EnquiryForm from '../Home/EnquiryForm/EnquiryForm'

const OrganizingComiteeMembers = ({ conference }) => {
  return (
    <>
    <ConferenceDetails conference={conference}/>
    <OrganizingCommitee/>
    <Prospectus/>
    <EnquiryForm/>
    </>
  )
}

export default OrganizingComiteeMembers