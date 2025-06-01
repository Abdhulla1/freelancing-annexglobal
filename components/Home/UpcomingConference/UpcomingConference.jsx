"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link";
import UpcomingConferenceStyle from "./UpcomingConference.module.css";
import HoneycombTabs from "./Honeycombtab";
import Button from "@/components/Static/Button";
import { useMainPage } from "@/hooks/useWeather";

const UpcomingConference = () => {
  const { data: mainPageData } = useMainPage();
  const categories = mainPageData?.upcomingConference?.categories || [];
  
  const upcomingConferences = [
    {
      date: "17 Mar 2026",
      image: "/images/home/upcoming-conference/eventsPediatrics.png",
      title: "Annual Congress on Gynecology",
      location: "Dubai, UAE",
      id: "gynecology-conference",
    },
    {
      date: "22 Apr 2026",
      image: "/images/home/upcoming-conference/eventsPediatricsNeonatology.png",
      title: "Primary Healthcare Conference",
      location: "New York, USA",
      id: "primary-healthcare",
    },
    {
      date: "10 May 2026",
      image: "/images/home/upcoming-conference/neuroscience.png",
      title: "Global Healthcare Conference",
      location: "London, UK",
      id: "neurology-brain-disorders",
    },
    {
      date: "5 Jun 2026",
      image: "/images/home/upcoming-conference/eventsPediatrics.png",
      title: "Healthcare Webinar",
      location: "Sydney, Australia",
      id: "healthcare-webinar",
    },
    {
      date: "18 Jul 2026",
      image: "/images/home/upcoming-conference/eventsPediatricsNeonatology.png",
      title: "Oncology & Cancer Research",
      location: "Paris, France",
      id: "oncology",
    },
    {
      date: "23 Aug 2026",
      image: "/images/home/upcoming-conference/Osteoarthtris.png",
      title: "Gynaecology Webinar",
      location: "Toronto, Canada",
      id: "gynaecology-webinar",
    },
    {
      date: "5 Sep 2026",
      image: "/images/home/upcoming-conference/neuroscience.png",
      title: "Neuroscience Summit",
      location: "Berlin, Germany",
      id: "neuroscience-summit",
    },
    {
      date: "12 Oct 2026",
      image: "/images/home/upcoming-conference/Osteoarthtris.png",
      title: "Orthopedics & Sports Medicine",
      location: "Singapore",
      id: "orthopedics-conference",
    },
    {
      date: "5 Jun 2026",
      image: "/images/home/upcoming-conference/eventsPediatrics.png",
      title: "Healthcare Webinar",
      location: "Sydney, Australia",
      id: "healthcare-webinar",
    },
    {
      date: "18 Jul 2026",
      image: "/images/home/upcoming-conference/eventsPediatricsNeonatology.png",
      title: "Oncology & Cancer Research",
      location: "Paris, France",
      id: "oncology",
    },
    {
      date: "23 Aug 2026",
      image: "/images/home/upcoming-conference/Osteoarthtris.png",
      title: "Gynaecology Webinar",
      location: "Toronto, Canada",
      id: "gynaecology-webinar",
    },
  ];

  const CustomArrow = ({ className, style, onClick, direction }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "linear-gradient(45deg, #00004d, #0000a6)",
          borderTopLeftRadius: direction === "left" ? "20%" : "0",
          borderBottomLeftRadius: direction === "left" ? "20%" : "0",
          borderTopRightRadius: direction === "right" ? "20%" : "0",
          borderBottomRightRadius: direction === "right" ? "20%" : "0",
          width: "40px",
          height: "90px",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onClick}
      >
        {direction === "left" ? (
          <i className="pi-angle-double-left text-white pi"></i>
        ) : (
          <i className="pi-angle-double-right text-white pi"></i>
        )}
      </div>
    );
  };
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // set initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const limitedConferences = isMobile
    ? upcomingConferences.slice(0, 4)
    : upcomingConferences;

  const slides = isMobile
    ? chunkArray(limitedConferences, 4)
    : chunkArray(limitedConferences, 6);

    console.log(slides)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isMobile, // Hide arrows on mobile
    prevArrow: !isMobile && <CustomArrow direction="left" />,
    nextArrow: !isMobile && <CustomArrow direction="right" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className={`p-4 ${UpcomingConferenceStyle.container}`}>
      <h3 className="text-uppercase fw-bold text-center mt-5">
        Select the upcoming events categorized
      </h3>
      <HoneycombTabs data={categories} />
      <div className="mt-4 container">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <div className={`container ${isMobile ? "p-0" : "p-5"}`}>
                <div className="row">
                  {slide.map((event, i) => (
                    <Link
                      href={`/conference/${event.id}`}
                      className={`text-decoration-none ${
                        isMobile
                          ? "custom-mobile-col col-6"
                          : "col-12 col-sm-12 col-md-6 col-lg-4"
                      } mb-3`}
                      key={i}
                    >
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
                          <div
                            className={UpcomingConferenceStyle["event-title"]}
                          >
                            {event.title}
                          </div>
                          <div className={UpcomingConferenceStyle["location"]}>
                            {event.location}
                          </div>
                        </div>
                        <div
                          href={`/conference/${event.id}`}
                          className={` ${UpcomingConferenceStyle["buy-button"]}`}
                        >
                          BUY TICKETS
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="mb-4 d-flex align-items-center justify-content-center">
        {/* <Button label="View More" href="/conferences" /> */}
        <button className="brand-btn ">
          <Link
            href={"/upcoming-conference"}
            className="d-flex align-items-center mb-0 text-decoration-none h5 fw-bold"
          >
            View More &nbsp; <i className={"pi-arrow-right pi"}></i>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default UpcomingConference;
