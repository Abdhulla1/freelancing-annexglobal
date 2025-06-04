import React, { useRef, useState } from "react";
import AboutMissionStyles from "./AboutMission.module.css";

const AboutMission = ({ conference }) => {
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const command = isPlaying ? "pauseVideo" : "playVideo";
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: command,
          args: [],
        }),
        "*"
      );
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`my-5 container`}>
      <div className="row">
        <div className="col-lg-6 col-md-12 d-flex d-md-block justify-content-center">
          <div className="me-3">
            <h1 className={AboutMissionStyles["heading"]}>ABOUT</h1>
            <div className={AboutMissionStyles["sub-heading"]}>
              <h3 className="fw-bold">OUR MISSION</h3>
              <div className="pe-4 me-5">
                <div
                  className={`ql-editor ${AboutMissionStyles["about-content"]}`}
                  dangerouslySetInnerHTML={{
                    __html: conference?.content || "",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-12 position-relative rounded-lg">
          <div className={AboutMissionStyles["video-container"]}>
            <iframe
              ref={iframeRef}
              width="100%"
              height="400"
              src={`${conference?.videoUrl}?enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
              title="Conference Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <div
              className={AboutMissionStyles["overlay-text"]}
              onClick={togglePlayPause}
            >
              <div className={AboutMissionStyles["icon-wrapper"]}>
                <i className="pi pi-play-circle h3 m-0"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMission;
