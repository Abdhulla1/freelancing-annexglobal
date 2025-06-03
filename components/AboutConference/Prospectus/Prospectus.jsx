"use client";
import React, { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import ProspectusStyles from "./Prospectus.module.css";
import { useParams } from "next/navigation";
import { useBrochure } from "@/hooks/useWeather";
import Link from "next/link";

const prospectusData = [
  {
    title: "Gynecology Conference 2025",
    description:
      "Gynecology Conference Serves As A Platform To Explore Recent Advancements In The Field, Exchange Knowledge, And Collaborate On Addressing Global Challenges In Women's Health. Encompassing Diverse Subjects Such As Health Research, Public Health, Healthcare Delivery, And The Implementation Of Gynecological Policies, The Conference Facilitates Comprehensive Discussions",
    image: "/images/conferences/conference-prospectus-one.png",
  },
  {
    title: "Gynecology Conference 2025",
    description:
      "Gynecology Conference Serves As A Platform To Explore Recent Advancements In The Field, Exchange Knowledge, And Collaborate On Addressing Global Challenges In Women's Health. Encompassing Diverse Subjects Such As Health Research, Public Health, Healthcare Delivery, And The Implementation Of Gynecological Policies, The Conference Facilitates Comprehensive Discussions.",
    image: "/images/conferences/past-conference.webp",
  },
  {
    title: "Gynecology Conference 2025",
    description:
      "Gynecology Conference Serves As A Platform To Explore Recent Advancements In The Field, Exchange Knowledge, And Collaborate On Addressing Global Challenges In Women's Health. Encompassing Diverse Subjects Such As Health Research, Public Health, Healthcare Delivery, And The Implementation Of Gynecological Policies, The Conference Facilitates Comprehensive Discussions.",
    image: "/images/conferences/conference-prospectus-one.png",
  },
];

const Prospectus = ({ conference, id }) => {
  const params = useParams();
  const toast = useRef(null);
  const conferenceName = params?.slug;
  const BrochureMutation = useBrochure();
  const [activeIndex, setActiveIndex] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % prospectusData.length);
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contry: Yup.string().required("Country is required"),
    address: Yup.string().required("Address is required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
      .required("Contact number is required"),
  });

  const initialValues = {
    conference: conferenceName || "",
    firstName: "",
    lastName: "",
    email: "",
    contry: "",
    address: "",
    mobileNumber: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    let normalizedMobile = values.mobileNumber.trim().replace(/[\s\-().]/g, "");
    if (normalizedMobile.startsWith("+91"))
      normalizedMobile = normalizedMobile.slice(3);
    else if (normalizedMobile.startsWith("0"))
      normalizedMobile = normalizedMobile.slice(1);
    normalizedMobile = "+91" + normalizedMobile;

    const formattedValues = {
      ...values,
      mobileNumber: normalizedMobile,
    };

    BrochureMutation.mutate(formattedValues, {
      onSuccess: (data) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Form submitted successfully",
          life: 3000,
        });
        setIsDialogOpen(false);
        resetForm();
      },
      onError: (error) => {
        toast.current.show({
          severity: "error",
          summary: "Submission Failed",
          detail: error.message || "Failed to submit form. Please try again.",
          life: 3000,
        });
        console.error("Error submitting form:", error);
      },
    });
  };

  return (
    <div className={`py-5 ${ProspectusStyles["container"]}`}>
      <Toast ref={toast} />
      <div className="container">
        <div className="row">
          <div className="col-md-5 mb-5 mb-md-0 overflow-y-auto">
            {/* <h3>{prospectusData[activeIndex].title}</h3> */}
            {conference?.title}
            {/* <p className={ProspectusStyles["passage"]}>
              {prospectusData[activeIndex].description}
            </p> */}
            <div
              className={ProspectusStyles["passage"]}
              dangerouslySetInnerHTML={{ __html: conference?.content || "" }}
            />
            <button
              className={ProspectusStyles["btn-download"]}
              onClick={() => setIsDialogOpen(true)}
            >
              Download Brochure
            </button>
          </div>

          <div className="col-md-7">
            <div className={`mt-3 ${ProspectusStyles["card-container"]}`}>
              {conference?.images?.map((prospectus, i) => (
                <div
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={
                    activeIndex === i
                      ? ProspectusStyles["card"]
                      : ProspectusStyles["card-active"]
                  }
                >
                  <img src={prospectus} alt="Event Image" />
                  <div className={ProspectusStyles["overlay"]}>
                    {activeIndex === i && (
                      <Link href={`/conference/${id}/registration`}>
                        <button className={ProspectusStyles["register-btn"]}>
                          GET TICKETS
                        </button>
                      </Link>
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
                            className={`form-control ${
                              meta.touched && meta.error ? "is-invalid" : ""
                            }`}
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
                            className={`form-control ${
                              meta.touched && meta.error ? "is-invalid" : ""
                            }`}
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
                            className={`form-control ${
                              meta.touched && meta.error ? "is-invalid" : ""
                            }`}
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
                    <Field name="contry">
                      {({ field, meta }) => (
                        <>
                          <input
                            type="text"
                            {...field}
                            placeholder="Enter Country"
                            className={`form-control ${
                              meta.touched && meta.error ? "is-invalid" : ""
                            }`}
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
                      Contact Number <span className="text-danger">*</span>
                    </label>
                    <Field name="mobileNumber">
                      {({ field, meta }) => (
                        <>
                          <input
                            type="text"
                            {...field}
                            placeholder="Enter Contact Number"
                            className={`form-control ${
                              meta.touched && meta.error ? "is-invalid" : ""
                            }`}
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
                      Address <span className="text-danger">*</span>{" "}
                    </label>
                    <Field name="address">
                      {({ field, meta }) => (
                        <>
                          <input
                            type="text"
                            {...field}
                            placeholder="Enter Address"
                            className={`form-control ${
                              meta.touched && meta.error ? "is-invalid" : ""
                            }`}
                          />
                          {meta.touched && meta.error && (
                            <div className="invalid-feedback">{meta.error}</div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-warning mx-3 px-5 mb-3 mb-md-0 "
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn main-btn text-white px-5"
                  >
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
