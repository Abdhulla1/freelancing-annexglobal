'use client';
import React, { useState,useEffect } from "react";
import { Paginator } from "primereact/paginator";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DiscoverySessionsStyles from "./DiscoverySessions.module.css";
import "./PaginatorStyles.css" // Import the new CSS file.
import ResearchCarouusel from "../ResearchCarousel/ResearchCarouusel";
import { getAllSessions } from "@/service/conferenceData";
import Link from "next/link";

const DiscoverySessions = ({ conference }) => {
  const sessionsPerPage = 18;
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(sessionsPerPage);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getAllSessions(); // Fetch sessions
        setSessions(data); // Update state
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);


  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div>

        <ResearchCarouusel conferenceId={conference._id}/>
<div className={DiscoverySessionsStyles["container"]}>
      <div className="container py-5">
        <h3 className="text-black">
          Essential Innovations and Techniques in Modern Surgical Procedures
        </h3>
        <div className="row mt-2">
          {sessions.slice(first, first + rows).map((sess, i) => (
            <div className="col-md-6 col-lg-4 mt-4 d-flex" key={i}>
              <div className={DiscoverySessionsStyles["card"]}>
                <span className={`text-truncate col-9  ${DiscoverySessionsStyles["text"]}`}>{sess.title}</span>
                <Link className={DiscoverySessionsStyles["icon"]} href={`/conference/${conference._id}/topics/${sess.id}`} >
                  <i className="pi-reply pi"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={`mt-4 d-flex justify-content-center `}>
          <Paginator
            first={first}
            rows={rows}
             template="PrevPageLink PageLinks NextPageLink"
            totalRecords={sessions.length}
            rowsPerPageOptions={[6, 12, 18]}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
     
    
    </div>
    
  );
};

export default DiscoverySessions;
