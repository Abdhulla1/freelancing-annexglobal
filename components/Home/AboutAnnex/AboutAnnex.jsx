"use client";

import React from "react";
import AboutAnnexStyles from "./AboutAnnex.module.css";

const AboutAnnex = ({ data }) => {
  const htmlWithClass = data?.detail?.welcomeContent?.content.replace(
    /<p>/g,
    `<p class="${AboutAnnexStyles["about-content"]}">`
  );

  return (
    <div className="p-3 p-md-5">
      <h2 className="text-center fw-bold">
        {data?.detail?.welcomeContent?.heading}
      </h2>
      <p
        className={`text-center mt-4 ${AboutAnnexStyles["about-headline"]} h4`}
      >
        {data?.detail?.welcomeContent?.title ||
          "Welcome to Annex Global Conferences"}
      </p>
      <div
        className="mt-4 container-md ql-editor w-md-75 fs-5 fs-md-6  "
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "normal",
          lineHeight:1.6,
        }}
        dangerouslySetInnerHTML={{ __html: htmlWithClass || "" }}
      />
    </div>
  );
};

export default AboutAnnex;
