"use client";
import React, { useState } from "react";
import QueriesAnsweredStyles from "./QueriesAnswered.module.css";
import { Accordion, AccordionTab } from "primereact/accordion";

const QueriesAnswered = ({ conference }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const headerGen = (data, index) => {
    const isActive = activeIndex === index;
    return (
      <div className="d-flex align-items-center justify-content-between">
        <div className="ms-3 text-start col-10">
          <h5 className={QueriesAnsweredStyles["title"]}>{data.question}</h5>
        </div>
        <div>
          <button className={`btn ${QueriesAnsweredStyles["accordion-button"]} h-100`}>
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
              {conference.map((item, index) => (
                <AccordionTab key={item.qusId} header={headerGen(item, index)}>
                  <div className="ql-editor" dangerouslySetInnerHTML={{ __html: item.answer }} />
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
