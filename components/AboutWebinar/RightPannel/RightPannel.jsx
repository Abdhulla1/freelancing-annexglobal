import React from "react";
import RightPannelStyles from "./RightPannel.module.css";
import Image from "next/image";

export default function RightPannel({ conference }) {
  console.log("RightPannel conference data:", conference);

  // Duplicate the image array to fill 4 columns with alternating directions
  const repeatedImages = Array(4).fill(conference); // Creates 4 columns

  return (
    <div className={`w-100 ${RightPannelStyles["image-slides-card-wrapper"]}`}>
      <div className={`d-flex flex-row gap-4 ${RightPannelStyles["image-slides-card"]}`}>
        {repeatedImages.map((imagesArray, index) => (
          <ImagesSlide
            key={index}
            images={imagesArray}
            direction={index % 2 === 0 ? "up" : "down"} // Alternate direction
          />
        ))}
      </div>
    </div>
  );
}

function ImagesSlide({ direction, images }) {
  const animationClass =
    direction === "up"
      ? RightPannelStyles["slides-wraper-up"]
      : RightPannelStyles["slides-wraper-down"];

  return (
    <div className={`d-flex flex-column gap-4 ${animationClass}`}>
      {images.map((element, i) => (
        <div key={i} className={RightPannelStyles["image-card"]}>
          <Image
            className={`rounded ${RightPannelStyles["image"]}`}
            src={element.imageUrl}
            alt="past-conference"
            height={200}
            width={180}
            quality={100}
          />
        </div>
      ))}
    </div>
  );
}
