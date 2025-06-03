import React from "react";
import RightPannelStyles from "./RightPannel.module.css";
import Image from "next/image";

export default function RightPannel({conference, id}) {
  return (
    <div
      className={`w-100 ${RightPannelStyles["rightPannel-container"]}`}
    >
      <div className="ms-5">
         <div className="d-flex justify-content-center align-items-center  ">
        <div
          className={` ${RightPannelStyles["speakerCard"]} p-2 d-flex justify-content-center align-items-center flex-column`}
        >
          <Image
            src={conference[0].imageUrl}
            alt="speaker"
            height={250}
            width={250}
            quality={100}
            className="rounded"
          />
          <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
            <div>
              <h3 className="text-white fw-light">
                <em>{conference[0].name}</em>
              </h3>
              <p
                className="text-white fw-light "
                style={{ letterSpacing: "0.1px" }}
              >
                <em>Studied in Francophone</em>
              </p>
            </div>

            <div
              className={` ${RightPannelStyles["micIcon"]} p-2 d-flex justify-content-center align-items-center`}
            >
              <Image
                src="/icons/mic.png"
                alt="speaker"
                height={21}
                width={15}
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center ">
        <div
          className={` ${RightPannelStyles["speakerCardLayer"]} p-2 d-flex justify-content-center align-items-center flex-column`}
        >
          <Image
            src={conference[1].imageUrl}
            alt="speaker"
            height={250}
            width={250}
            quality={100}
            className="rounded"
          />
          <div>
            <h5 className="text-white fw-light text-start w-100">
              <em>{conference[1].name}</em>
            </h5>
          </div>
        </div>
      </div>
      </div>
     
    </div>
  );
}
