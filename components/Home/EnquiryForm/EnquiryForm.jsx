"use client";
import React, { useRef } from "react";
import EnquiryStyles from "./EnquiryForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNewsLetter } from "@/hooks/useWeather";
import { useConferenceNames } from "@/hooks/useWeather";
import { Toast } from "primereact/toast";
import { useMutation } from "@tanstack/react-query";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  comment: Yup.string()
    .min(10, "Must be at least 10 characters")
    .required("Message is required"),
  conference: Yup.string().required("Conference is required"),
});

const EnquiryForm = () => {
  const toast = useRef(null);
  const newsLetterMutation = useNewsLetter();
  const { data: conferenceNames } = useConferenceNames();
  const conferneceData = conferenceNames?.detail?.names || [];

  return (
    <div className={` ${EnquiryStyles["enquiry-container"]}`}>
    <Toast ref={toast} />
      <div className={`container`}>
        <h3 className="text-center text-white fw-bold ">
          Never Miss an Update
        </h3>
        <p className="text-capitalize text-center text-white">
          Could you provide more details about the newsletter's theme or purpose
        </p>
        <div className="mt-4">
          <Formik
            initialValues={{ name: "", email: "", comment: "", conference: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              newsLetterMutation.mutate(values, {
                onSuccess: (data) => {
                  toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Form submitted successfully",
                    life: 3000,
                  });
                  resetForm();
                },

                onError: (error) => {
                  toast.current.show({
                    severity: "error",
                    summary: "Submission Failed",
                    detail:
                      error.message ||
                      "Failed to submit form. Please try again.",
                    life: 3000,
                  });
                  console.error("Error submitting form:", error);
                },
              });
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
                    Conference Name
                  </label>
                  <Field
                    as="select"
                    name="conference"
                    className="form-control"
                    required
                  >
                    <option value="" disabled>
                      Select Conference
                    </option>
                    {conferneceData.map((conference, i) => (
                      <option key={i} value={conference}>
                        {conference}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="conference"
                    component="div"
                    className="text-danger mt-2 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white mb-2 font-semibold">
                    Comment
                  </label>
                  <br />
                  <Field
                    as="textarea"
                    name="comment"
                    rows="4"
                    placeholder="Enter Comment"
                    className="border p-2 form-control rounded"
                  />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className="text-danger mt-2 text-sm"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="brand-btn d-flex align-items-center fw-bold"
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
    </div>
  );
};

export default EnquiryForm;
