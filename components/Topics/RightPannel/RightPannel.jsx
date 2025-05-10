import React from "react";
import RightPannelStyles from "./RightPannel.module.css";

import Image from "next/image";

export default function RightPannel() {
  return (
    <div className={` w-100 ${RightPannelStyles["image-slides-card-wrapper"]}`}>
      <Image
        className={` w-75 img-fluid h-auto ${RightPannelStyles["ocm"]}`}
        src="/images/conferences/topic-bg-cover.png"
        alt="speaker"
        height={450}
        width={350}
        quality={100}
      />
    </div>
  );
}
