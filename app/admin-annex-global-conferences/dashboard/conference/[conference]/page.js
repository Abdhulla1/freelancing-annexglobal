import AdminConferenceView from '@/components/Admin/AdminConferences/AdminConferenceView/AdminConferenceView'
import React from 'react'
import { getSelectedConference } from '@/service/conferenceData';
export default async function page({params}) {
    const {conference}=await params;
  return (
        <AdminConferenceView conference={conference}/>
  )
}