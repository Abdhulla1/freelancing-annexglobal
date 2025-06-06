"use client";
import React, { useState, useRef, useEffect } from "react";
import ScrollableTabs from "@/components/Reusable/Admin/ScrollableTabs/ScrollableTabs";
import LandingPage from "./LandingPage/LandingPage";
import CategoryPage from "./Category/CategoryPage";
import VideoSection from "./VideoSection/VideoSection";
import NavLocationOverview from "./NavLocationOverview/NavLocationOverview";
import WelcomeContent from "./WelcomeContent/WelcomeContent";
import { getMainPageData } from "@/service/mainPageService";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";

export default function MainPage({}) {
  const toast = useRef(null);
  const [activeTab, setActiveTab] = useState("Landing Page");
  const [loading, setLoading] = useState(true);


  // default to first tab
  const [mainPageData, setMainPageData] = useState([]);
  
  
    const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getMainPageData();
      
      if (res.status === 200) {
        setMainPageData(res.data?.detail || []);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Failed to Load  MainPage Data",
          detail: res.data?.detail?.[0]?.msg || "Please try again.",
          life: 3000,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Failed to Load MainPage Data",
        detail: error.message || "Please try again.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);// default to first tab
  const tabs = {
    "Landing Page": <LandingPage LandingPageData={mainPageData.landingPage} toast={toast} fetchData={fetchData}/>,
    "Welcome Content": <WelcomeContent WelcomeContent={mainPageData.welcomeContent} toast={toast} fetchData={fetchData}/>,
    "Video Section": <VideoSection VideoSection={mainPageData.videoSection} toast={toast} fetchData={fetchData}/>,
    Category: <CategoryPage categoryData={mainPageData.categories} toast={toast} fetchData={fetchData} />,
    // "Location Overview": <NavLocationOverview Location={mainPageData.location} toast={toast} fetchData={fetchData}/>,
  };

  return (
    <>

      <div className="d-flex justify-content-between">
        <h5>Main Page</h5>
      </div>

      <Toast ref={toast} />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="5"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) :   mainPageData.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>Failed to Load MainPage Data</h5>
        
        </div>
      ) : (
        <div className="mt-4 container bg-white rounded px-4 py-3">
          {/*Tabs */}
          <ScrollableTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="mt-5">{tabs[activeTab]}</div>
        </div>
      )}
    </>
  );
}
