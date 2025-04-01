import React from "react";
import ConferenceDetailsStyles from "./ConferenceDetails.module.css";
import PerspectiveScroll from "../PerspeciveScroll/PerspectiveScroll";
const ConferenceDetails = () => {
  return (
    <div className={ConferenceDetailsStyles["container"]}>
      <div className="container my-5 mb-6">
        <div className={ConferenceDetailsStyles["heading"]}>
          <h3 className="text-uppercase text-white text-center">
            Conference Gallery
          </h3>
          <p className="text-white ">
            Annual Congress On Gynecology, Obstetrics, And Women’s Health
          </p>
        </div>

       
      </div>
      <PerspectiveScroll/>
    </div>
  );
};

export default ConferenceDetails;
