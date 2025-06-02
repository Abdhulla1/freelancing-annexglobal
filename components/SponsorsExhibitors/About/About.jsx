import React from "react";
import AboutAnnexStyles from "./About.module.css";

const About= ({title,content}) => {
  return (
    <div className={`p-3 p-md-5  ${AboutAnnexStyles["content"]}`}>
      <h3 className="text-center fw-bold">{title}</h3>

      <div className="mt-4 container-md">
      <div 
        dangerouslySetInnerHTML={{ __html: content }}
        className={`text-capitalize ${AboutAnnexStyles["about-content"]}`}
      />
        {/* <p className={`text-capitalize ${AboutAnnexStyles["about-content"]}`}>
      {content}
        </p> */}
      </div>
    </div>
  );
};

export default About;
