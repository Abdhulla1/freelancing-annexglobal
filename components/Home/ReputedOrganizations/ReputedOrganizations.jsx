import React from "react";
import ReputerOrganizStyle from "./ReputedOrganizations.module.css";
import Marquee from "react-fast-marquee";

const ReputedOrganizations = () => {
  return (
    <div className="mb-5">
      <h5
        className={`text-center fw-bold ${ReputerOrganizStyle["text-color"]}`}
      >
        ATTENDED BY TOP REPUTED ORGANIZATIONS
      </h5>
      <div className="mt-3">
          <Marquee gradient={true} autoFill={true} gradientColor='transparent'>
            <img src="/images/reputed-organizations/cipla-dark.png" className={ReputerOrganizStyle["marquee-logo"]} alt="" />
            <img src="/images/reputed-organizations/dr-reddy-dark.png" className={ReputerOrganizStyle["marquee-logo"]} alt="" />
            <img src="/images/reputed-organizations/gsk-dark.png" className={ReputerOrganizStyle["marquee-logo"]} alt="" />
          </Marquee>
        </div>
    </div>
  );
};

export default ReputedOrganizations;
