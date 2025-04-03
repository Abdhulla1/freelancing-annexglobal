
'use client';
import React, { useState } from "react";
import { Paginator } from "primereact/paginator";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DiscoverySessionsStyles from "./DiscoverySessions.module.css";
import "./PaginatorStyles.css" // Import the new CSS file.
const DiscoverySessions = () => {
  const sessionsPerPage = 18;
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(sessionsPerPage);

  const Sessions = [
    { title: "Point Of View: Upcoming Trends And" },
    { title: "Diabetes Management: Pharmacology" },
    { title: "Innovations In Diabetes Diagnosis" },
    { title: "Diabetes Management And Treatment" },
    { title: "Infectious Diseases And Preventive" },
    { title: "Advance In Clinical Medicine" },
    { title: "Mental Health And Psychological " },
    { title: "Global Health And Internal Medicine" },
    { title: "Public Health And Nutrition" },
    { title: "Point Of View: Upcoming Trends And" },
    { title: "Diabetes Management: Pharmacology" },
    { title: "Innovations In Diabetes Diagnosis" },
    { title: "Diabetes Management And Treatment" },
    { title: "Infectious Diseases And Preventive" },
    { title: "Advance In Clinical Medicine" },
    { title: "Mental Health And Psychological " },
    { title: "Global Health And Internal Medicine" },
    { title: "Public Health And Nutrition" },
    { title: "Advance In Clinical Medicine" },
    { title: "Mental Health And Psychological " },
    { title: "Global Health And Internal Medicine" },
    { title: "Public Health And Nutrition" },
    { title: "Point Of View: Upcoming Trends And" },
    { title: "Diabetes Management: Pharmacology" },
    { title: "Innovations In Diabetes Diagnosis" },
    { title: "Diabetes Management And Treatment" },
    { title: "Infectious Diseases And Preventive" },
    { title: "Advance In Clinical Medicine" },
    { title: "Mental Health And Psychological " },
    { title: "Global Health And Internal Medicine" },
    { title: "Public Health And Nutrition" },
  ];

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className={DiscoverySessionsStyles["container"]}>
      <div className="container py-5">
        <h3 className="text-black">
          Essential Innovations and Techniques in Modern Surgical Procedures
        </h3>
        <div className="row mt-2">
          {Sessions.slice(first, first + rows).map((sess, i) => (
            <div className="col-md-6 col-lg-4 mt-4 d-flex" key={i}>
              <div className={DiscoverySessionsStyles["card"]}>
                <span className={DiscoverySessionsStyles["text"]}>{sess.title}</span>
                <div className={DiscoverySessionsStyles["icon"]}>
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
            rowsPerPageOptions={[6, 12, 18]}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoverySessions;
