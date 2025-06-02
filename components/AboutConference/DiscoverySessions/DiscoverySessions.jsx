"use client";
import React, { useState } from "react";
import { Paginator } from "primereact/paginator";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DiscoverySessionsStyles from "./DiscoverySessions.module.css";
import "./PaginatorStyles.css"; // Import the new CSS file.
import { getAllSessions } from "@/service/conferenceData";
import Link from "next/link";
import { Sidebar } from "primereact/sidebar";

const DiscoverySessions = ({ conference }) => {
  const sessionsPerPage = 9;
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(sessionsPerPage);
  const Sessions = conference;
  console.log("Sessions", Sessions);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [visibleDetails, setVisibleDetails] = useState(false);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const handleTopicClick = (speaker) => {
    setSelectedTopic(speaker);
    setVisibleDetails(true);
  };


  return (
    <div className={DiscoverySessionsStyles["container"]}>
      <Sidebar
        visible={visibleDetails}
        position="right"
        header={
          selectedTopic && (
            <h5 className="text-black p-3 ">{selectedTopic.title}</h5>
          )
        }
        onHide={() => setVisibleDetails(false)}
        style={{
          width: "32rem",
          borderTopLeftRadius: "40px",
          borderBottomLeftRadius: "40px",
        }}
      >
        {selectedTopic && (
          <>
            <div className={`rounded p-3`}>
              {/* <h4 className="fw-bolder mb-5">{selectedTopic.title}</h4> */}
              {/* Image Section */}
              <img
                src={selectedTopic.imageUrl || "images/placeholder.png"}
                alt="Abortion and Miscarriage"
                className="img-fluid rounded float-start me-4"
                style={{ maxWidth: "250px", height: "auto" }}
              />

              {/* Text Section */}

              <div
                className="text-muted"
                style={{
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  hyphens: "auto",
                  whiteSpace: "normal",
                }}
                dangerouslySetInnerHTML={{ __html: selectedTopic.content }}
              />
            </div>
          </>
        )}
      </Sidebar>
      <div className="container py-5">
        <h3 className="text-white">Innovation & Discovery Sessions</h3>
        <div className="row mt-5">
          {Sessions?.slice(first, first + rows).map((sess, i) => (
            <div className="col-md-6 col-lg-4 mt-4 d-flex " key={i}>
              <div className={DiscoverySessionsStyles["card"]}>
                <span
                  className={`text-truncate col-9 ${DiscoverySessionsStyles["text"]}`}
                >
                  {sess.topic}
                </span>
                <div
                  className={DiscoverySessionsStyles["icon"]}
                  onClick={() => handleTopicClick(sess)}
                >
                  <i className="pi-reply pi"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`mt-4 d-flex justify-content-center `}>
          <Paginator
            first={first}
            rows={rows}
            template="PrevPageLink PageLinks NextPageLink"
            totalRecords={Sessions.length}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoverySessions;
