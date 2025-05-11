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
  const Sessions = getAllSessions();
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
        header={<h5 className="text-black p-3 ">{selectedTopic.title}</h5>}
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
                src="/images/conferences/pregnant-lady.webp"
                alt="Abortion and Miscarriage"
                className="img-fluid rounded float-start me-4"
                style={{ maxWidth: "250px", height: "auto" }}
              />

              {/* Text Section */}

              <p className="text-muted">
                Abortion means ending a pregnancy on purpose, either with
                prescription drugs or surgery. This can happen for reasons like
                the mom's health, problems with the baby, or personal choice.
                Miscarriage is when a pregnancy ends by itself before the 20th
                week, often because of genetic or health issues in the mom.
              </p>
              <p className="text-muted">
                These discussions cover health facts, being fair, and
                understanding emotions, aiming to support women's well-being and
                help them make informed choices during these experiences.
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
          </>
        )}
      </Sidebar>
      <div className="container py-5">
        <h3 className="text-white">Innovation & Discovery Sessions</h3>
        <div className="row mt-5">
          {Sessions.slice(first, first + rows).map((sess, i) => (
            <div className="col-md-6 col-lg-4 mt-4 d-flex " key={i}>
              <div className={DiscoverySessionsStyles["card"]}>
                <span
                  className={`text-truncate col-9 ${DiscoverySessionsStyles["text"]}`}
                >
                  {sess.title}
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
