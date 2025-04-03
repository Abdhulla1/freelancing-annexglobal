"use client";
import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import PricingTable from "../PricingTable/PricingTable";
import { Dialog } from "primereact/dialog";
import Image from "next/image";
import Link from "next/link";
// Separate component for label and input
const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  colSpan = "col-md-6",
}) => {
  return (
    <div className={`mb-3 ${colSpan}`}>
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

// Separate component for select field
const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  colSpan = "col-md-6",
}) => {
  return (
    <div className={`mb-3 ${colSpan}`}>
      <label className="form-label">{label}</label>
      <select
        name={name}
        className="form-select"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    country: "",
    address: "",
    currency: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const getButtonStyle = (stepIndex) => {
    if (stepIndex === step) {
      return `${styles.stepsBtns} ${styles.stepsBtnActiveFocus}`; // Active and focused
    } else if (stepIndex < step) {
      return `${styles.stepsBtns} ${styles.stepsBtnCompleted}`; // Completed
    } else {
      return `${styles.stepsBtns} ${styles.stepsBtns}`; // Inactive
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="container mt-5 p-5 shadow-lg rounded-4 bg-white">
      <h2 className="text-start mb-4">Registration Form</h2>
      <div className="d-flex pb-4 mb-4">
        {["Personal Details", "Pricing", "Payment"].map((title, index) => {
          const stepIndex = index + 1;
          return (
            <button
              key={stepIndex}
              className={` text-decoration-none col-4 ${getButtonStyle(
                stepIndex
              )} `}
              onClick={() => setStep(stepIndex)}
            >
              {stepIndex < step ? (
                <i className="pi pi-check-circle mr-2"></i>
              ) : (
                <i className="pi pi-circle"></i>
              )}
              {title}
            </button>
          );
        })}
      </div>

      {step === 1 && (
        <form className="container">
          <div className="mb-4">
            <h5 className="text-start mb-4">
              Please fill in the Event Registration Form below to complete your
              registration
            </h5>
            <div className="row">
              <FormField
                label="First Name *"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
              />
              <FormField
                label="Last Name *"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
            </div>
            <div className="row">
              <FormField
                label="Email ID *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
              <FormField
                label="Contact Number *"
                name="contact"
                type="tel"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter Contact"
              />
            </div>
            <div className="row">
              <FormField
                label="Country *"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter Country"
              />
              <FormField
                label="Address *"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Address"
              />
            </div>
          </div>
          <div>
            <h5 className="text-start mb-4">
              Choose your preferred currency for a seamless experience.
            </h5>

            <div className="row">
              <FormSelect
                label="Currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                options={[
                  { value: "", label: "Select Currency" },
                  { value: "USD", label: "USD" },
                  { value: "EUR", label: "EUR" },
                  { value: "INR", label: "INR" },
                ]}
              />
            </div>
          </div>
        </form>
      )}

      {step === 2 && (
        <div>
          <PricingTable />
        </div>
      )}

      {step === 3 && (
        <div className={`container ${styles.paymentContainer}`}>
          <div className="row">
            {/* Payment Method Section */}
            <div className="col-md-6">
              <h5>Choose Payment Method</h5>
              <div className="d-flex flex-column gap-3">
                <label className="d-flex align-items-center border p-2 rounded">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    className="me-2"
                  />
                  <span className="flex-grow-1">Paypal</span>
                  <img
                    src="/images/conferences/paypal.png"
                    alt="PayPal"
                    className="img-fluid"
                    style={{ width: "80px" }}
                  />
                </label>
                <label className="d-flex align-items-center border p-2 rounded">
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    className="me-2"
                  />
                  <span className="flex-grow-1">Razor Pay</span>
                  <img
                    src="/images/conferences/razorpay.png"
                    alt="Razorpay"
                    className="img-fluid"
                    style={{ width: "80px" }}
                  />
                </label>
                <select className="form-select">
                  <option>Net Banking</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="sbi">SBI Bank</option>
                  <option value="icici">ICICI Bank</option>
                </select>
              </div>
            </div>

            {/* Ticket Summary Section */}
            <div className="col-md-6">
              <h5 className="pb-4 border-bottom">Ticket Summary</h5>
              <div className="d-flex justify-content-between">
                <span className="mt-2">Your Ticket Price</span>
                <span className="fw-bold mt-2">$1200.00</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="mt-2">Accommodation Cost</span>
                <span className="fw-bold mt-2">$1200.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total Cost</span>
                <span>$1200.00</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button
          className={`${styles.prevbtn} ${step === 1 ? "invisible" : ""}`}
          onClick={prevStep}
        >
          <i className="pi pi-chevron-left"></i>&nbsp; Previous
        </button>

        {step < 3 ? (
          <button
            className={`btn text-capitalize ${styles["brand-btn"]}`}
            onClick={nextStep}
          >
            continue
          </button>
        ) : (
          <button
            className={`btn text-capitalize ${styles["brand-btn"]}`}
            onClick={() => setIsOpen(true)}
          >
            Proceed to pay
          </button>
        )}
      </div>

      <Dialog
  visible={isOpen}
  modal
  dismissableMask
  onHide={() => setIsOpen(false)}
  className="w-40 max-w-[500px] "
  maskClassName="bg-black bg-opacity-50 backdrop-blur-lg"
  content={({ hide }) => (
    <div className=" bg-white border rounded-4 p-3">
      <div className="position-relative">
        <Image
          src="/images/conferences/registeration-success-bg.png"
          height={200}
          width={600}
          className="img-fluid w-100 h-auto rounded-top"
          alt="Registration Success Background"
        />
      </div>
      <div className="text-center p-3">
        <h3 className="fw-bold mt-3">Registration Successful!</h3>
        <p className="mt-5 px-3">
          Thank you for registering for the{" "}
          <span className="fw-bold text-warning">
            Annual Congress On Gynecology, Obstetrics and Women's Health
          </span>. <br />
          We appreciate your participation and look forward to an insightful event.
        </p>
        <p className="text-muted mt-5">
          You will receive a confirmation email with further details soon.
        </p>

        {/* Back to Homepage Button */}
        <Link
          href={'/'}
          className={`btn text-capitalize ${styles["brand-btn"]}`}
        >
          Back To Homepage
        </Link>
      </div>
    </div>
  )}
></Dialog>

    </div>
  );
}
