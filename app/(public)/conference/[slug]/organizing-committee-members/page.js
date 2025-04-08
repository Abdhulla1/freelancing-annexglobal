import OrganizingComiteeMembers from '@/components/OrganizingComiteeMembers/OrganizingComiteeMembers'
import React from 'react'
import { getSelectedConference } from '@/service/conferenceData'
const OrganizingCommitteePage = async({ params }) => {
  const { slug } = await params; 
  const selectedConference=getSelectedConference(slug);
  return (
    <OrganizingComiteeMembers conference={selectedConference}/>
  )
}

export default OrganizingCommitteePage