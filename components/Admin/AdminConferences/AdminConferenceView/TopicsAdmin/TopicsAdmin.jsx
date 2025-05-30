"use client";
import React, { useState ,useRef} from "react";
import ResearchGroundbreakingTabelAdmin from "./ResearchGroundbreakingTabelAdmin/ResearchGroundbreakingTabelAdmin";
import EssentialInnovationTable from "./EssentialInnovationTable/EssentialInnovationTable";
import LandingPage from "./LandingPage/LandingPage";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import { Toast } from "primereact/toast";

export default function TopicsAdmin({
  selectedConferenceID,
  topics,
  fetchConfernceData,
}) {
       const toast = useRef(null);
  
 const [activeTab, setActiveTab] = useState("Research Groundbreaking"); // default to first tab
  const tabs = {
    "Landing Page": <LandingPage selectedConferenceID={selectedConferenceID}
        headerPannelImages={topics.landingPage}
        fetchConfernceData={fetchConfernceData}
        toast={toast}/>,
    "Research Groundbreaking": <ResearchGroundbreakingTabelAdmin selectedConferenceID={selectedConferenceID}
        researchGroundBreaking={topics.researchGroundBreaking}
        fetchConfernceData={fetchConfernceData}
        toast={toast}/>,
    "Essential Innovation": <EssentialInnovationTable  selectedConferenceID={selectedConferenceID}
        essentialInnovation={topics.essentialInnovation}
        fetchConfernceData={fetchConfernceData}
        toast={toast}/>,
  };
  
  return (
    <>
      <Toast ref={toast} />

      <div className="d-flex justify-content-between">
        <h5>Topics</h5>
      
      </div>
      <div className="mt-4 ">
        {/*Tabs */}
        <ScrollableTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="mt-5">{tabs[activeTab]}</div>
      </div>
    </>
  );
}

