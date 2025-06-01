'use client';
import React, { useState } from "react";
import { Paginator } from "primereact/paginator";
import Link from "next/link";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DiscoverySessionsStyles from "./ResearchCarouusel.module.css";
import "./PaginatorStyles.css"; // Import the new CSS file.
import { getAllSessions } from "@/service/conferenceData";
const ResearchCarouusel = ({conference}) => {
  console.log("Conference ID: from ResearchCarousel", conference);
  const sessionsPerPage = 8;
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(sessionsPerPage);

  const Sessions = getAllSessions();

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className={`h-auto container  ${DiscoverySessionsStyles["container"]} d-flex flex-column flex-md-row`}>
      <div className="mt-4 col-12 col-md-3 d-flex flex-column align-items-center justify-content-center p-4">
        <div className="pe-md-5 mb-4">
          <h2 className={`text-center mb-0 fs-1 ${DiscoverySessionsStyles["research"]}`}>Research</h2>
          <p className="text-center text-md-end fs-5">Groundbreaking</p>
        </div>
        <Paginator
          first={first}
          rows={rows}
          template="PrevPageLink NextPageLink"
          totalRecords={Sessions.length}
          rowsPerPageOptions={[6, 12, 18]}
          onPageChange={onPageChange}
        />
      </div>
      <div className={`col-12 col-md-9 ms-md-5 p-4 ${DiscoverySessionsStyles["topics"]}`}>
        <div className="row d-flex  align-items-center justify-content-center">
          {Sessions.slice(first, first + rows).map((sess, i) => (
            <div className="col-12 col-md-6 col-lg-5 mt-4 d-flex" key={i}>
              <div className={DiscoverySessionsStyles["card"]}>
                <span className={`text-truncate col-9 ${DiscoverySessionsStyles["text"]}`}>{sess.title}</span>
                <Link className={DiscoverySessionsStyles["icon"]} href={`/conference/${conference.name}/topics/${sess.id}`} >
                  <i className="pi-reply pi"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchCarouusel;