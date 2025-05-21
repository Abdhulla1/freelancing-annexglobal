"use client";
import React, { useState,useEffect} from "react";
import style from "./OrganizingCommitee.module.css";
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



const OrganizingCommitee = () => {
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const speakerData = [
    {
      name: "Nick Shackelford",
      designation:
        "Partner, Retention Head/Structured Co-Founder, Revenue Head",
      company: "Scalers",
      companyLogo: "/images/reputed-organizations/cipla-dark.png",
      profileImage: "/images/home/speakers/member.png",
      about:
        "Upon submission of your abstract, our scientific committee will undertake a thorough review process. Rest assured, we prioritize efficiency and aim to communicate the acceptance status within 24 hours. Following acceptance, we kindly request your confirmation of attendance by completing the speaker registration. Upon successful registration, your distinguished profile banner will grace our conference website, highlighting your esteemed presence and expertise. We eagerly anticipate your participation and invaluable contributions to our upcoming event.",
    },
    {
      name: "Maxwell Finn",
      designation: "President, Unicorn Innovations",
      company: "TechCorp",
      companyLogo: "/images/reputed-organizations/gsk-dark.png", // Replace with actual logo
      profileImage: "/images/home/speakers/speakercipla.png", // Replace with actual image
      about:
        "Jane Smith is a visionary technology leader with over 20 years of experience. She has been instrumental in developing cutting-edge solutions for TechCorp, driving innovation and growth.",
    },
    {
      name: "David Lee",
      designation: "Head/Structured Co-Founder, Revenue Head",
      company: "Global Solutions",
      companyLogo: "/images/reputed-organizations/cipla-dark.png", // Replace with actual logo
      profileImage: "/images/home/speakers/speakergsk.png", // Replace with actual image
      about:
        "David is a Senior Engineer at Global Solutions, where he leads the development of their flagship product.  He is passionate about creating scalable and maintainable software.",
    },
    {
      name: "Sarah Williams",
      designation: "President, Unicorn Innovations",
      company: "MarketPlus",
      companyLogo: "/images/reputed-organizations/cipla-dark.png", // Replace
      profileImage: "/images/home/speakers/speakergskmale.png", // Replace
      about:
        "Sarah is a dynamic marketing leader with a proven track record of driving brand awareness and customer engagement. She has led several successful campaigns for MarketPlus.",
    },
    {
      name: "Michael Brown",
      designation: "President, Unicorn Innovations",
      company: "FinCorp",
      companyLogo: "/images/reputed-organizations/cipla-dark.png", // Replace
      profileImage: "/images/home/speakers/speakermale.png", // Replace
      about:
        "Michael is a seasoned finance professional responsible for overseeing the financial operations of FinCorp. He has extensive experience in budgeting, forecasting, and financial analysis.",
    },
    {
      name: "Emily Wilson",
      designation: "HR Specialist",
      company: "PeopleFirst",
      companyLogo: "/images/reputed-organizations/cipla-dark.png", // Replace
      profileImage: "/images/home/speakers/speakermalecipla.png", // Replace
      about:
        "Emily is an HR specialist dedicated to creating a positive and inclusive work environment at PeopleFirst. She handles recruitment, employee relations, and training.",
    },
    {
      name: "Emily Wilson",
      designation: "HR Specialist",
      company: "PeopleFirst",
      companyLogo: "/images/reputed-organizations/gsk-dark.png", // Replace
      profileImage: "/images/home/speakers/speakergsk.png", // Replace
      about:
        "Emily is an HR specialist dedicated to creating a positive and inclusive work environment at PeopleFirst. She handles recruitment, employee relations, and training.",
    },
    {
      name: "Emily Wilson",
      designation: "HR Specialist",
      company: "PeopleFirst",
      companyLogo: "/images/reputed-organizations/cipla-dark.png", // Replace
      profileImage: "/images/home/speakers/speakercipla.png", // Replace
      about:
        "Emily is an HR specialist dedicated to creating a positive and inclusive work environment at PeopleFirst. She handles recruitment, employee relations, and training.",
    },
    {
      name: "Emily Wilson",
      designation: "HR Specialist",
      company: "PeopleFirst",
      companyLogo: "/images/reputed-organizations/gsk-dark.png", // Replace
      profileImage: "/images/home/speakers/speakergsk.png", // Replace
      about:
        "Emily is an HR specialist dedicated to creating a positive and inclusive work environment at PeopleFirst. She handles recruitment, employee relations, and training.",
    },
    {
      name: "Emily Wilson",
      designation: "HR Specialist",
      company: "PeopleFirst",
      companyLogo: "/images/reputed-organizations/cipla-dark.png", // Replace
      profileImage: "/images/home/speakers/speakercipla.png", // Replace
      about:
        "Emily is an HR specialist dedicated to creating a positive and inclusive work environment at PeopleFirst. She handles recruitment, employee relations, and training.",
    },
   
  ];
  const settings = {
    dots: true,
    infinite: Math.ceil(speakerData.length / 8) > 1, // Conditional infinite
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 768, // Mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handleSpeakerClick = (speaker) => {
    setSelectedSpeaker(speaker);
    setVisibleDetails(true);
  };
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  handleResize(); // set initial
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
const slides = isMobile
  ? chunkArray(speakerData, 1)
  : chunkArray(speakerData, 8);

  return (
    <div className="alumni-speakers">
      <Sidebar
        visible={visibleDetails}
        position="right"
        onHide={() => setVisibleDetails(false)}
        style={{ width: "32rem", borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px"}}
      >
        {selectedSpeaker && (
          <>
            <div className="row">
              <div className="col-md-4">
                <div className={style["card-header"]}>
                  <img
                    onClick={() => setVisibleDetails(true)}
                    src={selectedSpeaker.profileImage}
                    alt="Profile"
                    className={style["profile-img2"]}
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
              <div className={style["about-content-height"]}>
                <p>{selectedSpeaker.about}</p>
              </div>
            </div>
          </>
        )}
      </Sidebar>
      <div className="container mt-5">
        <div className="col-xl-4 col-lg-4 col-md-6 ">
          <div className={style["header"]}>MEET OUR ORGANIZING COMMITTEE</div>
        </div>

        <div className="mt-4">
          <h3 className="fw-bold">Event Oversight Panel</h3>
        </div>
      </div>

      <div className=" p-5 container">
        <Slider {...settings}>
      {slides.map((slide, index) => (
            <div key={index}>
              <div className="container p-5">
                <div className="row">
                   {slide.map((speaker, index) => (
                    <div
                      className="col-md-6 col-lg-4 col-xl-3 mb-3"
                      key={index}
                    >
                      <div className={style["card"]}>
                        <div className={style["card-header"]}>
                          <img
                            onClick={() => handleSpeakerClick(speaker)}
                            src={speaker.profileImage}
                            alt="Profile"
                            className={style["profile-img"]}
                          />
                          <div className={style["mic-icon"]}>
                            <img src="/icons/micwhite.png" alt="Mic" />
                          </div>
                        </div>
                        <div className={style["card-body"]}>
                          <div
                            onClick={() => handleSpeakerClick(speaker)}
                            className={style["name"]}
                          >
                            {speaker.name}
                          </div>
                          <div className={style["designation"]}>
                            {speaker.designation}
                          </div>
                          <div className={style["company"]}>
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
       
          ))}
      
        </Slider>
      </div>
    </div>
  );
};

export default OrganizingCommitee;
