"use client";
import React, { useState, useEffect } from "react";
import Style from "./PastConference.module.css";
import {
  useConferenceLandingPage
} from "@/hooks/useWeather";
import { api } from "@/service/api";

import Link from "next/link";

const PastConference = () => {
  const { data: conferenceData } = useConferenceLandingPage("past");
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [resolvedIds, setResolvedIds] = useState({});

  const toggleShowMore = (sectionIndex) => {
    setExpandedIndexes((prev) =>
      prev.includes(sectionIndex)
        ? prev.filter((i) => i !== sectionIndex)
        : [...prev, sectionIndex]
    );
  };
  useEffect(() => {
    const fetchPresentIds = async () => {
      if (!conferenceData?.detail) return;

      const promises = conferenceData.detail.map(async (conf) => {
        const name = conf?.name;
        try {
          const res = await api.get("/present/conference", {
            params: { name },
          });
          const presentId = res?.data?.detail?._id;
          return { name, id: presentId };
        } catch {
          return { name, id: null };
        }
      });

      const results = await Promise.all(promises);
      const idMap = {};
      results.forEach(({ name, id }) => {
        if (name && id) idMap[name] = id;
      });
      setResolvedIds(idMap);
    };

    fetchPresentIds();
  }, [conferenceData]);

  const upcomingConferences = [
    {
      monthAndYear: "May-2025",
      location: "Dubai",
      conferences: conferenceData?.detail?.map((conf) => ({
        date: conf?.conference?.landingPage?.startDate,
        image: conf?.cardBgImage,
        title: conf?.name,
        location: conf?.conference?.landingPage?.location,
        id: conf?._id,
        icon: conf?.logoUrl,
      })),
    },
  ];
  const getConferenceID = (conference) => {
  const resolvedId = resolvedIds[conference.title];
  return resolvedId || conference.id;
};



  return (
    <div className="container-fluid">
      {upcomingConferences?.map((event, index) => {
        const isExpanded = expandedIndexes.includes(index);
        const conferencesToShow = isExpanded
          ? event?.conferences
          : event?.conferences?.slice(0, 6);

        return (
          
          <div key={index} className={`p-4 ${Style.container}`}>
            <h3 className="text-uppercase text-center mt-5">
              {/* {`${event.monthAndYear} conferences | ${event.location}`} */}
              {`Past Conferences`}
            </h3>
            <div className="mt-4">
              <div className="container">
                <div className="row">
                  {conferencesToShow?.map((conference, i) => (
                    <Link
                       href={getConferenceID(conference) ? `/conference/${getConferenceID(conference)}` : "#"}
                      className="text-decoration-none col-md-6 col-lg-4 mb-3"
                      key={i}
                    >
                      <div className={Style["upcoming-events-card"]}>
                        <span className={Style["date"]}>{conference.date}</span>
                        <img
                          src={conference.image}
                          alt="Event"
                          className="img-fluid"
                        />
                        <div className={Style["content"]}>
                          <div className={Style["event-title"]}>
                            {conference.title}
                          </div>
                          <div className={Style["location"]}>
                            {conference.location}
                          </div>
                        </div>
                        {/* <div className={Style["buy-button"]}>
                          BUY TICKETS
                        </div> */}
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

export default PastConference;
