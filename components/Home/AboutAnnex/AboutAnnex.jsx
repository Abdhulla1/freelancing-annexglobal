"use client";

import React from "react";
import AboutAnnexStyles from "./AboutAnnex.module.css";
import { useMainPage } from "@/hooks/useWeather";

const AboutAnnex = () => {
  const { mutate, data, isPending, isError } = useMainPage();
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
  className="mt-4 container-md"
  style={{ width: "70%", wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }}
  dangerouslySetInnerHTML={{ __html: htmlWithClass || "" }}
/>

    </div>
  );
};

export default AboutAnnex;
