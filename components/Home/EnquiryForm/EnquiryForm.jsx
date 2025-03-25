"use client";
import React from "react";
import EnquiryStyles from "./EnquiryForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  event: Yup.string().required("Please select an event"),
  message: Yup.string()
    .min(10, "Must be at least 10 characters")
    .required("Message is required"),
});

const EnquiryForm = () => {
  return (
    <div className={EnquiryStyles["enquiry-container"]}>
      <h3 className="text-center text-white">Never Miss an Update</h3>
      <p className="text-capitalize text-center text-white">
        Could you provide more details about the newsletter's theme or purpose
      </p>
      <div className="mt-4">
        <Formik
          initialValues={{ name: "", email: "", event: "", message: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Form Data:", values);
            alert("Form Submitted Successfully!");
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="p-4 mx-auto col-md-5 col-sm-8 col-12 rounded-lg shadow-md ">
              <div className="mb-4">
                <label className="block text-white mb-2 font-semibold">
                  Name
                </label>
                <br />
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  className="border p-2 form-control rounded"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger mt-2 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2 font-semibold">
                  Email ID
                </label>
                <br />
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Email Id"
                  className="border p-2 form-control rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger mt-2 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2 font-semibold">
                  Events
                </label>
                <br />
                <Field
                  as="select"
                  name="event"
                  className="border p-2 form-control rounded"
                >
                  <option value="">Select events</option>
                  <option value="conference">Conference</option>
                  <option value="workshop">Workshop</option>
                  <option value="webinar">Webinar</option>
                </Field>
                <ErrorMessage
                  name="event"
                  component="div"
                  className="text-danger mt-2 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2 font-semibold">
                  How Can We Help?
                </label>
                <br />
                <Field
                  as="textarea"
                  name="message"
                  rows="4"
                  placeholder="Enter message"
                  className="border p-2 form-control rounded"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-danger mt-2 text-sm"
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="brand-btn d-flex align-items-center"
                >
                  {isSubmitting ? "Please Wait..." : "Subscribe"} &nbsp;
                  <i className="pi-arrow-right pi"></i>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EnquiryForm;
