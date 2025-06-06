import React from "react";
import RightPannelStyles from "./RightPannel.module.css";
import Image from "next/image";

export default function RightPannel({conference, id}) {
  console.log("RightPannel conference", conference);
  return (
    <div
      className={`w-100  d-flex justify-content-center align-items-center ${RightPannelStyles["rightPannel-container"]}`}
    >
      <div className="p-1">
        <div
          className={`position-relative ${RightPannelStyles["image-round"]}`}
        >
          <Image
            src={conference[0].imageUrl}
            fill
            alt="Organizing Committee Members"
            className="rounded-circle"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div
          className={`position-relative rounded-pill my-3 ${RightPannelStyles["image-capsule"]}`}
        >
          <Image
            src={conference[1].imageUrl}
            fill
            alt="Organizing Committee Members"
            className="rounded-pill"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="p-1">
        <div 
          className={`position-relative rounded-pill ${RightPannelStyles["image-capsule-two"] }`}
        >
          <Image
            src={conference[2].imageUrl}
            fill
            alt="Organizing Committee Members"
            className="rounded-pill"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          className={`d-flex justify-content-center align-items-center my-3`}
        >
          <div className={`rounded-circle mt-2 ${RightPannelStyles["dual-half-circle"]}`}></div>
        </div>
      </div>
    </div>
  );
}
