import React from 'react'
import SponsorsExhibitors from '@/components/SponsorsExhibitors/SponsorsExhibitors';
import { getSelectedConference } from '@/service/conferenceData';
const page =  async({ params }) => {
  const { slug } = await params; 
  const selectedConference=getSelectedConference(slug);

    return (
        <SponsorsExhibitors conference={selectedConference} />
    );

};
export default page;