"use client";
import React, { useRef } from "react";
import { useState } from "react";
import styles from "./ContactForm.module.css"; // Import CSS module
import { useSubmitBrochure } from "@/hooks/useWeather";
import { Toast } from "primereact/toast";

const ContactForm = () => {
  const toast = useRef(null);

  const {
    mutate: submitBrochure,
    isLoading,
    isSuccess,
    isError,
  } = useSubmitBrochure();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    email: "",
    conference: "",
    mobileNumber: "",
    message: "",
  });

  const conferenceData = [
    "Innovations In Diabetes Diagnosis",
    "Diabetes Management And Treatment",
    "Infectious Diseases And Preventive",
    "Advance In Clinical Medicine",
    "Mental Health And Psychological",
    "Global Health And Internal Medicine",
    "Public Health And Nutrition",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      organization,
      email,
      mobileNumber,
      conference,
    } = formData;

    let normalizedMobile = formData.mobileNumber.trim().replace(/[\s\-().]/g, "");
    if (normalizedMobile.startsWith("+91"))
      normalizedMobile = normalizedMobile.slice(3);
    else if (normalizedMobile.startsWith("0"))
      normalizedMobile = normalizedMobile.slice(1);
    normalizedMobile = "+91" + normalizedMobile;

const updatedFormData = {
  ...formData,
  mobileNumber: normalizedMobile,
};


    if (
      !firstName ||
      !lastName ||
      !organization ||
      !email ||
      !mobileNumber ||
      !conference
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    submitBrochure(updatedFormData, {
      onSuccess: () => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Form submitted successfully",
          life: 3000,
        });
        setFormData({
          firstName: "",
          lastName: "",
          organization: "",
          email: "",
          conference: "",
          mobileNumber: "",
          message: "",
        });
      },
      onError: () => {
        toast.current.show({
          severity: "error",
          summary: "Submission Failed",
          detail: error.message || "Failed to submit form. Please try again.",
          life: 3000,
        });
      },
    });
  };

  return (
    <div
      className={`container-fluid d-flex flex-column align-items-center justify-content-center ${styles.contactPage}`}
    >
      <Toast ref={toast} />
      <div className={styles.stayConnected}>
        <img src="/images/home/chat.png" alt="Stay Connected" />
        Stay Connected
      </div>

      <h2 className="text-center text-white mb-3">
        Let's{" "}
        <span className={styles.highlightText}> Discuss The Conference.</span>{" "}
        <br />
        However You First
      </h2>

      <div
        className={`col-lg-6 col-md-8 col-11 p-5 mt-3 text-white container rounded ${styles.contactForm}`}
      >
        <h2 className="text-center mb-3">Get In Touch</h2>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                className="form-control"
                placeholder="Enter First Name"
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                className="form-control"
                placeholder="Enter Last Name"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Organization Name*</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              className="form-control"
              placeholder="Enter Organization"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email ID*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="form-control"
              placeholder="Enter Email ID"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact Number*</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              className="form-control"
              placeholder="Enter Contact Number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Conference Name</label>
            <select
              className="form-control"
              name="conference"
              value={formData.conference}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Conference
              </option>
              {conferenceData.map((conference, i) => (
                <option key={i} value={conference}>
                  {conference}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">How can we help?</label>
            <textarea
              name="message"
              value={formData.message}
              className="form-control"
              placeholder="Enter Message"
              rows="4"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`brand-btn w-100 ${styles.submitButton}`}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>

      <footer className={`${styles.footer} mt-5`}>
        <div className="text-center text-white">
          <div
            className={`${styles.footerContent} d-flex justify-content-center align-items-center gap-3`}
          >
            <div className="text-bold">Contact Info :</div>
            <div className="d-flex align-items-center ms-2">
              <img
                className={styles.icon}
                src="/images/home/mobile.png"
                alt="mobile"
              />
              <span className="ms-2">+684-708-3090</span>
            </div>
            <div className="d-flex align-items-center">
              <img
                className={styles.icon}
                src="/images/home/gmail.png"
                alt="email"
              />
              <span className="ms-2">annexglobalconferemce@gmail.com</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactForm;
