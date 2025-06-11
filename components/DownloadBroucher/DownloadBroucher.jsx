import React from 'react'
import ConferenceDetails from '../AboutConference/ConferenceDetails/ConferenceDetails';
import BroucherForm from './BroucherForm/BroucherForm';
import bgImage from '@/public/images/conferences/submit-abstract-bg.png'
const DownloadBroucher = ({ conference }) => {
     const id = conference?._id
  const logoUrl = conference?.logoUrl 
  const landingPageContent = conference?.conference?.landingPage || "";
  const conferenceName = conference?.conference?.landingPage?.conference;
 const brochure=conference?.brochure || null;
    return (
       <>
       <ConferenceDetails
          conferenceName={conferenceName}
        logoUrl={logoUrl}
        id={id}
        conference={landingPageContent} bgImage={bgImage}/>
       <BroucherForm brochure={brochure} conferenceName={conferenceName}/>
       </>
    );
};
export default DownloadBroucher;