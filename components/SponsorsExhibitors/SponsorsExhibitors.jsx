import React from 'react'
import SponsorsExhibitorsDetails from './SponsorsExhibitorsDetails/SponsorsExhibitorsDetails';
import About from './About/About';
import Prospectus from '../AboutConference/Prospectus/Prospectus';
import OurSponsors from './OurSponsors/OurSponsors';
const SponsorsExhibitors = ({ conference }) => {
    return (
       <>
       <SponsorsExhibitorsDetails conference={conference}/>
       <About title={"Benefits"} content={"Gain unparalleled visibility at a leading conference dedicated to professionals in the office industry. Forge and strengthen strategic relationships within the office professional sector. Network with colleagues and influential decision-makers in the industry. Cost-efficient means to bolster your organization’s brand and increase brand recognition among a targeted audience. Access a wide network of industry partners from both state and federal government departments and the private sector. Present your latest innovations and new offerings to a relevant audience, highlighting your expertise and capabilities. Enhanced marketing opportunities, including exposure on the conference website and related promotional materials."}/>
       <OurSponsors/>
       <About title={"Sponsorship Benefits"} content={"Primary healthcare 2025 the medical conference offers invaluable brand exposure and networking opportunities to engage with healthcare professionals, researchers, and industry leaders. Through prominent visibility on event materials and digital platforms, sponsors elevate their brand recognition and credibility. Participation in speaking engagements and product showcases enables sponsors to demonstrate thought leadership and showcase innovative solutions. Access to market insights and tailored sponsorship packages ensures alignment with strategic objectives and audience preferences. By investing in conference sponsorship, sponsors can forge meaningful connections, drive brand awareness, and contribute to advancing healthcare innovation, ultimately fostering positive associations and driving business growth."}/>
       <Prospectus/>
       </>
    );
};
export default SponsorsExhibitors;