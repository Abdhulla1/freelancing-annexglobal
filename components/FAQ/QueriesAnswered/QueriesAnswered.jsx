'use client';
import React, { useState } from "react";
import QueriesAnsweredStyles from "./QueriesAnswered.module.css";
import { Accordion, AccordionTab } from "primereact/accordion";
import Link from "next/link";
const QueriesAnswered = ({ faqData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const headerGen = (data, index) => {
    const isActive = activeIndex === index;
    return (
      <div className="d-flex align-items-center justify-content-between">
        <div className="ms-3">
          <h5 className={`${QueriesAnsweredStyles['title']} `}>{data.title}</h5>
        </div>
        <div>
          <button className={`btn ${QueriesAnsweredStyles["accordion-button"]} h-100`}>
            <i className={`pi ${isActive ? "pi-minus" : "pi-plus"} h5 mt-2`}></i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-5`}>
      <div className="mt-1">
        <div className="container supporting-journal-container">
          <div className={QueriesAnsweredStyles["max-width-container"]}>
            <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
              {faqData.map((data, i) => (
                <AccordionTab key={i} header={headerGen(data, i)}>
                <p>
            {data.question === "Anything else?" ? (
              <>
                If you have any other queries or require further information, please feel free to{" "}
                <Link
                  href="/contact-us"
                 
                >
                  contact us
                </Link>
                . We’re here to help!
              </>
            ) : (
              <div 
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            )}
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
