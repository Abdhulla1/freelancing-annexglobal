"use client";
import AboutMissionStyle from "./AboutMission.module.css";
import { useMainPage } from "@/hooks/useWeather";
import React, { useState } from "react";

const AboutMission = ({ conference }) => {
  const videoSection = conference?.detail?.videoSection;

  const [showVideo, setShowVideo] = useState(false);

  const getYoutubeId = (url) => {
    const match = url?.match(/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : "";
  };

  const youtubeId = getYoutubeId(videoSection?.videoUrl);
  console.log("YouTube ID:", youtubeId);

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  return (
    <div
      className={`bg-black pt-5 pb-5 ${AboutMissionStyle["about-mission-container"]}`}
    >
      <div className="container-lg">
        <div className="row">
          <div className="col-md-6 d-flex align-items-stretch">
            <div className={AboutMissionStyle["image-container"]}>
              {!showVideo ? (
                <div
                  className={AboutMissionStyle["overlay-text"]}
                  onClick={handlePlayVideo}
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    cursor: "pointer",
                    aspectRatio: "16/9",
                  }}
                >
                  <div
                    className={AboutMissionStyle["icon-wrapper"]}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <img src="/icons/annex_logo.png" alt="Play Video" />
                  </div>
                </div>
              ) : (
                <div className="ratio ratio-16x9 w-100">
                  <iframe
                    src={`${videoSection?.videoUrl}?autoplay=1&controls=0&rel=0&modestbranding=1&showinfo=0`}
                    title="About the Mission Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-100 h-100"
                  ></iframe>
                </div>
              )}
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center align-items-center mt-3 mt-md-0 p-3">
            <div>
              <h3 className="text-white text-uppercase">
                {videoSection?.title || "About the mission"}
              </h3>
              <div className="mt-3 text-white fw-normal">
                <div
                  className={AboutMissionStyle["lineheight"]}
                  dangerouslySetInnerHTML={{
                    __html: videoSection?.content || "",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMission;
