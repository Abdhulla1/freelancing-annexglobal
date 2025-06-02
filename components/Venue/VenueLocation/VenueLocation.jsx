import React from "react";
import ConferenceDetailsStyles from "./VenueLocation.module.css";

const VenueLocation = ({ conference, map }) => {
  console.log("VenueLocation Component Rendered", map);
  console.log("Conference ID from VenueLocation:", conference);

  return (
    <div className={`container ${ConferenceDetailsStyles.container}`}>
      <div className="row g-0 h-100 overflow-x-hidden">
        {/* Left Section with Embedded Map */}
        <div
          className={`col-md-12 col-lg-4 col-xl-5 ml-6 mx-auto order-2 order-lg-1 d-flex justify-content-center align-items-center`}
        >
          <div className="p-4 w-100 text-center">
            <h5 className="mb-3 text-black">Explorer’s Route</h5>
            <div className="ratio ratio-4x3">
              <iframe
                src={map?.mapsEmbedLink}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Location Map"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Section with Venue Details */}
        <div
          className={`col-md-12 col-lg-8 col-xl-7 d-flex order-1 order-lg-2 align-items-center mt-lg-0 ${ConferenceDetailsStyles.rightPanel}`}
        >
          <div className={`h-100 p-5 w-md-75 ${ConferenceDetailsStyles.rightPanelContent}`}>
            <h3 className="mb-1 text-uppercase">Venue</h3>
            <p>
              Event Date <span className="ms-3">{conference.eventDate}</span>
            </p>
            <p>
              Event Time <span className="ms-3">{conference.eventime}</span>
            </p>
            <div className="lh-sm d-flex align-items-center">
              Hotel Address
              <div className="lh-sm ms-3 d-inline-flex w-75 text-wrap">
                {conference.hotelAddress}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueLocation;
