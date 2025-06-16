"use client";
import React, { useRef } from "react";
import connectWithOthers from "./ConnectWithOthers.module.css";
import Slider from "react-slick";
import Ratings from "./Ratings";
import Link from "next/link";
import { useTestimonial } from "@/hooks/useWeather";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
  ],
};

const ConnectWithOthers = ({ conference }) => {
  // const { mutate, data, isPending, isError } = useTestimonial();
  const sliderRef = useRef(null);

  const testimonials = conference?.filter((item) => item.status);

  const dynamicSettings = {
    ...settings,
    slidesToShow: Math.min(testimonials?.length, 3), // 1 item = 1 slide
    infinite: testimonials?.length > 1, // Avoid infinite loop for single slide
  };

  return (
    <div className={connectWithOthers["container"]}>
      <div className="container col-xl-11 col-lg-12 position-relative">
        <div className={connectWithOthers["quote-circle"]}>
          <i className="bx bxs-quote-left fs-4"></i>
        </div>
        <div className={connectWithOthers["members-section"]}>
          <div className="row p-0 p-md-3">
            <div className="col-lg-3 ps-5 p-4 d-flex align-items-center">
              <div>
                <h3 className="text-white text-capitalize fw-bold">
                  Hear from Our Past Conference Members
                </h3>
                <h6 className="text-white fw-normal mt-3 lh-base">
                  Discover insights and experiences from past participants of
                  the Annex Global Conference — a prestigious platform uniting
                  thought leaders, innovators, and professionals from diverse
                  industries. Learn how our members have benefited from
                  meaningful connections, groundbreaking discussions, and
                  transformative opportunities at this world-renowned event.
                </h6>
              </div>
            </div>
            <div className="col-lg-9">
              <div className={connectWithOthers["excess-slider"]}>
                <Slider ref={sliderRef} {...dynamicSettings}>
                  {testimonials?.map((item, i) => (
                    <div key={i} className="px-2">
                      <div className={connectWithOthers["card"]}>
                        <div className={connectWithOthers["card-header"]}>
                          <img src={item.imageUrl} alt={item.name} />
                           <div className={connectWithOthers["quote-icon"]}>
                            {item.videoUrl ? (
                              <Link
                                href={item.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-decoration-none rounded-circle ${connectWithOthers["video"]}`}
                              >
                                <i
                                  className={`bx bx-play fs-1 ${connectWithOthers["play-icon"]}`}
                                ></i>
                              </Link>
                            ) : (
                              <i className="bx bxs-quote-left"></i>
                            )}
                          </div>
                        </div>
                        <div
                          className={` py-3 px-2 ${connectWithOthers["card-body"]}`}
                        >
                         
                          <p
                            className={`ql-editor ${connectWithOthers["description"]}`}
                            dangerouslySetInnerHTML={{
                              __html: item.content,
                            }}
                          />
                          <p className={connectWithOthers["name"]}>
                            {item.name}
                          </p>
                          <p className={connectWithOthers["position"]}>
                            {item.designation}
                          </p>
                          <Ratings rating={item.ratings} />
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
                <div className="mt-3">
                  <div className="d-flex align-items-center">
                    <button
                      className="brand-btn p-0 px-2 py-1 d-flex justify-content-center align-items-center "
                      onClick={() => sliderRef.current.slickPrev()}
                      style={{
                        height: "32px",
                        width: "32px",
                      }}
                    >
                      <i className="pi-angle-left pi"></i>
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="brand-btn p-0 px-2 py-1 d-flex justify-content-center align-items-center"
                      onClick={() => sliderRef.current.slickNext()}
                      style={{
                        height: "32px",
                        width: "32px",
                      }}
                    >
                      <i className="pi-angle-right pi"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWithOthers;
