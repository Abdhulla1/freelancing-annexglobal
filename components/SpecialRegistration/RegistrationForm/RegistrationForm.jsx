"use client";
import React, { useState, useRef } from "react";
import styles from "./RegistrationForm.module.css";
import { Dialog } from "primereact/dialog";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import {
  useRegistration,
  useRazorpayOrder,
  useRazorpayVerify,
  usePayPalOrder,
  usePayPalVerify,
} from "@/hooks/useWeather";


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

// === 👇 Main Component ===
export default function RegistrationForm({conference}) {
  console.log("RegistrationForm conference", conference);
  const [ paymentMethod, setPaymentMethod] = useState("");
  const conferenceName = conference?.conference?.landingPage?.conference || "Conference";
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
    const toast = useRef(null);
      const registrationMutation = useRegistration();
      const razorpayOrderMutation = useRazorpayOrder();
      const razorpayVerifyMutation = useRazorpayVerify();
      const payPalOrderMutation = usePayPalOrder();

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

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string()
      .matches(/^\d{10}$/, "Enter 10 digit number")
      .required("Contact is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      country: "",
      address: "",
    },
    validationSchema,
    onSubmit: () => {
      setStep((prev) => prev + 1);
    },
  });

    const handlePayment = async () => {
    let normalizedMobile = formik.values.contact
      .trim()
      .replace(/[\s\-().]/g, "");
    if (normalizedMobile.startsWith("+91"))
      normalizedMobile = normalizedMobile.slice(3);
    else if (normalizedMobile.startsWith("0"))
      normalizedMobile = normalizedMobile.slice(1);
    normalizedMobile = "+91" + normalizedMobile;

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "contact",
      "country",
      "address",
    ];
    for (let field of requiredFields) {
      if (!formik.values[field]) {
        toast.current.show({
          severity: "error",
          summary: "Submission Failed",
          detail: `Please fill the ${field} field`,
          life: 3000,
        });
        return;
      }
    }


    if (!paymentMethod) {
      toast.current.show({
        severity: "error",
        summary: "Payment Method Required",
        detail: "Please select a payment method to proceed.",
        life: 3000,
      });
      return;
    }

    const data = {
      conferenceName: conferenceName,
      personalDetails: {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        email: formik.values.email,
        mobileNumber: normalizedMobile,
        country: formik.values.country,
        address: formik.values.address,
        currency: conference?.currency || "USD",
      },
      pricing: {
        registration: conference?.registrationFee || 0,
        occupancy: "occupancy",
        period: "period",
        room: "room",
        ticketPrice: conference?.registrationFee || 0, // Assuming registrationFee is the ticket price
        accommodationCost: "100",
        total: conference?.registrationFee || 0, // Assuming registrationFee is the total
      },
      paymentType: paymentMethod,
    };

    registrationMutation.mutate(data, {
      onSuccess: async (res) => {
        if (paymentMethod === "RazorPay") {
          const paymentId = res.detail.paymentId;
          const amount = conference?.registrationFee * 100;
          razorpayOrderMutation.mutate(
            { paymentId, amount },
            {
              onSuccess: (order) => {
                console.log("razor pay pay ",order)
                if (typeof window !== "undefined" && window.Razorpay) {
                  const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                    amount: order.detail.data.amount,
                    currency: order.detail.data.currency,
                    name: "Annex Global Conference",
                    description: "Annex Global",
                    order_id: order.detail.data.id,
                    handler: (response) => {
                      razorpayVerifyMutation.mutate(
                        {
                          razorpay_payment_id: response.razorpay_payment_id,
                          razorpay_order_id: response.razorpay_order_id,
                          razorpay_signature: response.razorpay_signature,
                        },
                        {
                          onSuccess: (verificationResult) => {
                            console.log("Verification result:", verificationResult);
                            if (verificationResult.detail[0].msg) {
                              toast.current.show({
                                severity: "success",
                                summary: "Success",
                                detail: "Conference booked successfully",
                                life: 3000,
                              });
                              setIsOpen(true);
                            } else {
                              toast.current.show({
                                severity: "error",
                                summary: "Verification Failed",
                                detail: "Payment verification failed.",
                                life: 3000,
                              });
                            }
                          },
                          onError: (error) => {
                            console.error("Verification failed:", error);
                            toast.current.show({
                              severity: "error",
                              summary: "Verification Error",
                              detail: "Failed to verify payment.",
                              life: 3000,
                            });
                          },
                        }
                      );
                    },
                    prefill: {
                      name: `${formik.values.firstName} ${formik.values.lastName}`,
                      email: formik.values.email,
                      contact: normalizedMobile,
                    },
                    notes: {
                      address: formik.values.address,
                    },
                    theme: {
                      color: "#3399cc",
                    },
                  };
                  const rzp = new window.Razorpay(options);
                  rzp.open();
                } else {
                  toast.current.show({
                    severity: "error",
                    summary: "Razorpay Not Loaded",
                    detail:
                      "Razorpay script not loaded. Please try again later.",
                    life: 3000,
                  });
                }
              },
              onError: (err) => {
                console.error("Order creation failed:", err);
                toast.current.show({
                  severity: "error",
                  summary: "Order Creation Failed",
                  detail: "Failed to create Razorpay order.",
                  life: 3000,
                });
              },
            }
          );
        } else if (paymentMethod === "PayPal") {
          const paymentId = res.detail.paymentId;
          const amount = conference?.registrationFee;

          payPalOrderMutation.mutate(
            { paymentId, amount },
            {
              onSuccess: (order) => {
                if (order.detail.approval_url) {
                  toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Redirecting to PayPal for payment...",
                    life: 3000,
                  });
                  window.location.href = order.detail.approval_url;
                } else {
                  toast.current.show({
                    severity: "error",
                    summary: "PayPal Order Error",
                    detail: "Failed to create PayPal order.",
                    life: 3000,
                  });
                }
              },
              onError: (err) => {
                console.error("PayPal order creation failed:", err);
                toast.current.show({
                  severity: "error",
                  summary: "PayPal Order Failed",
                  detail: "Failed to create PayPal order.",
                  life: 3000,
                });
              },
            }
          );
        } else {
          toast.current.show({
            severity: "error",
            summary: "Payment Method Not Supported",
            detail: "Selected payment method is not supported.",
            life: 3000,
          });
        }
      },
      onError: (err) => {
        console.error("Registration failed:", err);
        toast.current.show({
          severity: "error",
          summary: "Registration Failed",
          detail: "Failed to register. Please try again.",
          life: 3000,
        });
      },
    });
  };


  return (
    <div className="container mt-5 p-5 shadow-lg rounded-4 bg-white">
      <h2 className="text-start mb-4">Registration Form</h2>
      <div className="d-flex pb-4 mb-4">
        {["Personal Details", "Payment"].map((title, index) => {
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
            {/* <FormSelect
              label="Currency"
              name="currency"
              formik={formik}
              options={[
                { value: "", label: "Select Currency" },
                { value: "USD", label: "USD" },
                { value: "EUR", label: "EUR" },
                { value: "INR", label: "INR" },
              ]}
            /> */}
           Currency: {conference?.currency}
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className={`btn ${styles["brand-btn"]}`}>
              Continue
            </button>
          </div>
        </form>
      )}

     
      {step === 2 && (
        <div className={`container ${styles.paymentContainer}`}>
          <div className="row">
            <div className="col-md-6">
              <h5>Choose Payment Method</h5>
              <div className="d-flex flex-column gap-3">
                <label className="d-flex align-items-center border p-2 rounded">
                  <input
                    type="radio"
                    name="payment"
                     onChange={() => setPaymentMethod("PayPal")}
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
                    onChange={() => setPaymentMethod("RazorPay")}
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
                <span className="fw-bold mt-2">${conference?.registrationFee}</span>
              </div>
              {/* <div className="d-flex justify-content-between">
                <span className="mt-2">Accommodation Cost</span>
                <span className="fw-bold mt-2">${totals.accommodationTotal.toFixed(2)}</span>
              </div> */}
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total Cost</span>
                <span>${conference?.registrationFee}</span>
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
            onClick={handlePayment}
            // onClick={() => setStep((prev) => prev + 1)}
          >
            Proceed to Pay
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
         <Toast ref={toast} />
    </div>
  );
}
