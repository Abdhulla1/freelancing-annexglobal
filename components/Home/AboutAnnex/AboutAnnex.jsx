import React from "react";
import AboutAnnexStyles from './AboutAnnex.module.css';

const AboutAnnex = () => {
  return (
    <div className="p-3 p-md-5">
      <h2 className="text-center fw-bold">About Annex World</h2>
      <p className={`text-center mt-4 ${AboutAnnexStyles["about-headline"]} h4`}>
        “Synergies Unleashed: Uniting Worldwide Frontiers In Science, Business,
        And Technology Symposia”
      </p>
      <div className="mt-4 container-md">
        <p className={AboutAnnexStyles["about-content"]}>
          Annex Global Conferences Is A Beacon Of Excellence, Hosting Various
          Conferences Across Multiple Domains Such As Medicine, Pharma, Health
          Science, Life Science, Engineering, And Technology. With An Unwavering
          Commitment To Precision And Diligence, We Meticulously Craft Each
          Event, Ensuring The Provision Of Unparalleled Facilities And
          Infrastructure To Facilitate Seamless Knowledge Transmission Among
          Attendees. This Exchange Of Expertise Serves A Dual Purpose, Fostering
          Collaborative Problem-Solving To Address Contemporary Scientific
          Challenges And Enhance The Quality.
        </p>
        <p className={AboutAnnexStyles["about-content"]}>
          Our Ethos Revolves Around The Pursuit Of Greatness, Offering
          Professionals A Platform To Delve Into Scientific Research And Pioneer
          Potential Breakthroughs. We Attract A Prestigious Lineup Of Speakers,
          Including Eminent Scholars, Innovators, Industry Leaders, And Esteemed
          Professionals From Various Disciplines, Fostering An
        </p>
        <p className={AboutAnnexStyles["about-content"]}>
          Our Ethos Revolves Around The Pursuit Of Greatness, Offering
          Professionals A Platform To Delve Into Scientific Research And Pioneer
          Potential Breakthroughs. We Attract A Prestigious Lineup Of Speakers,
          Including Eminent Scholars, Innovators, Industry Leaders, And Esteemed
          Professionals From Various Disciplines, Fostering An
        </p>
      </div>
    </div>
  );
};

export default AboutAnnex;
