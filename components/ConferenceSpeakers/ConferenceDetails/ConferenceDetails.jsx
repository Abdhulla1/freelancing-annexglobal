import React from "react";
import ConferenceDetailsStyles from "./ConferenceDetails.module.css";
import Image from "next/image";

const ConferenceDetails = ({ conference }) => {
  return (
    <div className={ConferenceDetailsStyles["container"]}>
      <div className="container my-5">
        <div className="row">
          <div className=" col-md-12 col-lg-8 col-xl-7 d-flex align-items-center  mt-lg-0">
            <div>
              <div className="d-flex ">
                <div>
                  <img
                    src={conference.icon}
                    className={ConferenceDetailsStyles["conferencelogo"]}
                    alt="Conference Logo"
                  />
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className={ConferenceDetailsStyles["heading"]}>
                  <h3 className="text-uppercase text-white">Speakers</h3>
                  <p className="text-white ">{conference.title}</p>
                  <div className="mt-4">
                    <button
                      className={`h3 ${ConferenceDetailsStyles["brand-btn"]}`}
                    >
                      Grab Your Seats Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-md-12 col-lg-4 col-xl-5 mx-auto d-none d-lg-block">
          <Image
                className={ConferenceDetailsStyles["speaker"]}
                src="/images/conferences/speakerscardelement.png"
                alt="speaker"
                height={300}
                width={350}
                quality={100}
              />
          </div> */}
          <SpeakerRightPanel />
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetails;

function SpeakerRightPanel() {
  return (
    <div className="col-md-12 col-lg-4 col-xl-5 mx-auto d-none d-lg-block position-relative ">
      <div className="d-flex justify-content-center align-items-center ">
        <div
          className={` ${ConferenceDetailsStyles["speakerCard"]} p-2 d-flex justify-content-center align-items-center flex-column`}
        >
          <Image
            src="/images/conferences/speakerCardImage.png"
            alt="speaker"
            height={250}
            width={250}
            quality={100}
            className="rounded"
          />
          <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
            <div>
              <h3 className="text-white fw-light">
                <em>Theresa Terence</em>
              </h3>
              <p
                className="text-white fw-light "
                style={{ letterSpacing: "0.1px" }}
              >
                <em>Studied in Francophone</em>
              </p>
            </div>

            <div
              className={` ${ConferenceDetailsStyles["micIcon"]} p-2 d-flex justify-content-center align-items-center`}
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
      <div className="d-flex justify-content-center align-items-center position-absolute">
        <div
          className={` ${ConferenceDetailsStyles["speakerCardLayer"]} p-2 d-flex justify-content-center align-items-center flex-column`}
        >
          <Image
            src="/images/conferences/speakerCardImage.png"
            alt="speaker"
            height={250}
            width={250}
            quality={100}
            className="rounded"
          />
          <div>
          <h5 className="text-white fw-light text-start w-100">
            <em>Alex The</em>
          </h5>
          </div>
       
        </div>
      </div>

    </div>
  );
}
