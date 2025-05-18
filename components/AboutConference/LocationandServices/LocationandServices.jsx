import React from "react";
import LocationandServicesStyles from "./LocationandServices.module.css";
import Link from "next/link";
const LocationandServices = ({conference}) => {
  return (
    <div className={LocationandServicesStyles["container"]}>
      <div className="px-3 px-md-5">
        <div className="row py-5">
          <div className="col-md-5 d-flex justify-content-center align-items-stretch">
            <img
              src="/images/conferences/map.png"
              className="img-fluid object-fit-cover"
              alt=""
            />
          </div>
          <div className="col-md-7 d-flex align-items-center">
            <div className="mt-3 mt-md-0">
              <h4 className="text-white">Location & Services</h4>
              <p className={"text-white h5 fw-normal "+LocationandServicesStyles['lineheight']}>
                welcome to dubai! we extend a warm invitation to experience the
                vibrant energy of our city. explore the intersection of
                tradition and modernity, indulge in luxury, and embrace endless
                opportunities. from iconic landmarks to cultural wonders, dubai
                offers a journey of discovery unlike any other. join us and let
                the adventure begin!
              </p>
              <div className="mt-3">
            <div className={`mt-4 mb-5 d-flex justify-content-md-around flex-wrap ${LocationandServicesStyles["timings"]}`}>
                  <div className="d-inline-flex flex-nowrap align-items-center justify-content-center  gap-2 p-1">
                    <div>
                      {/* <i
                          className={`pi h6 pi-calendar  ${ConferenceDetailsStyles["icons"]}`}
                        ></i> */}
                      <span className="fs-5 text-center">📅</span>
                    </div>
                    <div className="text-white mt-3">
                      <b>12-03-2025</b>
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
                      <b>Dubai, UAE</b>
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
                      <b>City Seasons Hotel, Deira</b>
                      <p className="opacity-75">Hotel</p>
                    </div>
                  </div>
                </div>
              <Link href={`/conference/${conference.id}/venue`} className="brand-btn col-5 text-center  mt-4 text-decoration-none">See Hotels  &nbsp;&nbsp;
                <i className="pi pi-arrow-right"></i>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationandServices;
