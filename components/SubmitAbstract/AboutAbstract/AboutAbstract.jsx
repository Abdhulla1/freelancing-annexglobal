import React from "react";
import AboutAnnexStyles from "./AboutAbstract.module.css";

const AboutAbstract = () => {
  return (
    <div className="p-3 p-md-5">
      <h3 className="text-center fw-bold">About Abstract Process</h3>

      <div className="mt-4 container-md">
        <p className={AboutAnnexStyles["about-content"]}>
          Upon submission of your abstract, our scientific committee will
          undertake a thorough review process. Rest assured, we prioritize
          efficiency and aim to communicate the acceptance status within 24
          hours. Following acceptance, we kindly request your confirmation of
          attendance by completing the speaker registration. Upon successful
          registration, your distinguished profile banner will grace our
          conference website, highlighting your esteemed presence and expertise.
          We eagerly anticipate your participation and invaluable contributions
          to our upcoming event.
        </p>
      </div>
    </div>
  );
};

export default AboutAbstract;
