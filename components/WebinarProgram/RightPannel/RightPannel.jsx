import React from "react";
import RightPannelStyles from "./RightPannel.module.css";
import Image from "next/image";

export default function RightPannel({ conference }) {
  return (
    <div
      className={`w-100 d-flex justify-content-center align-items-center p-2   ${RightPannelStyles["rightPannel-container"]}`}
    >
      <WebinarProgramRightSide images={conference} />
    </div>
  );
}

function WebinarProgramRightSide({ images }) {
  return (
    <div className={`px-4 py-2 ${RightPannelStyles["wrapper"]}`}>
      <div className="row h-50">
        <div
          className="col-6 position-relative"
          style={{
            overflow: "hidden",
            borderTopLeftRadius: "0.5rem",
            borderBottomRightRadius: "3rem",
          }}
        >
          <Image
            src={images[0]?.imageUrl}
            alt="imageOne"
            fill
            quality={100}
            style={{ objectFit: "cover", borderRadius: "inherit" }}
          />
        </div>
        <div
          className="col-6 position-relative"
          style={{
            overflow: "hidden",
            borderTopRightRadius: "0.5rem",
            borderBottomLeftRadius: "3rem",
          }}
        >
          <Image
            src={images[1]?.imageUrl}
            alt="imageOne"
            fill
            quality={100}
            style={{ objectFit: "cover", borderRadius: "inherit" }}
          />
        </div>
      </div>
      <div className="row h-50">
        <div
          className="col-6 position-relative"
          style={{
            overflow: "hidden",
            borderBottomLeftRadius: "0.5rem",
            borderTopRightRadius: "3rem",
          }}
        >
          <Image
            src={images[2]?.imageUrl}
            alt="imageOne"
            fill
            quality={100}
            style={{ objectFit: "cover", borderRadius: "inherit" }}
          />
        </div>
        <div
          className="col-6 position-relative"
          style={{
            overflow: "hidden",
            borderBottomRightRadius: "0.5rem",
            borderTopLeftRadius: "3rem",
          }}
        >
          <Image
            src={images[3]?.imageUrl}
            alt="imageOne"
            fill
            quality={100}
            style={{ objectFit: "cover", borderRadius: "inherit" }}
          />
        </div>
      </div>
    </div>
  );
}

<div className={`container ${RightPannelStyles["wrapper"]}`}>
  <div className="row h-50">
    <div
      className="col-6 position-relative"
      style={{
        overflow: "hidden",
        borderTopLeftRadius: "0.5rem",
        borderBottomRightRadius: "3rem",
      }}
    >
      <Image
        src={"/images/conferences/WebinarProgram/imageOne.png"}
        alt="imageOne"
        fill
        quality={100}
        style={{ objectFit: "cover", borderRadius: "inherit" }}
      />
    </div>
    <div
      className="col-6 position-relative"
      style={{
        overflow: "hidden",
        borderTopRightRadius: "0.5rem",
        borderBottomLeftRadius: "3rem",
      }}
    >
      <Image
        src={"/images/conferences/WebinarProgram/imageTwo.png"}
        alt="imageOne"
        fill
        quality={100}
        style={{ objectFit: "cover", borderRadius: "inherit" }}
      />
    </div>
  </div>
  <div className="row h-50">
    <div
      className="col-6 position-relative"
      style={{
        overflow: "hidden",
        borderBottomLeftRadius: "0.5rem",
        borderTopRightRadius: "3rem",
      }}
    >
      <Image
        src={"/images/conferences/WebinarProgram/imageThree.png"}
        alt="imageOne"
        fill
        quality={100}
        style={{ objectFit: "cover", borderRadius: "inherit" }}
      />
    </div>
    <div
      className="col-6 position-relative"
      style={{
        overflow: "hidden",
        borderBottomRightRadius: "0.5rem",
        borderTopLeftRadius: "3rem",
      }}
    >
      <Image
        src={"/images/conferences/WebinarProgram/imageFour.png"}
        alt="imageOne"
        fill
        quality={100}
        style={{ objectFit: "cover", borderRadius: "inherit" }}
      />
    </div>
  </div>
</div>;
