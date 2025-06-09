import React from "react";
import LocationandServicesStyles from "./LocationandServices.module.css";
import Link from "next/link";
const LocationandServices = ({ locationAndServices, landingPageContent, id }) => {
  return (
    <div className={LocationandServicesStyles["container"]}>
      <div className="container px-3 px-md-5">
        <div className="row py-5 gx-6">
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            <iframe
              src={locationAndServices?.mapsEmbedLink}
              width="100%"
              height="90%"
                className={`border-0 rounded-2 ${LocationandServicesStyles.highlightedMapBorder}`}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
<div className="col-md-7 d-flex align-items-start gap-2">
  <div className="ms-3 mt-3 mt-md-0 w-100">
    <h3 className="text-white mb-3">Venue</h3>

    <div
      className={`text-white ql-editor h5 fw-normal ${LocationandServicesStyles["lineheight"]}`}
      style={{ padding: 0, overflowX: 'hidden' }}
      dangerouslySetInnerHTML={{
        __html: locationAndServices?.content,
      }}
    ></div>

    <div className="mt-4">
      <div
        className={`d-flex flex-wrap justify-content-between gap-4 ${LocationandServicesStyles["timings"]}`}
      >
        {/* Date */}
        <div className="d-flex align-items-center gap-3">
          <span className="fs-5">📅</span>
          <div className="text-white">
            <b>{landingPageContent?.startDate}</b>
            <p className="opacity-75 mb-0">Date</p>
          </div>
        </div>

        {/* Location */}
        <div className="d-flex align-items-center gap-3">
          <span className="fs-5">🧭</span>
          <div className="text-white">
            <b>{landingPageContent?.location}</b>
            <p className="opacity-75 mb-0">Location</p>
          </div>
        </div>

        {/* Hotel */}
        <div className="d-flex align-items-center gap-3">
          <span className="fs-5">🏨</span>
          <div className="text-white">
            <b>{landingPageContent?.address}</b>
            <p className="opacity-75 mb-0">Hotel</p>
          </div>
        </div>
      </div>

      {/* Link */}
      <div className="mt-4">
        <Link
          href={`/conference/${id}/venue`}
          className="brand-btn text-center text-decoration-none"
        >
          See Hotels &nbsp;&nbsp;
          <i className="pi pi-arrow-right"></i>
        </Link>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default LocationandServices;
