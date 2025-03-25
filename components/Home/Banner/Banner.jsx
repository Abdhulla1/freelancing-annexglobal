import React from "react";
import BannerStyle from "./Banner.module.css";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import Button from "@/components/Static/Button";

const Banner = () => {
  return (
    <div className={BannerStyle["img-container"]}>
      <img
        src="/images/home/intro-image.jpg"
        alt="Sample Image"
        className={BannerStyle["image"]}
      />
      <div className={BannerStyle["content"]}>
        <div className={BannerStyle["max-width-700"]}>
      
        <p>WELCOME TO</p>
        <h1 className="fw-bold">ANNEX GLOBAL CONFERENCES</h1>
        <p className="mt-3 h4 fw-light lh-sm">
          "Exploring new Realms, Challenging Constraints, Fostering
          Collaboration "
        </p>
      <Button/>
        <div className={`mt-5 ${BannerStyle["bottom-end-section"]}`}>
          <div className={BannerStyle["badge"]}>
            Attended by top reputed organizations
          </div>
        </div>
        </div>
        <div className="mt-5">
          <Marquee gradient={true} autoFill={true} gradientColor='transparent'>
            <img src="images/reputed-organizations/cipla.png" className={BannerStyle["marquee-logo"]} alt="" />
            <img src="images/reputed-organizations/dr-reddy.png" className={BannerStyle["marquee-logo"]} alt="" />
            <img src="images/reputed-organizations/gsk.png" className={BannerStyle["marquee-logo"]} alt="" />
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Banner;
