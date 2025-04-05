'use client';
import React, { useState } from "react";
import { Paginator } from "primereact/paginator";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DiscoverySessionsStyles from "./DiscoverySessions.module.css";
import "./PaginatorStyles.css" // Import the new CSS file.
import { getAllSessions } from "@/service/conferenceData";
import Link from "next/link";


const DiscoverySessions = ({ conference }) => {
  const sessionsPerPage = 9;
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(sessionsPerPage);
  const Sessions = getAllSessions();

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className={DiscoverySessionsStyles["container"]}>
      <div className="container py-5">
        <h3 className="text-white">Innovation & Discovery Sessions</h3>
        <div className="row mt-5">
          {Sessions.slice(first, first + rows).map((sess, i)=> (
            <div className="col-md-6 col-lg-4 mt-4 d-flex " key={i}>
              <div className={DiscoverySessionsStyles["card"]}>
                <span className={`text-truncate col-9 ${DiscoverySessionsStyles["text"]}`}>
                  {sess.title}
                </span>
                <Link className={DiscoverySessionsStyles["icon"]} href={`/conference/${conference}/topics/${sess.id}`} >
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
                    totalRecords={Sessions.length}
                   
                    onPageChange={onPageChange}
                  />
                </div>
      </div>
    </div>
  );
};

export default DiscoverySessions;
