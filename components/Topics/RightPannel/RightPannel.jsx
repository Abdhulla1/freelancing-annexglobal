import React from "react";
import RightPannelStyles from "./RightPannel.module.css";

export default function RightPannel() {
  return (
    <div
      className={`d-flex justify-content-end align-items-end ${RightPannelStyles["image-slides-card-wrapper"]}`}
    >
      <div className={` position-relative ${RightPannelStyles["wrapper"]}`}>
        <div className={`mt-5 ${RightPannelStyles["octagon"]}`}></div>
        <img
          src="/images/conferences/topicsHeaderImages/imageTwo.png"
          className={`mt-5 ${RightPannelStyles["octagon-image"]}`}
          alt="image1"
        />
        <img
          src="/images/conferences/topicsHeaderImages/imageThree.png"
          className={`mt-5 ${RightPannelStyles["octagon-image-top"]}`}
          alt="image1"
        />
        <img
          src="/images/conferences/topicsHeaderImages/imagefour.png"
          className={`mt-5 ${RightPannelStyles["octagon-image-bottom"]}`}
          alt="image1"
        />
        <div className={`${RightPannelStyles["octagon-shape-with-fill"]}`} />
        <img
          src="/images/conferences/topicsHeaderImages/imageOne.png"
          className={`mt-5 ${RightPannelStyles["octagon-image-bottom-right"]}`}
          alt="image1"
        />
        <img
     src="/images/conferences/topicsHeaderImages/imageFive.png"
          className={`mt-5 ${RightPannelStyles["octagon-image-bottom-right-top"]}`}
          alt="image1"
        />
      </div>
    </div>
  );
}
