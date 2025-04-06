'use client';
import React, { useState, useEffect } from "react";
import BroucherGridStyles from "./BroucherGrid.module.css";
import { Dialog } from "primereact/dialog";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
const BroucherGrid = () => {
  const events = [
    {
      id: 1,
      image: "/images/conferences/dubai-city.webp",
      date: "17 Mar 2026",
      title: "Annual Congress On Gynecology, Obstetrics And Women's Health",
    },
    {
      id: 2,
      image: "/images/conferences/dubai-city.webp",
      date: "17 Mar 2026",
      title: "International Conference on AI & Machine Learning",
    },
    {
      id: 3,
      image: "/images/conferences/dubai-city.webp",
      date: "17 Mar 2026",
      title: "World Summit on Data Science & Cybersecurity",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0); // Track the active event
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Auto-slide every 3 seconds if nothing is hovered
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % events.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, events.length]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string(),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    address: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form Submitted:", values);
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className={BroucherGridStyles["container"]}>
      <div className="container py-5">
        <div className="d-block d-md-flex align-items-center justify-content-between">
          <div>
            <h4>Dubai: Oasis Of Opportunity In The Desert Sands</h4>
            <div className="col-12 col-md-6">
              <p className="text-muted">
                Dubai, A Charming City In The UAE, Skillfully Combines
                Contemporary And Heritage. For The World's Tallest Structure, The
                Burj Khalifa, Dubai Offers Contemporary Experiences.
              </p>
            </div>
          </div>
          <div className={BroucherGridStyles["btn-container"]}>
            <button className={`btn ${BroucherGridStyles["btn-download"]}`} onClick={() => setIsDialogOpen(true)}>
              Download Broucher
            </button>
          </div>
        </div>

        {/* Event Cards as a Slider */}
        <div className="mt-3 row">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={
                index === activeIndex
                  ? "col-md-12 col-lg-6" // Expand active card
                  : "col-md-6 mt-3 mt-lg-0 col-lg-3" // Normal size for others
              }
              style={{ transition: "all 0.4s ease-in-out" }}
              onMouseEnter={() => {
                setActiveIndex(index);
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
            >
              <div className={BroucherGridStyles["card"]}>
                <img src={event.image} alt="Event Image" />
                <div className={BroucherGridStyles["date-badge"]}>
                  {event.date}
                </div>
                <div className={BroucherGridStyles["overlay"]}>
                  <div className={index === 0 ? BroucherGridStyles["title"] : BroucherGridStyles["title2"]}>
                    {event.title}
                  </div>
                  <button className={BroucherGridStyles["register-btn"]}  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



            {/* Dialog with Formik Form */}
            <Dialog
              visible={isDialogOpen}
              modal
              dismissableMask
              draggable={false}
              onHide={() => setIsDialogOpen(false)}
              header="Fill Out The Form And Get Your Brochure"
              className="w-75 max-w-[600px]"
              maskClassName="bg-black bg-opacity-50 backdrop-blur-lg"
            >
              <div className="p-4 container w-80">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <Form>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label className="form-label">
                            First Name <span className="text-danger">*</span>
                          </label>
                          <Field name="firstName">
                            {({ field, meta }) => (
                              <>
                                <input
                                  type="text"
                                  {...field}
                                  placeholder="Enter First Name"
                                  className={`form-control ${meta.touched && meta.error ? "is-invalid" : ""}`}
                                />
                                {meta.touched && meta.error && (
                                  <div className="invalid-feedback">{meta.error}</div>
                                )}
                              </>
                            )}
                          </Field>
                        </div>
      
                        <div className="col-md-6">
                          <label className="form-label">
                            Last Name <span className="text-danger">*</span>
                          </label>
                          <Field name="lastName">
                            {({ field, meta }) => (
                              <>
                                <input
                                  type="text"
                                  {...field}
                                  placeholder="Enter Last Name"
                                  className={`form-control ${meta.touched && meta.error ? "is-invalid" : ""}`}
                                />
                                {meta.touched && meta.error && (
                                  <div className="invalid-feedback">{meta.error}</div>
                                )}
                              </>
                            )}
                          </Field>
                        </div>
                      </div>
      
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label className="form-label">
                            Email ID <span className="text-danger">*</span>
                          </label>
                          <Field name="email">
                            {({ field, meta }) => (
                              <>
                                <input
                                  type="email"
                                  {...field}
                                  placeholder="Enter Email ID"
                                  className={`form-control ${meta.touched && meta.error ? "is-invalid" : ""}`}
                                />
                                {meta.touched && meta.error && (
                                  <div className="invalid-feedback">{meta.error}</div>
                                )}
                              </>
                            )}
                          </Field>
                        </div>
      
                        <div className="col-md-6">
                          <label className="form-label">
                            Country <span className="text-danger">*</span>
                          </label>
                          <Field name="country">
                            {({ field, meta }) => (
                              <>
                                <input
                                  type="text"
                                  {...field}
                                  placeholder="Enter Country"
                                  className={`form-control ${meta.touched && meta.error ? "is-invalid" : ""}`}
                                />
                                {meta.touched && meta.error && (
                                  <div className="invalid-feedback">{meta.error}</div>
                                )}
                              </>
                            )}
                          </Field>
                        </div>
                      </div>
      
                      <div className="mt-3">
                        <label className="form-label">Address</label>
                        <Field name="address">
                          {({ field, meta }) => (
                            <>
                              <input
                                type="text"
                                {...field}
                                placeholder="Enter Address"
                                className={`form-control ${meta.touched && meta.error ? "is-invalid" : ""}`}
                              />
                              {meta.touched && meta.error && (
                                <div className="invalid-feedback">{meta.error}</div>
                              )}
                            </>
                          )}
                        </Field>
                      </div>
      
                      <div className="text-center mt-4">
                        <button
                          type="button"
                          className="btn btn-outline-warning mx-3 px-5 mb-3 mb-md-0 "
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-warning text-white px-5">
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Dialog>
    </div>
  );
};

export default BroucherGrid;
