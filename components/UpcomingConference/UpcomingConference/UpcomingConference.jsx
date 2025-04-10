
import React from "react";
import UpcomingConferenceStyle from "./UpcomingConference.module.css";

import Link from "next/link";

const UpcomingConference = () => {
  const upcomingConferences = [
    {
      monthAndYear: "May 2025",
      location: "Dubai, UAE",
      conferences: [
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
          image:
            "/images/home/upcoming-conference/eventsPediatricsNeonatology.png",
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
          icon: "/icons/conference/ghc.png",
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
          image:
            "/images/home/upcoming-conference/eventsPediatricsNeonatology.png",
          title: "International webinar on oncology & cancer research",
          location: "Paris, France",
          id: "oncology",
          icon: "/icons/conference/oncology.png",
        },
        {
          date: "23 Aug 2026",
          image: "/images/home/upcoming-conference/Osteoarthtris.png",
          title:
            "International Webinar on Gynaecology, Obstetrics and Women’s Healthcare",
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
          image:
            "/images/home/upcoming-conference/eventsPediatricsNeonatology.png",
          title: "International webinar on oncology & cancer research",
          location: "Paris, France",
          id: "oncology",
          icon: "/icons/conference/oncology.png",
        },
      ],
    },
    {
      monthAndYear: "November 2025",
      location: "Dubai, UAE",
      conferences: [
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
          image:
            "/images/home/upcoming-conference/eventsPediatricsNeonatology.png",
          title: "Primary Healthcare, Pain Management & Functional Structure",
          location: "New York, USA",
          id: "primary-healthcare",
          icon: "/icons/conference/primaryHealthcare.png",
        },
      ],
    },
    {
      monthAndYear: "November 2025",
      location: "Paris, France",
      conferences: [
        {
          date: "18 Jul 2026",
          image:
            "/images/home/upcoming-conference/eventsPediatricsNeonatology.png",
          title: "International webinar on oncology & cancer research",
          location: "Paris, France",
          id: "oncology",
          icon: "/icons/conference/oncology.png",
        },
        {
          date: "23 Aug 2026",
          image: "/images/home/upcoming-conference/Osteoarthtris.png",
          title:
            "International Webinar on Gynaecology, Obstetrics and Women’s Healthcare",
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
          image:
            "/images/home/upcoming-conference/eventsPediatricsNeonatology.png",
          title: "International webinar on oncology & cancer research",
          location: "Paris, France",
          id: "oncology",
          icon: "/icons/conference/oncology.png",
        },
      ],
    },
  ];

  return (
    <div className="container-fluid">
      {upcomingConferences.map((event, index) => (
        <div key={index} className={`p-4 ${UpcomingConferenceStyle.container}`}>
          <h3 className="text-uppercase text-center mt-5">
            {`${event.monthAndYear} conferences | ${event.location}`}
          </h3>
          <div className="mt-4">
            <div className="container">
              <div className="row">
                {event.conferences.map((conference, i) => (
                  <div className="col-md-6 col-lg-4 mb-3" key={i}>
                    <div className={UpcomingConferenceStyle["upcoming-events-card"]}>
                      <span className={UpcomingConferenceStyle["date"]}>
                        {conference.date}
                      </span>
                      <img src={conference.image} alt="Event" className="img-fluid" />
                      <div className={UpcomingConferenceStyle["content"]}>
                        <div className={UpcomingConferenceStyle["event-title"]}>
                          {conference.title}
                        </div>
                        <div className={UpcomingConferenceStyle["location"]}>
                          {conference.location}
                        </div>
                      </div>
                      <Link
                        href={`/conference/${conference.id}`}
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
        </div>
      ))}
    </div>
  );
};

export default UpcomingConference;
