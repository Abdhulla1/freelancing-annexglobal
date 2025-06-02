import React from 'react'
import SubmitAbstractDetails from './SubmitAbstractDetails/SubmitAbstractDetails';
import ConferenceDetails from '../AboutConference/ConferenceDetails/ConferenceDetails';
import AboutAbstract from './AboutAbstract/AboutAbstract';
import ResearchPaperForm from './ResearchForm/ResearchPaperForm';
import Prospectus from '../AboutConference/Prospectus/Prospectus';
import bgImage from '@/public/images/conferences/submit-abstract-bg.png'
const SubmitAbstract = ({ conference }) => {
     const id = conference?._id
  const logoUrl = conference?.logoUrl 
  const landingPageContent = conference?.conference?.landingPage || "";
 
    return (
       <>
       {/* <SubmitAbstractDetails conference={conference}/> */}
       <ConferenceDetails
          conferenceName={conference?.name}
        logoUrl={logoUrl}
        id={id}
        conference={landingPageContent} bgImage={bgImage}/>
       <AboutAbstract/>
       <ResearchPaperForm/>
       <Prospectus/>
       </>
    );
};
export default SubmitAbstract;