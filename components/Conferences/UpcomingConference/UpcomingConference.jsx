"use client";
import React, { useState } from "react";
import UpcomingConferenceStyle from "./UpcomingConference.module.css";
import Slider from "react-slick";
import Link from "next/link";
// import HoneycombTabs from "./Honeycombtab";
import HoneycombTabs from "@/components/Home/UpcomingConference/Honeycombtab";
import Button from "@/components/Static/Button";
const UpcomingConference = () => {
  const categories = [
    "ALL",
    "ENT",
    "DIABETES",
    "HEALTHCARE",
    "NUTRITION",
    "NEUROSCIENCE",
    "GYNECOLOGY",
    "DERMATOLOGY",
    "SURGERY",
    "ORTHOPEDICS",
    "CARDIOLOGY",
    "NURSING",
    "CANCER",
  ];

  const upcomingConferences = [
    {
      date: "17 Mar 2026",
      image: "/images/home/upcoming-conference/eventsPediatrics.png",
      title: "Annual Congress on gynecology, obstetrics & women’s health",
      location: "Dubai, UAE",
      id: "gynecology-conference",
      icon: "/icons/conference/logo.png",
    },
    {
      date: "22 Apr 2026",
      image: "/images/home/upcoming-conference/eventsPediatricsNeonatology.png",
      title: "Primary Healthcare, Pain Management & Functional Structure",
      location: "New York, USA",
      id: "primary-healthcare",
      icon: "/icons/conference/primaryHealthcare.png",
    },
    {
      date: "10 May 2026",
      image: "/images/home/upcoming-conference/neuroscience.png",
      title: "International Conference on global healthcare",
      location: "London, UK",
      id: "neurology-brain-disorders",
      icon:"/icons/conference/ghc.png"
    },
    {
      date: "5 Jun 2026",
      image: "/images/home/upcoming-conference/eventsPediatrics.png",
      title: "International webinar on global healthcare",
      location: "Sydney, Australia",
      id: "healthcare-webinar",
      icon: "/icons/conference/healthcarewebinar.png",
    },
    {
      date: "18 Jul 2026",
      image: "/images/home/upcoming-conference/eventsPediatricsNeonatology.png",
      title: "International webinar on oncology & cancer research",
      location: "Paris, France",
      id: "oncology",
      icon: "/icons/conference/oncology.png",
    },
    {
      date: "23 Aug 2026",
      image: "/images/home/upcoming-conference/Osteoarthtris.png",
      title:"International Webinar on Gynaecology, Obstetrics and Women’s Healthcare",
      location: "Toronto, Canada",
      id: "gynaecology-webinar",
      icon: "/icons/conference/gynaecologyWebinar.png",
    },
    {
      date: "5 Jun 2026",
      image: "/images/home/upcoming-conference/eventsPediatrics.png",
      title: "International webinar on global healthcare",
      location: "Sydney, Australia",
      id: "healthcare-webinar",
      icon: "/icons/conference/healthcarewebinar.png",
    },
    {
      date: "18 Jul 2026",
      image: "/images/home/upcoming-conference/eventsPediatricsNeonatology.png",
      title: "International webinar on oncology & cancer research",
      location: "Paris, France",
      id: "oncology",
      icon: "/icons/conference/oncology.png",
    },
   
  ];

  const [activeTab, setActiveTab] = useState(categories[0]);
  return (
    <div className={`p-4 ${UpcomingConferenceStyle.container}`}>
      <h3 className="text-uppercase text-center mt-5">
        Select the upcoming events categorized
      </h3>
      {/* <div className="mt-5">
        <div className={UpcomingConferenceStyle["honeycomb-container"]}>
          {categories.map((el) => (
            <div
              key={el}
              className={`${UpcomingConferenceStyle["honeycomb-tab"]} ${
                activeTab === el ? UpcomingConferenceStyle.active : ""
              }`}
              onClick={() => setActiveTab(el)}
            >
              {el}
            </div>
          ))}
        </div>
      </div> */}
      <HoneycombTabs />
      <div className="mt-4 container-fluid">
          <div>
            <div className="container">
              <div className="row">
                {upcomingConferences.map((event, i) => (
                  <div className="col-md-6 col-lg-4 mb-3" key={i}>
                    <div
                      className={
                        UpcomingConferenceStyle["upcoming-events-card"]
                      }
                    >
                      <span className={UpcomingConferenceStyle["date"]}>
                        {event.date}
                      </span>
                      <img src={event.image} alt="Event Image" />
                      <div className={UpcomingConferenceStyle["content"]}>
                        <div className={UpcomingConferenceStyle["event-title"]}>
                          {event.title}
                        </div>
                        <div className={UpcomingConferenceStyle["location"]}>
                          {event.location}
                        </div>
                      </div>
                      <Link
                        href={`/conference/${event.id}`}
                        className={UpcomingConferenceStyle["buy-button"]}
                      >
                        BUY TICKETS
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div></div>
      </div>
      {/* <div className=" mb-4 d-flex align-items-center justify-content-center">
        <Button label="View More" href="/conferences"/>
      </div> */}
    </div>
  );
};

export default UpcomingConference;
