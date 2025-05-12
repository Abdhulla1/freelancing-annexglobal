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
              <div className={`mt-5 mb-4 ${LocationandServicesStyles["timings"]} `}>
                <div className="row">
                  <div className="col-6 col-md-6 col-lg-3 border-end border-white">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <i className="pi h4 pi-calendar text-white"></i>
                      </div>
                      <div className="text-white">
                        <b>12-03-2025</b>
                        <p>Date</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-6 col-lg-3 border-end border-white">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <i className="pi h4 pi-map-marker text-white"></i>
                      </div>
                      <div className="text-white">
                        <b>Dubai, UAE</b>
                        <p>Location</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-6 mt-md-0 mt-3">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <i className="pi h4 pi-clipboard text-white"></i>
                      </div>
                      <div className="text-white">
                        <b>City Seasons Hotel, Deira</b>
                        <p>Hotel</p>
                      </div>
                    </div>
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
