import React from 'react'
import { getSelectedConference } from '@/service/conferenceData'
import SpecialRegistration from '@/components/SpecialRegistration/SpecialRegistration'
export default  function Registration() {
  const selectedConference =  getSelectedConference("oncology");
  return (
    <>
    <SpecialRegistration conference={selectedConference}/>
    </>
  )
}
