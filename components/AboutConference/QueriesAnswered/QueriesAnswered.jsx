"use client"
import React, { useState } from "react";
import QueriesAnsweredStyles from "./QueriesAnswered.module.css";
import { Accordion, AccordionTab } from "primereact/accordion";

const QueriesAnswered = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const accordionData = [
    "What Are The Benefits Of Attending Our Conference?",
    "What Are The Advantages For Speaker Participations?",
    "What Are The Advantages For Delegate Participations?",
    "Target Audience For Gynecology Conference:"
  ];

  const headerGen = (data, index) => {
    const isActive = activeIndex === index; // Check if this tab is open
    return (
      <div className="d-flex align-items-center justify-content-around">
       
        <div className="ms-3 text-start col-8 ">
          <h5 className={`${QueriesAnsweredStyles['title']} `}>{data}</h5>
        </div>
        <div >
          <button className={`btn ${QueriesAnsweredStyles['accordion-button']} h-100`}>
            <i className={`pi ${isActive ? "pi-minus" : "pi-plus"} h4 mt-2`}></i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-5 ${QueriesAnsweredStyles["container"]}`}>
      <h3 className="text-center">Queries Answered</h3>
      <div className="mt-5">
        <div className="container supporting-journal-container">
          <div className={QueriesAnsweredStyles["max-width-container"]}>
            <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
              {accordionData.map((data, i) => (
                <AccordionTab key={i} header={headerGen(data, i)}>
                  <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </AccordionTab>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueriesAnswered;
