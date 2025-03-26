import React from 'react'
import SubmitAbstractDetails from './SubmitAbstractDetails/SubmitAbstractDetails';
import AboutAbstract from './AboutAbstract/AboutAbstract';
import ResearchPaperForm from './ResearchForm/ResearchPaperForm';
import Prospectus from '../AboutConference/Prospectus/Prospectus';
const SubmitAbstract = ({ conference }) => {
    return (
       <>
       <SubmitAbstractDetails conference={conference}/>
       <AboutAbstract/>
       <ResearchPaperForm/>
       <Prospectus/>
       </>
    );
};
export default SubmitAbstract;