"use client"
import React, { useState } from "react";
import SupportingJournalsStyles from "./SupportingJournals.module.css";
import { Accordion, AccordionTab } from "primereact/accordion";

const SupportingJournals = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const accordionData = [
    {
      id: "01",
      title: "Athenaeum Scientific Publishers",
      description:
        "Scientific Independent Open Access Publisher Which Aims To Publish Innovative...",
    },
    {
      id: "02",
      title: "Medical And Research Publications",
      description:
        "Scientific Independent Open Access Publisher Which Aims To Publish Innovative...",
    },
    {
      id: "03",
      title: "Athenaeum Scientific Publishers",
      description:
        "Scientific Independent Open Access Publisher Which Aims To Publish Innovative...",
    },
  ];

  const headerGen = (data, index) => {
    const isActive = activeIndex === index; // Check if this tab is open
    return (
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h4 className="text-muted">{data.id}</h4>
        </div>
        <div className="ms-3">
          <h4>{data.title}</h4>
          <p className={`text-muted ${SupportingJournalsStyles['lineheight']} `}>{data.description}</p>
        </div>
        <div >
          <button className={`btn ${SupportingJournalsStyles['accordion-button']} h-100`}>
            <i className={`pi ${isActive ? "pi-arrow-down" : "pi-arrow-up"} h4 mt-2`}></i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-5 ${SupportingJournalsStyles["container"]}`}>
      <h3 className="text-center">Supporting Journals</h3>
      <div className="mt-5">
        <div className="container supporting-journal-container">
          <div className={SupportingJournalsStyles["max-width-container"]}>
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

export default SupportingJournals;
