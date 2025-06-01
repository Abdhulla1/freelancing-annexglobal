"use client";
import AboutMissionStyle from "./AboutMission.module.css";
import { useMainPage } from "@/hooks/useWeather";
import React, { useState } from "react";

const AboutMission = () => {
  const { data, isPending, isError } = useMainPage();
  const videoSection = data?.detail?.videoSection;

  const [showVideo, setShowVideo] = useState(false);

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  return (
    <div className={`bg-black pt-5 pb-5 ${AboutMissionStyle["about-mission-container"]}`}>
      <div className="container-lg">
        <div className="row">
          <div className="col-md-6 d-flex align-items-stretch">
            <div className={AboutMissionStyle["image-container"]}>
              {!showVideo ? (
                <div className={AboutMissionStyle["overlay-text"]}>
                  <div
                    className={AboutMissionStyle["icon-wrapper"]}
                    onClick={handlePlayVideo}
                    style={{ cursor: "pointer" }}
                  >
                    <img src="/icons/annex_logo.png" alt="Play Video" />
                  </div>
                </div>
              ) : (
                <div className="ratio ratio-16x9 w-100">
                  <iframe
                    src={videoSection?.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
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
                  dangerouslySetInnerHTML={{ __html: videoSection?.content || "" }}
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
