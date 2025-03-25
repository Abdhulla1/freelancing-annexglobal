"use client";
import React, { useState } from "react";
import AlumniSpeakerStyles from "./AlumniSpeakers.module.css";
import Slider from "react-slick";
import { Sidebar } from "primereact/sidebar";

const CustomArrow = ({ className, style, onClick, direction }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "linear-gradient(45deg, #00004d, #0000a6)",
        borderTopLeftRadius: direction === "left" ? "20%" : "0",
        borderBottomLeftRadius: direction === "left" ? "20%" : "0",
        borderTopRightRadius: direction === "right" ? "20%" : "0",
        borderBottomRightRadius: direction === "right" ? "20%" : "0",
        width: "40px",
        height: "90px",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      {direction === "left" ? (
        <i className="pi-angle-double-left text-white pi"></i>
      ) : (
        <i className="pi-angle-double-right text-white pi"></i>
      )}
    </div>
  );
};

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <CustomArrow direction="left" />,
  nextArrow: <CustomArrow direction="right" />,
};

const AlumniSpeakers = () => {
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const speakerData = [ 
    {
      name: "Alex Micol",
      designation: "Founder & CEO",
      company: "Scalers",
      companyLogo: "/images/reputed-organizations/cipla-dark.png",
      profileImage:
        "/images/home/speakers/speaker.png",
      about:
        "Upon submission of your abstract, our scientific committee will undertake a thorough review process. Rest assured, we prioritize efficiency and aim to communicate the acceptance status within 24 hours. Following acceptance, we kindly request your confirmation of attendance by completing the speaker registration. Upon successful registration, your distinguished profile banner will grace our conference website, highlighting your esteemed presence and expertise. We eagerly anticipate your participation and invaluable contributions to our upcoming event.",
    },
    {
      name: "Jane Smith",
      designation: "CTO",
      company: "TechCorp",
      companyLogo: "/images/reputed-organizations/gsk-dark.png", // Replace with actual logo
      profileImage:
        "/images/home/speakers/speakercipla.png", // Replace with actual image
      about:
        "Jane Smith is a visionary technology leader with over 20 years of experience. She has been instrumental in developing cutting-edge solutions for TechCorp, driving innovation and growth.",
    },
    {
      name: "David Lee",
      designation: "Senior Engineer",
      company: "Global Solutions",
      companyLogo: "/images/reputed-organizations/cipla-dark.png", // Replace with actual logo
      profileImage:
        "/images/home/speakers/speakergsk.png", // Replace with actual image
      about:
        "David is a Senior Engineer at Global Solutions, where he leads the development of their flagship product.  He is passionate about creating scalable and maintainable software.",
    },
    {
      name: "Sarah Williams",
      designation: "Marketing Director",
      company: "MarketPlus",
      companyLogo: "/images/reputed-organizations/cipla-dark.png",  // Replace
      profileImage:
        "/images/home/speakers/speakergskmale.png", // Replace
      about:
        "Sarah is a dynamic marketing leader with a proven track record of driving brand awareness and customer engagement. She has led several successful campaigns for MarketPlus.",
    },
    {
      name: "Michael Brown",
      designation: "Finance Manager",
      company: "FinCorp",
      companyLogo: "/images/reputed-organizations/cipla-dark.png",  // Replace
      profileImage:
        "/images/home/speakers/speakermale.png",  // Replace
      about:
        "Michael is a seasoned finance professional responsible for overseeing the financial operations of FinCorp. He has extensive experience in budgeting, forecasting, and financial analysis.",
    },
    {
      name: "Emily Wilson",
      designation: "HR Specialist",
      company: "PeopleFirst",
      companyLogo: "/images/reputed-organizations/cipla-dark.png", // Replace
      profileImage:
        "/images/home/speakers/speakermalecipla.png", // Replace
      about:
        "Emily is an HR specialist dedicated to creating a positive and inclusive work environment at PeopleFirst. She handles recruitment, employee relations, and training.",
    },
    {
      name: "Emily Wilson",
      designation: "HR Specialist",
      company: "PeopleFirst",
      companyLogo: "/images/reputed-organizations/gsk-dark.png", // Replace
      profileImage:
        "/images/home/speakers/speakergsk.png", // Replace
      about:
        "Emily is an HR specialist dedicated to creating a positive and inclusive work environment at PeopleFirst. She handles recruitment, employee relations, and training.",
    },
    {
      name: "Emily Wilson",
      designation: "HR Specialist",
      company: "PeopleFirst",
      companyLogo: "/images/reputed-organizations/cipla-dark.png", // Replace
      profileImage:
        "/images/home/speakers/speakercipla.png", // Replace
      about:
        "Emily is an HR specialist dedicated to creating a positive and inclusive work environment at PeopleFirst. She handles recruitment, employee relations, and training.",
    },
  ];

  const handleSpeakerClick = (speaker) => {
    setSelectedSpeaker(speaker);
    setVisibleDetails(true);
  };

  return (
    <div className="alumni-speakers">
      <Sidebar
        visible={visibleDetails}
        position="right"
        onHide={() => setVisibleDetails(false)}
        style={{ width: "32rem" }}
      >
        {selectedSpeaker && (
          <>
            <div className="row">
              <div className="col-md-4">
                <div className={AlumniSpeakerStyles["card-header"]}>
                  <img
                    onClick={() => setVisibleDetails(true)}
                    src={selectedSpeaker.profileImage}
                    alt="Profile"
                    className={AlumniSpeakerStyles["profile-img2"]}
                  />
                </div>
              </div>
              <div className="col-md-8 d-flex align-items-center">
                <div>
                  <h4 className="text-black">{selectedSpeaker.name}</h4>
                  <h5>
                    {selectedSpeaker.designation}, {selectedSpeaker.company}
                  </h5>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <h5 className="text-black">About {selectedSpeaker.name}</h5>
              <div className={AlumniSpeakerStyles["about-content-height"]}>
                <p>{selectedSpeaker.about}</p>
              </div>
            </div>
          </>
        )}
      </Sidebar>
      <div className="container mt-5">
        <div className="col-xl-3 col-lg-4 col-md-6 ">
          <div className={AlumniSpeakerStyles["header"]}>MEET OUR SPEAKERS</div>
        </div>

        <div className="mt-4">
          <h3 className="fw-bold">Esteemed Alumni Speakers</h3>
        </div>
      </div>

      <div className=" p-5 container-fluid">
        <Slider {...settings}>
          <div>
            <div className="container">
              <div className="row">
                {speakerData.map((speaker, index) => (
                  <div className="col-md-6 col-lg-4 col-xl-3 mb-3" key={index}>
                    <div className={AlumniSpeakerStyles["card"]}>
                      <div className={AlumniSpeakerStyles["card-header"]}>
                        <img
                          onClick={() => handleSpeakerClick(speaker)}
                          src={speaker.profileImage}
                          alt="Profile"
                          className={AlumniSpeakerStyles["profile-img"]}
                        />
                        <div className={AlumniSpeakerStyles["mic-icon"]}>
                          <img src="/icons/mic.png" alt="Mic" />
                        </div>
                      </div>
                      <div className={AlumniSpeakerStyles["card-body"]}>
                        <div
                          onClick={() => handleSpeakerClick(speaker)}
                          className={AlumniSpeakerStyles["name"]}
                        >
                          {speaker.name}
                        </div>
                        <div className={AlumniSpeakerStyles["designation"]}>
                          {speaker.designation}
                        </div>
                        <div className={AlumniSpeakerStyles["company"]}>
                          <img
                            src={speaker.companyLogo}
                            alt={speaker.company}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div></div>
        </Slider>
      </div>
    </div>
  );
};

export default AlumniSpeakers;
