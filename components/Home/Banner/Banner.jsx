"use client";
import React from "react";
import BannerStyle from "./Banner.module.css";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import Button from "@/components/Static/Button";


const Banner = ({data}) => {

      
  return (
    <div className={BannerStyle["img-container"]}>
      {/* <img
        src={data?.detail?.landingPage?.imageUrl || "images/banner.jpg"}
        alt="Sample Image"
        className={BannerStyle["image"]}
      /> */}
      <video
        autoPlay
        loop
        muted
        className={BannerStyle["video"]}
        style={{ objectFit: "cover" }}
      >
        <source src="https://api.annexglobalconferences.com/api/v1/media/stream/video?video=WhatsApp Video 2025-06-06 at 14-d789fdd7-c464-4168-88d0-973a989f13f0.mp4" type="video/mp4" />
        {/* <source src={data?.detail?.landingPage?.imageUrl} type="video/mp4" /> */}
        Your browser does not support the video tag.
      </video>
      <div className={BannerStyle["content"]}>
        <div className={BannerStyle["max-width-700"]}>
      
        {/* <p>WELCOME TO</p> */}
        {/* <h4 className="fw-bold">ANNEX GLOBAL CONFERENCES</h4> */}
        <h4 className={`fw-bold ${BannerStyle["welcome"]}`}>WELCOME TO</h4>
        {/* <h1 className={`text-uppercase ${BannerStyle["location"]}`}>{data?.detail?.landingPage?.heading}</h1> */}
        <h1 className={`text-uppercase ${BannerStyle["location"]} py-1`}>ANNEX GLOBAL CONFERENCES</h1>
        <br/>
        {/* <h1 className={`text-uppercase ${BannerStyle["location"]}`}>DUBAI</h1> */}
        <p className={`mt-2 h2 fw-light lh-sm ${BannerStyle["welcome"]}`} style={{ color: "#D0D0D0", fontSize: "1.2rem" }}>
          {data?.detail?.landingPage?.subTitle} 
        </p>
      <Button/>
     
        </div>
        
        <div className="mt-5">
        <div className={`ps-2 pe-2 pb-3 ${BannerStyle["bottom-end-section"]}`}>
          <div className={BannerStyle["badge"]}>
            Attended by top reputed organizations
          </div>
        </div>
          <Marquee Marqueegradient={true} autoFill={true} gradientColor='transparent'>
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
