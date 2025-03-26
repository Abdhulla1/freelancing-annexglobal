import React from "react";
import ConferenceDetailsStyles from "./TermsAndConditionsDetails.module.css";
import bgImage from '@/public/images/conferences/submit-abstract-bg.png';
const TermsAndConditionsDetails = () => {
  return (
    <div className={ConferenceDetailsStyles["container"]} style={{ '--bg-image': `url(${bgImage.src})` }}>
      <div className="container my-5">
        <div className="row">
          <div className=" col-md-12 col-lg-8 col-xl-7 d-flex align-items-center  mt-lg-0">
            <div>
              <div className="d-flex mt-5">

                &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;
                <div className={ConferenceDetailsStyles["heading"]}>
                  <h3 className="text-uppercase text-white">Terms and conditions</h3>
                  <h6 className="text-white ">
                  Annex Global Conferences
                  </h6>
                  <p className="text-white text-capitalize">
                  “exploring new realms, challenging constraints, fostering collaboration”
                  </p>
                  {/* <div className="mt-4">
                    <button className="brand-btn h3">
                      Grab Your Seats Now
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsDetails;
