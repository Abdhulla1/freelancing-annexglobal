"use client";
import React from "react";
import connectWithOthers from "./ConnectWithOthers.module.css";
import Slider from "react-slick";
import { useRef } from "react";
import Ratings from "./Ratings";
import Link from "next/link";
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024, // For tablets & smaller desktops
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768, // For tablets & large phones
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480, // For mobile screens
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ConnectWithOthers = () => {
  const sliderRef = useRef(null);

  return (
    <div className={connectWithOthers["container"]}>
      <div className="col-xl-11 col-lg-12 ">
        <div className={connectWithOthers["members-section"]}>
          <div className="row p-0 p-md-3">
            <div className="col-md-3 ps-5 p-4 d-flex align-items-center">
              <div>
                <h3 className="text-white text-capitalize">
                  Connect with other members
                </h3>
                <h6 className="text-white fw-normal mt-3">
                  The Annex Global Conference stands as a premier international
                  forum that brings together visionaries, industry leaders,
                  entrepreneurs, and changemakers from around the world. Focused
                  on driving transformative innovation, the conference serves as
                  a catalyst for groundbreaking ideas, disruptive technologies,
                  and collaborative strategies that transcend traditional
                  industry boundaries. Spanning multiple sectors — including
                  technology, healthcare, finance, sustainability, education,
                  and manufacturin
                </h6>
              </div>
            </div>
            <div className="col-md-9">
              <div className={connectWithOthers["excess-slider"]}>
                <Slider ref={sliderRef} {...settings}>
                  {[true, false, false, false, false, false].map((el, i) => (
                    <div key={i}>
                      <div className="px-2">
                        <div className={connectWithOthers["card"]}>
                          <div className={connectWithOthers["card-header"]}>
                            <img
                              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                              alt="Profile Image"
                            />
                          </div>
                          <div className={connectWithOthers["card-body"]}>
                            <div className={connectWithOthers["quote-icon"]}>
                              {el ? (
                                <a
                                  href="https://youtu.be/19eIVnOI9Do?si=Cd1ONhNjHtrYgG-H"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`text-decoration-none rounded-circle ${connectWithOthers["video"]}`}
                                >
                                  <i
                                    className={`bx bx-play fs-1 ${connectWithOthers["play-icon"]}`}
                                  ></i>
                                </a>
                              ) : (
                                <i className="bx bxs-quote-left"></i>
                              )}
                            </div>
                            <p className={connectWithOthers["description"]}>
                              The Annex Global Conference Fosters Innovation And
                              Collaboration Across Diverse Industries Worldwide.
                              By Bringing Together Thought Leaders And Experts,
                              We The Annex Global Conference Fosters Innovation
                              And Collaboration...
                            </p>
                            <p className={connectWithOthers["name"]}>
                              Pam Beesaley
                            </p>
                            <p className={connectWithOthers["position"]}>
                              Founder
                            </p>
                            <Ratings rating={5} />
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                  ))}
                </Slider>
                <div className="mt-3">
                  <div className="d-flex align-items-center">
                    <button
                      className="brand-btn p-0 px-2 py-1"
                      onClick={() => sliderRef.current.slickPrev()}
                    >
                      <i className="pi-angle-left pi"></i>
                    </button>{" "}
                    &nbsp;&nbsp;
                    <button
                      className="brand-btn p-0 px-2 py-1"
                      onClick={() => sliderRef.current.slickNext()}
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
