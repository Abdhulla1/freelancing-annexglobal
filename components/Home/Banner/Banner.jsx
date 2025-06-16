"use client";
import React, { useEffect, useState } from "react";
import BannerStyle from "./Banner.module.css";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import Button from "@/components/Static/Button";

const Banner = ({ data }) => {
    const [videoSrc, setVideoSrc] = useState(
    "https://api.annexglobalconferences.com/api/v1/media/stream/video?video=WhatsApp Video 2025-06-06 at 14-d789fdd7-c464-4168-88d0-973a989f13f0.mp4"
  );
  useEffect(() => {
    setVideoSrc(data?.detail?.landingPage?.imageUrl);
  }, [data]);
  const rotatingRoles = [
    "Affiliate Marketers",
    "Medical Experts",
    "Pharma Leaders",
    "Healthcare Innovators",
  ];

  const [index, setIndex] = useState(0);
  const [textKey, setTextKey] = useState(0); // used to reset animation

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingRoles.length);
      setTextKey((prev) => prev + 1); // trigger re-render to reset animation
    }, 3000); // animation + duration = sync

    return () => clearInterval(interval);
  }, []);
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
        {/* <source src="https://api.annexglobalconferences.com/api/v1/media/stream/video?video=WhatsApp Video 2025-06-06 at 14-d789fdd7-c464-4168-88d0-973a989f13f0.mp4" type="video/mp4" /> */}
        <source
          src={
            videoSrc 
          }
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className={BannerStyle["content"]}>
        <div className={BannerStyle["max-width-700"]}>
          <h4 className={`fw-bold ${BannerStyle["welcome"]}`}>WELCOME TO</h4>
          <h1 className={`text-uppercase ${BannerStyle["location"]} py-1`}>
            ANNEX GLOBAL CONFERENCES
          </h1>
          <br />
          {/* <h1 className={`text-uppercase ${BannerStyle["location"]}`}>DUBAI</h1> */}
          {/* <p
            className={`mt-2 h2 fw-light lh-sm ${BannerStyle["welcome"]}`}
            style={{ color: "#D0D0D0", fontSize: "1.2rem" }}
          >
            {data?.detail?.landingPage?.subTitle}
          </p> */}
          <div className={BannerStyle.bannerLine}>
            <span>The largest meeting place for the world's top</span>
            <span key={textKey} className={BannerStyle.animatedText}>
              {rotatingRoles[index]}
            </span>
          </div>
          <Button />
        </div>

        <div className={`mt-5  `}>
          {/* <div className={`ps-2 pe-2 pb-3 ${BannerStyle["bottom-end-section"]}`}>
          <div className={BannerStyle["badge"]}>
            Attended by top reputed organizations
          </div>
        </div> */}
          {/* <Marquee
            Marqueegradient={true}
            autoFill={true}
            gradientColor="transparent"
          >
            <img
              src="images/reputed-organizations/cipla.png"
              className={BannerStyle["marquee-logo"]}
              alt=""
            />
            <img
              src="images/reputed-organizations/dr-reddy.png"
              className={BannerStyle["marquee-logo"]}
              alt=""
            />
            <img
              src="images/reputed-organizations/gsk.png"
              className={BannerStyle["marquee-logo"]}
              alt=""
            />
          </Marquee> */}
        </div>
      </div>
      <div
   className={BannerStyle["marquee-container"]}
      >
        <Marquee gradient={false} autoFill={true}>
          <img
            src="images/reputed-organizations/cipla.png"
            className={BannerStyle["marquee-logo"]}
            alt=""
          />
          <img
            src="images/reputed-organizations/dr-reddy.png"
            className={BannerStyle["marquee-logo"]}
            alt=""
          />
          <img
            src="images/reputed-organizations/gsk.png"
            className={BannerStyle["marquee-logo"]}
            alt=""
          />
        </Marquee>
      </div>
    </div>
  );
};

export default Banner;
