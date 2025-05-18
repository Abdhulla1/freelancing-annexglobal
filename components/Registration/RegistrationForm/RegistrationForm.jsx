"use client";
import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import PricingTable from "../PricingTable/PricingTable";
import { Dialog } from "primereact/dialog";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormField = ({
  label,
  name,
  type = "text",
  formik,
  placeholder,
  colSpan = "col-md-6",
}) => {
  return (
    <div className={`mb-3 ${colSpan}`}>
      <label className="form-label">
        {label} <span className="text-danger">*</span>
      </label>
      <input
        type={type}
        name={name}
        className={`form-control ${formik.touched[name] && formik.errors[name] ? "is-invalid" : ""
          }`}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="invalid-feedback">{formik.errors[name]}</div>
      )}
    </div>
  );
};

const FormSelect = ({
  label,
  name,
  options,
  formik,
  colSpan = "col-md-6",
}) => {
  return (
    <div className={`mb-3 ${colSpan}`}>
      <label className="form-label">
        {label} <span className="text-danger">*</span>
      </label>
      <select
        name={name}
        className={`form-select ${formik.touched[name] && formik.errors[name] ? "is-invalid" : ""
          }`}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {formik.touched[name] && formik.errors[name] && (
        <div className="invalid-feedback">{formik.errors[name]}</div>
      )}
    </div>
  );
};
const currencySymbols = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CNY: '¥',
};
// === 👇 Main Component ===
export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [totals, setTotals] = useState({
    ticketTotal: 0,
    accommodationTotal: 0,
    netTotal: 0,
  });
  const handleTotalChange = (newTotals) => {
    setTotals(newTotals);
  };
  const getButtonStyle = (stepIndex) => {
    if (stepIndex === step) {
      return `${styles.stepsBtns} ${styles.stepsBtnActiveFocus}`;
    } else if (stepIndex < step) {
      return `${styles.stepsBtns} ${styles.stepsBtnCompleted}`;
    } else {
      return styles.stepsBtns;
    }
  };
  const getSymbol = (currency) => {
    return currencySymbols[currency] || '';
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string()
      .matches(/^\d{10}$/, "Enter 10 digit number")
      .required("Contact is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Address is required"),
    currency: Yup.string().required("Currency is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      country: "",
      address: "",
      currency: "",
    },
    validationSchema,
    onSubmit: () => {
      setStep((prev) => prev + 1);
    },
  });

  return (
    <div className="container mt-5 p-5 shadow-lg rounded-4 bg-white">
      <h2 className="text-start mb-4">Registration Form</h2>
      <div className="d-flex pb-4 mb-4">
        {["Personal Details", "Pricing", "Payment"].map((title, index) => {
          const stepIndex = index + 1;
          return (
            <button
              key={stepIndex}
              className={`text-decoration-none col-4 ${getButtonStyle(
                stepIndex
              )}`}
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
        <form className="container" onSubmit={formik.handleSubmit}>
          <h5 className="text-start mb-4">
            Please fill in the Event Registration Form below to complete your
            registration
          </h5>
          <div className="row">
            <FormField
              label="First Name"
              name="firstName"
              formik={formik}
              placeholder="Enter First Name"
            />
            <FormField
              label="Last Name"
              name="lastName"
              formik={formik}
              placeholder="Enter Last Name"
            />
          </div>
          <div className="row">
            <FormField
              label="Email"
              name="email"
              type="email"
              formik={formik}
              placeholder="Enter Email"
            />
            <FormField
              label="Contact Number"
              name="contact"
              type="tel"
              formik={formik}
              placeholder="Enter Contact Number"
            />
          </div>
          <div className="row">
            <FormField
              label="Country"
              name="country"
              formik={formik}
              placeholder="Enter Country"
            />
            <FormField
              label="Address"
              name="address"
              formik={formik}
              placeholder="Enter Address"
            />
          </div>
          <h5 className="text-start mb-4">
            Choose your preferred currency for a seamless experience.
          </h5>
          <div className="row">
            <FormSelect
              label="Currency"
              name="currency"
              formik={formik}
              options={[
                { value: "", label: "Select Currency" },
                { value: "USD", label: "USD" },
                { value: "EUR", label: "EUR" },
                { value: "GBP", label: "GBP" },
              ]}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className={`btn ${styles["brand-btn"]}`}>
              Continue
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div>
          <PricingTable onTotalChange={handleTotalChange} selectedCurrency={formik.values.currency} getSymbol={getSymbol}/>
        </div>
      )}

      {step === 3 && (
        <div className={`container ${styles.paymentContainer}`}>
          <div className="row">
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
                <label className="d-flex align-items-center border p-2 rounded">
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    className="me-2"
                  />
                  <span className="flex-grow-1">Net Banking</span>
                  {/* <img
                    src="/images/conferences/razorpay.png"
                    alt="Razorpay"
                    className="img-fluid"
                    style={{ width: "80px" }}
                  /> */}
                </label>
                {/* <select className="form-select">
                  <option>Net Banking</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="sbi">SBI Bank</option>
                  <option value="icici">ICICI Bank</option>
                </select> */}
              </div>
            </div>

            <div className="col-md-6">
              <h5 className="pb-4 border-bottom">Ticket Summary</h5>
              <div className="d-flex justify-content-between">
                <span className="mt-2">Your Ticket Price</span>
                <span className="fw-bold mt-2">${totals.ticketTotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="mt-2">Accommodation Cost</span>
                <span className="fw-bold mt-2">${totals.accommodationTotal.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total Cost</span>
                <span>${totals.netTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button
          className={`${styles.prevbtn} ${step === 1 ? "invisible" : ""}`}
          onClick={() => setStep((prev) => prev - 1)}
        >
          <i className="pi pi-chevron-left"></i>&nbsp; Previous
        </button>

        {step === 2 ? (
          <button
            className={`btn text-capitalize ${styles["brand-btn"]}`}
            onClick={() => setStep((prev) => prev + 1)}
          >
            continue
          </button>
        ) : step === 3 ? (
          <button
            className={`btn text-capitalize ${styles["brand-btn"]}`}
            onClick={() => setIsOpen(true)}
          >
            Proceed to pay
          </button>
        ) : null}
      </div>

      <Dialog
        visible={isOpen}
        modal
        dismissableMask
        onHide={() => setIsOpen(false)}
        className="w-40 max-w-[500px]"
        maskClassName="bg-black bg-opacity-50 backdrop-blur-lg"
        content={({ hide }) => (
          <div className="bg-white border rounded-4 p-3">
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
                </span>
                . <br />
                We appreciate your participation and look forward to an insightful event.
              </p>
              <p className="text-muted mt-5">
                You will receive a confirmation email with further details soon.
              </p>
              <Link
                href={"/"}
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
