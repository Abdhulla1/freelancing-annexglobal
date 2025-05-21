"use client";
import React, { useState,useEffect } from "react";
import DiscoverySessionsStyles from "./TopicCentric.module.css";
import { getAllSessions,getSelectedSessions } from "@/service/conferenceData";
const TopicCentric = ({topicId,conferenceId}) => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const Sessions = getAllSessions();

  useEffect(() => {
    if (topicId) {
      const topic = getSelectedSessions(topicId);
      setSelectedTopic(topic);
    }
  }, [topicId]);
  
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
          {Sessions.map((sess, i) => (
            <div className="col-12  mt-4 d-flex" key={i}>
              <div className={DiscoverySessionsStyles["card"]}>
                <span className={`text-truncate col-9 ${DiscoverySessionsStyles["text"]}`}>
                  {sess.title}
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
        <h4 className="fw-bolder mb-5">{selectedTopic.title}</h4>
        {/* Image Section */}
        <img
          src="/images/conferences/pregnant-lady.webp"
          alt="Abortion and Miscarriage"
          className="img-fluid rounded float-start me-4"
          style={{ maxWidth: "250px", height: "auto" }}
        />

        {/* Text Section */}

        <p className="text-muted">
          Abortion means ending a pregnancy on purpose, either with prescription
          drugs or surgery. This can happen for reasons like the mom's health,
          problems with the baby, or personal choice. Miscarriage is when a
          pregnancy ends by itself before the 20th week, often because of
          genetic or health issues in the mom.
        </p>
        <p className="text-muted">
          These discussions cover health facts, being fair, and understanding
          emotions, aiming to support women's well-being and help them make
          informed choices during these experiences.
        </p>

        {/* List Section */}
        <ul className="mt-3 ps-3">
          <li>Vaginal Bleeding</li>
          <li>Pregnancy Bleeding</li>
          <li>Dilation And Curettage (D&C)</li>
          <li>Ectopic Pregnancy</li>
          <li>Threatened Miscarriage</li>
          <li>Abortion Pill</li>
          <li>Late-Term Abortion</li>
          <li>Traumatic Loss</li>
        </ul>
      </div>
    </div>
  );
};

export default TopicCentric;
