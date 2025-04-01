import React from "react";
import AboutAnnexStyles from "./About.module.css";

const About= ({title,content}) => {
  return (
    <div className={`p-3 p-md-5  ${AboutAnnexStyles["content"]}`}>
      <h3 className="text-center fw-bold">{title}</h3>

      <div className="mt-4 container-md">
        <p className={AboutAnnexStyles["about-content"]}>
      {content}
        </p>
      </div>
    </div>
  );
};

export default About;
