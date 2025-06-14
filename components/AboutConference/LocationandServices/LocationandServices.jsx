import React from "react";
import LocationandServicesStyles from "./LocationandServices.module.css";
import Link from "next/link";
const LocationandServices = ({
  locationAndServices,
  landingPageContent,
  id,
}) => {
  return (
    <div className={LocationandServicesStyles["container"]}>
      <div className="container px-3 px-md-5">
        <div className="row py-5 gx-6">
          <div className="col-md-5 d-flex justify-content-center align-items-start">
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
              <h3 className="text-white mb-3">{locationAndServices?.title}</h3>

              <div
                className={`text-white ql-editor h5 fw-normal ${LocationandServicesStyles["lineheight"]}`}
                style={{ padding: 0, overflowX: "hidden" }}
                dangerouslySetInnerHTML={{
                  __html: locationAndServices?.content,
                }}
              ></div>

              <div className="mt-4">
                <div
                  className={`mt-4 ml-3 mb-5 d-flex justify-content-md-around flex-wrap ${LocationandServicesStyles["timings"]}`}
                >
                  <div className="d-inline-flex flex-nowrap align-items-center justify-content-center  gap-2 p-1">
                    <div>
                      {/* <i
                          className={`pi h6 pi-calendar  ${ConferenceDetailsStyles["icons"]}`}
                        ></i> */}
                      <span className="fs-5 text-center">📅</span>
                    </div>
                    <div className="text-white mt-3">
                      <b>{landingPageContent?.startDate}</b>
                      <p className="opacity-75">Date</p>
                    </div>
                    <div className="ms-3 fs-2 text-white opacity-75">|</div>
                  </div>
                  <div className="d-inline-flex align-items-center gap-2 p-1">
                    <div>
                      {/* <i
                          className={`pi h6 pi-map-marker   ${ConferenceDetailsStyles["icons"]}`}
                        ></i> */}

                      <span className="fs-5 text-center">🧭</span>
                    </div>
                    <div className="text-white  mt-3">
                      <b>{landingPageContent?.location}</b>
                      <p className="opacity-75">Location</p>
                    </div>
                    <div className="ms-3 fs-2 text-white opacity-75">|</div>
                  </div>
                  <div className="d-inline-flex align-items-center gap-2 p-1">
                    <div>
                      {/* <i
                          className={`pi h6 pi-clipboard  ${ConferenceDetailsStyles["icons"]}`}
                        ></i> */}
                      <span className="fs-5 text-center">🏨</span>
                    </div>
                    <div className="text-white mt-3">
                      <b>{landingPageContent?.address}</b>
                      <p className="opacity-75">Hotel</p>
                    </div>
                  </div>
                  <Link
                    href={`/conference/${id}/venue`}
                    className="brand-btn col-5 text-center  mt-4 text-decoration-none"
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
