import React from "react";
import RightPannelStyles from "./RightPannel.module.css";

export default function RightPannel({ headerPanelImages }) {
  console.log("RightPannel headerPanelImages data:", headerPanelImages);
  return (
    <div
      className={`d-flex justify-content-end align-items-end ${RightPannelStyles["image-slides-card-wrapper"]}`}
    >
      <div className={` position-relative ${RightPannelStyles["wrapper"]}`}>
        <div className={`mt-5 ${RightPannelStyles["octagon"]}`}></div>
        <img
          src={headerPanelImages[0]?.imageUrl}
          className={`mt-5 ${RightPannelStyles["octagon-image"]}`}
          alt="image1"
        />
        <img
          src={headerPanelImages[1]?.imageUrl}
          className={`mt-5 ${RightPannelStyles["octagon-image-top"]}`}
          alt="image1"
        />
        <img
          src={headerPanelImages[2]?.imageUrl}
          className={`mt-5 ${RightPannelStyles["octagon-image-bottom"]}`}
          alt="image1"
        />
        <div className={`${RightPannelStyles["octagon-shape-with-fill"]}`} />
        <img
          src={headerPanelImages[3]?.imageUrl}
          className={`mt-5 ${RightPannelStyles["octagon-image-bottom-right"]}`}
          alt="image1"
        />
        <img
     src={headerPanelImages[4]?.imageUrl}
          className={`mt-5 ${RightPannelStyles["octagon-image-bottom-right-top"]}`}
          alt="image1"
        />
      </div>
    </div>
  );
}
