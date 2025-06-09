import React, { useRef, useState, useEffect } from "react";
import AboutMissionStyles from "./AboutMission.module.css";

const AboutMission = ({ conference }) => {
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getVideoId = (url) => {
    const match = url?.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : "";
  };

  const videoId = getVideoId(conference?.videoUrl);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const postMessageToPlayer = (command) => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: [],
      }),
      "*"
    );
  };

  const togglePlayPause = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      postMessageToPlayer("playVideo");
    } else {
      postMessageToPlayer("pauseVideo");
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      postMessageToPlayer("pauseVideo");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
          <div className={AboutMissionStyles["video-container"]} style={{ position: "relative" }}>
            <iframe
              ref={iframeRef}
              width="100%"
              height="400"
              src={`${conference?.videoUrl}?enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0&autoplay=0`}
              title="Conference Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: "block" }}
            ></iframe>

            {!isPlaying && (
              <img
                src={thumbnailUrl}
                alt="Video Thumbnail"
                className={`w-100 rounded-2xl ${AboutMissionStyles["thumbnail-image"]}`}
                style={{
                  height: "400px",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  cursor: "pointer",
                  zIndex: 2,
                }}
                onClick={togglePlayPause}
              />
            )}

            <div
              className={AboutMissionStyles["overlay-text"]}
              onClick={togglePlayPause}
            >
              <div className={AboutMissionStyles["icon-wrapper"]}>
                <i
                  className={`pi ${
                    isPlaying ? "pi-pause-circle" : "pi-play-circle"
                  } h3 m-0`}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMission;
