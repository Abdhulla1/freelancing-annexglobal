'use client';
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % prospectusData.length);
  };

  return (
    <div className={`py-5 ${ProspectusStyles["container"]}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h3>{prospectusData[activeIndex].title}</h3>
            <p className={ProspectusStyles["passage"]}>
              {prospectusData[activeIndex].description}
            </p>
            <button
              className={ProspectusStyles["btn-download"]}
              onClick={() => setIsDialogOpen(true)} // Open Dialog on Click
            >
              Download Brochure
            </button>
            <div className={ProspectusStyles["overlay-text"]}>
              <button className={ProspectusStyles["icon-wrapper"]} onClick={handleNext}>
                <i className="pi-angle-double-left h3 m-0 pi"></i>
              </button>
            </div>
          </div>

          <div className="col-md-7">
            <div className={`mt-3 ${ProspectusStyles["card-container"]}`}>
              {prospectusData.map((prospectus, i) => (
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

      {/* PrimeReact Dialog */}
      <Dialog
        visible={isDialogOpen}
        modal
        dismissableMask
        onHide={() => setIsDialogOpen(false)}
        header="Fill Out The Form And Get Your Brochure"
        className="w-75 max-w-[600px]"
        maskClassName="bg-black bg-opacity-50 backdrop-blur-lg"
      >
        <div className="p-4 container w-80">
          <form>
            <div className="row mt-4">
              <div className="col-md-6">
                <label className="form-label">First Name *</label>
                <input type="text" className="form-control" placeholder="Enter First Name" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name *</label>
                <input type="text" className="form-control" placeholder="Enter Last Name" required />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label className="form-label">Email ID *</label>
                <input type="email" className="form-control" placeholder="Enter Email ID" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Country *</label>
                <input type="text" className="form-control" placeholder="Enter Country" required />
              </div>
            </div>

            <div className="mt-3">
              <label className="form-label">Address</label>
              <input type="text" className="form-control" placeholder="Enter Address" />
            </div>

            <div className="text-center mt-4">
              <button
                type="button"
                className={`btn btn-outline-warning  mx-3 px-5`}
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-warning text-white px-5 ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Prospectus;
