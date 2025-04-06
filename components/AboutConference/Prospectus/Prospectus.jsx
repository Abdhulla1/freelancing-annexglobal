'use client';
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ProspectusStyles from "./Prospectus.module.css";

const prospectusData = [
  {
    title: "Gynecology Conference 2025",
    description:
      "Gynecology Conference Serves As A Platform To Explore Recent Advancements In The Field, Exchange Knowledge, And Collaborate On Addressing Global Challenges In Women's Health. Encompassing Diverse Subjects Such As Health Research, Public Health, Healthcare Delivery, And The Implementation Of Gynecological Policies, The Conference Facilitates Comprehensive Discussions",
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
    <div className={`py-5 ${ProspectusStyles["container"]}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-5 mb-5 mb-md-0 overflow-y-auto">
            <h3>{prospectusData[activeIndex].title}</h3>
            <p className={ProspectusStyles["passage"]}>
              {prospectusData[activeIndex].description}
            </p>
            <button
              className={ProspectusStyles["btn-download"]}
              onClick={() => setIsDialogOpen(true)}
            >
              Download Brochure
            </button>

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
            <div className={ProspectusStyles["overlay-text"]}>
              <button
                className={ProspectusStyles["icon-wrapper"]}
                onClick={handleNext}
              >
                <i className="pi-angle-double-left h3 m-0 pi"></i>
              </button>
            </div>
          </div>
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

export default Prospectus;
