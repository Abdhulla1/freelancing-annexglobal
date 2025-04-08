import React from 'react'
import SubmitAbstract from '@/components/SubmitAbstract/SubmitAbstract';
import { getSelectedConference } from '@/service/conferenceData';
const SubmitAbstractPage =  async({ params }) => {
  const { slug } = await params; 
  const selectedConference=getSelectedConference(slug);

    return (
        <SubmitAbstract conference={selectedConference} />
    );

};
export default SubmitAbstractPage;