import React from 'react'
import ScientificProgram from '@/components/ScientificProgram/ScientificProgram';
import { getSelectedConference
    
 } from '@/service/conferenceData';
const page=async({ params }) => {

    const { slug } = await params; 
    const selectedConference=getSelectedConference(slug);
  return (
    <ScientificProgram conference={selectedConference}/>
  )
}
export default page;