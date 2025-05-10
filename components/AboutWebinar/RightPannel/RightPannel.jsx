import React from "react";
import RightPannelStyles from "./RightPannel.module.css";

import Image from "next/image";

const images = [
  {
    direction: "up",
    images: [
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-1.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-2.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-3.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-4.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-5.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-6.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-7.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-2.png",
        altTag: "past-conference",
      },
    ],
  },
  {
    direction: "down",
    images: [
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-2.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-7.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-6.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-5.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-4.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-3.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-2.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-1.png",
        altTag: "past-conference",
      },
    ],
  },
    {
    direction: "up",
    images: [
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-1.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-2.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-3.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-4.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-5.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-6.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-7.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-2.png",
        altTag: "past-conference",
      },
    ],
  },
  {
    direction: "down",
    images: [
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-2.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-7.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-6.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-5.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-4.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-3.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-2.png",
        altTag: "past-conference",
      },
      {
        imgSrc: "/images/conferences/webinarRightPannelImages/video-call-1.png",
        altTag: "past-conference",
      },
    ],
  },
];
export default function RightPannel() {
  return (
    <div
    className={` w-100 ${RightPannelStyles["image-slides-card-wrapper"]}`}
  >
    <div className={`d-flex flex-row gap-4 ${RightPannelStyles["image-slides-card"]}`}>
    {images.map((item, i) => (
          <ImagesSlide key={i} images={item.images} direction={item.direction} />
        ))}
    </div>
    
  </div>
  
  );
}
function ImagesSlide({ direction,images }) {
  
  const animationClass = direction === "up" ? RightPannelStyles["slides-wraper-up"] : RightPannelStyles["slides-wraper-down"];
  return (
    <div
      className={`d-flex flex-column gap-4 ${animationClass}`}
    >
      {images.map((element, i) => (
        <div key={i} className={`  ${RightPannelStyles["image-card"]}`}>
          <Image
            className={`rounded ${RightPannelStyles["image"]}`}
            src={element.imgSrc}
            alt={element.altTag}
            height={200}
            width={180}
            quality={100}
          />
        </div>
      ))}
    </div>
  );
}
