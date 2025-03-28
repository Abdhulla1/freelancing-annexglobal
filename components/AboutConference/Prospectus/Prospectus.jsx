'use client';
import React,{useState} from "react";
import ProspectusStyles from "./Prospectus.module.css";

const prospectusData = [
  {
    title: "Gynecology Conference 2025",
    description:
      "Gynecology Conference Serves As A Platform To Explore Recent Advancements In The Field, Exchange Knowledge, And Collaborate On Addressing Global Challenges In Women's Health. Encompassing Diverse Subjects Such As Health Research, Public Health, Healthcare Delivery, And The Implementation Of Gynecological Policies, The Conference Facilitates Comprehensive Discussions.",
    image: "/images/conferences/conference-prospectus-one.png",
  },
  {
    title: "Scientific committee",
    description:
      "Gynecology Conference Serves As A Platform To Explore Recent Advancements In The Field, Exchange Knowledge, And Collaborate On Addressing Global Challenges In Women's Health. Encompassing Diverse Subjects Such As Health Research, Public Health, Healthcare Delivery, And The Implementation Of Gynecological Policies, The Conference Facilitates Comprehensive Discussions.",
    image: "/images/conferences/past-conference.webp",
  },
  {
    title: "Annual Congress On Gynecology",
    description:
      "Gynecology Conference Serves As A Platform To Explore Recent Advancements In The Field, Exchange Knowledge, And Collaborate On Addressing Global Challenges In Women's Health. Encompassing Diverse Subjects Such As Health Research, Public Health, Healthcare Delivery, And The Implementation Of Gynecological Policies, The Conference Facilitates Comprehensive Discussions.",
    image: "/images/conferences/conference-prospectus-one.png",
  },
 
];
const Prospectus = () => {
  const [activeIndex,setActiveIndex] = useState(0);
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % prospectusData.length);
  };

  return (
    <div className={`py-5 ${ProspectusStyles["container"]}`}>
      <div className="container">
        <div className="row">
          
            <div className="col-md-5" >
              <h3>{prospectusData[activeIndex].title}</h3>
              <p className={ProspectusStyles["passage"]}>{prospectusData[activeIndex].description}</p>
              <button className={ProspectusStyles["btn-download"]}>
                Download Prospectus
              </button>
              <div className={ProspectusStyles["overlay-text"]}>
                <button className={ProspectusStyles["icon-wrapper"]} onClick={handleNext}>
                  <i className="pi-angle-double-left h3 m-0 pi"></i>
                </button>
              </div>
            </div>
         
          <div className="col-md-7">
            <div className={`mt-3 ${ProspectusStyles["card-container"]}`}>
              {prospectusData.map((prospectus,i) => (
                <div
                  key={i}
                  className={
                    activeIndex === i
                      ? ProspectusStyles["card"]
                      : ProspectusStyles["card-active"]
                  }
                >
                  <img src={prospectus.image} alt="Event Image" />
                  <div className={ProspectusStyles["overlay"]}>
                    {activeIndex === i && (
                      <button className={ProspectusStyles["register-btn"]}>
                        GET TICKETS
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prospectus;
