
'use client'
import React,{useState} from "react";
import UpcomingConferenceStyle from "./UpcomingConference.module.css";
import { useConferenceLandingPage } from "@/hooks/useWeather";
import Link from "next/link";

const UpcomingConference = () => {
  const { data: conferenceData } = useConferenceLandingPage("upcoming");
  const { data: pastConferenceData } = useConferenceLandingPage("past");
  

   const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleShowMore = (sectionIndex) => {
    setExpandedIndexes((prev) =>
      prev.includes(sectionIndex)
        ? prev.filter((i) => i !== sectionIndex)
        : [...prev, sectionIndex]
    );
  };


const upcomingConferences = [
  {
    monthAndYear: "May-2025",
    location: "Dubai",
    conferences: conferenceData?.detail?.map((conf) => ({
      date: conf?.conference?.landingPage?.startDate,
      image: conf?.cardBgImage,
      title: conf?.name,
      location: conf?.conference?.landingPage?.location,
      id: conf?.name,
      icon: conf?.logoUrl,
    })),
  },
];




  return (
<div className="container-fluid">
      {upcomingConferences?.map((event, index) => {
        const isExpanded = expandedIndexes.includes(index);
        const conferencesToShow = isExpanded
          ? event.conferences
          : event.conferences;



        return (
          <div key={index} className={`p-4 ${UpcomingConferenceStyle.container}`}>
            <h3 className="text-uppercase text-center mt-5">
              {`${event.monthAndYear} conferences | ${event.location}`}
            </h3>
            <div className="mt-4">
              <div className="container">
                <div className="row">
                  {conferencesToShow?.map((conference, i) => (
                    <Link
                      href={`/conference/${conference.id}`}
                      className="text-decoration-none col-md-6 col-lg-4 mb-3"
                      key={i}
                    >
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
                        <div className={UpcomingConferenceStyle["buy-button"]}>
                          BUY TICKETS
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {event?.conferences?.length > 6 && (
                  <div className="text-center mt-3">
                    <button
                      className="brand-btn"
                      onClick={() => toggleShowMore(index)}
                    >
                      {isExpanded ? "Show Less" : "Load More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpcomingConference;
