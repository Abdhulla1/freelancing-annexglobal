
import React from "react";
import ConferenceDetailsStyles from "./VenueLocation.module.css";
import Image from "next/image";

const VenueLocation = ({ conference }) => {

  return (
    <div className={`container ${ConferenceDetailsStyles.container}`}>
      <div className="row g-0 h-100 overflow-x-hidden">
        {/* Left Section with Text & Navigatio
        n */}
        <div
          className={`col-md-12 col-lg-4 col-xl-5 ml-6 mx-auto order-2 order-lg-1  d-flex justify-content-center align-items-center  `}
        >
          <div className={`p-4 w-100 text-center `}>
            <h5 className="mb-3 text-black">Explorer’s Route</h5>
            <Image
              src="/images/conferences/map.png"
              alt="Venue Location"
              width={400}
              height={300}
              className={`img-fluid `}/>
          </div>
        </div>

        {/* Right Section with Images */}
        <div
          className={`col-md-12 col-lg-8 col-xl-7 d-flex order-1 order-lg-2  align-items-center mt-lg-0 ${ConferenceDetailsStyles.rightPanel}`}
        >
          <div className={`h-100 p-5 w-md-75 ${ConferenceDetailsStyles.rightPanelContent}`}>
            <h3 className="mb-1 text-uppercase">Venue</h3>
            <p>Event Date <span className="ms-3">March 10-11, 2025</span></p>
            <p>Event Time <span className="ms-3">09:00 AM - 06:00 PM</span> </p>
            <div className="lh-sm d-flex  align-items-center">Hotel Address <div  className="lh-sm ms-3 d-inline-flex w-75  text-wrap">City Seasons hotel, Deira 2 27th st-port saeed - Dubai - UAE </div> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueLocation;
