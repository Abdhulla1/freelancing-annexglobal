"use client";
import React, { useState } from "react";
import SupportingJournalsStyles from "./RegistrationInfo.module.css";
import { Accordion, AccordionTab } from "primereact/accordion";

const RegistrationInfo = ({ conference }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const accordionData = conference?.registration?.registrationInfo;

  const headerGen = (data, index) => {
    const isActive = activeIndex === index; // Check if this tab is open
    return (
      <div className="d-flex align-items-center justify-content-around">
        <div>
          <h4 className="text-muted">{data.id}</h4>
        </div>
        <div className="ms-3 text-start col-7">
          <h4 className={SupportingJournalsStyles["title"]}>{data.title}</h4>
          {/* <div
            className={`text-muted text-capitalize ql-editor text-truncate ${SupportingJournalsStyles["lineheight"]}`}
            dangerouslySetInnerHTML={{ __html: data.content }}
          /> */}
        </div>

        <div>
          <button
            className={`btn ${SupportingJournalsStyles["accordion-button"]} h-100`}
          >
            <i
              className={`pi ${
                isActive ? "pi-arrow-up" : "pi-arrow-down"
              } h4 mt-2`}
            ></i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-5 ${SupportingJournalsStyles["container"]}`}>
      <h3 className="text-center fw-bold">Registration Info</h3>
      <div className="mt-5">
        <div className="container supporting-journal-container">
          <div className={SupportingJournalsStyles["max-width-container"]}>
            <Accordion
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
            >
              {accordionData.map((data, i) => (
                <AccordionTab key={i} header={headerGen(data, i)}>
                  <div
                    className={`text-muted ql-editor text-capitalize ${SupportingJournalsStyles["lineheight"]} `}
                    dangerouslySetInnerHTML={{ __html: data.content }}
                  />
                </AccordionTab>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationInfo;
