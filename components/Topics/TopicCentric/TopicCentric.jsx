"use client";
import React, { useState,useEffect } from "react";
import DiscoverySessionsStyles from "./TopicCentric.module.css";
import { getAllSessions,getSelectedSessions } from "@/service/conferenceData";
const TopicCentric = ({ topic, topics }) => {
  console.log("Topic Data:", topics);
  const [selectedTopic, setSelectedTopic] = useState(topic);
  // const selectedTopic = topic;
  
  return (
    <div
      className={`container  ${DiscoverySessionsStyles["container"]} d-flex flex-column flex-md-row`}
    >
      <div
        className={`col-md-5 rounded p-5 ${DiscoverySessionsStyles["topics"]}`}
      >
        <div
          className={`row d-flex align-items-center justify-content-center ${DiscoverySessionsStyles["topics-wraper"]}`}
        >
          {topics.map((sess, i) => (
            <div className="col-12  mt-4 d-flex" key={i}>
              <div className={DiscoverySessionsStyles["card"]}>
                <span className={`text-truncate col-9 ${DiscoverySessionsStyles["text"]}`}>
                  {sess.topic}
                </span>
                <div className={DiscoverySessionsStyles["icon"]} onClick={()=>setSelectedTopic(sess)}>
                  <i className="pi-reply pi"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`col-md-6 rounded p-3`}>
        <h4 className="fw-bolder mb-5">{selectedTopic?.topic}</h4>
        {/* Image Section */}
        <img
          src={selectedTopic?.imageUrl}
          alt="Abortion and Miscarriage"
          className="img-fluid rounded float-start me-4"
          style={{ maxWidth: "250px", height: "auto" }}
        />

          <div 
            className={`mb-4 ${DiscoverySessionsStyles["description"]}`}
            dangerouslySetInnerHTML={{ __html: selectedTopic?.content }}
          />
      </div>
    </div>
  );
};

export default TopicCentric;
