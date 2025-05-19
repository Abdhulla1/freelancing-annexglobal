import React from 'react'
import FAQDetails from './FAQDetails/FAQDetails';
import ConferenceDetails from '../AboutConference/ConferenceDetails/ConferenceDetails';
import About from './About/About';
import Prospectus from '../AboutConference/Prospectus/Prospectus';
import FAQTabs from './FAQTabs/FAQTabs';
import bgImage from '@/public/images/conferences/submit-abstract-bg.webp'
const FAQ = ({ conference }) => {
    return (
       <>
       <ConferenceDetails conference={conference} bgImage={bgImage}/>
      {/* <About title={"Benefits"} content={"Gain unparalleled visibility at a leading conference dedicated to professionals in the office industry. Forge and strengthen strategic relationships within the office professional sector. Network with colleagues and influential decision-makers in the industry. Cost-efficient means to bolster your organization’s brand and increase brand recognition among a targeted audience. Access a wide network of industry partners from both state and federal government departments and the private sector. Present your latest innovations and new offerings to a relevant audience, highlighting your expertise and capabilities. Enhanced marketing opportunities, including exposure on the conference website and related promotional materials."}/> */}
       <FAQTabs/>
       <Prospectus/>
       </>
    );
};
export default FAQ;