"use client";
import React, { useRef } from "react";
import styles from "./BroucherForm.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useParams } from "next/navigation";
import { Toast } from "primereact/toast";
import { useBrochure } from "@/hooks/useWeather";
const BroucherForm = ({brochure,conferenceName}) => {
  const toast = useRef(null);
  const BrochureMutation = useBrochure();

  const params = useParams();
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
        handleDownloadPdf()
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
 const handleDownloadPdf = () => {
    const pdfLink = brochure; 
    const suggestedFileName = "document.pdf";
      window.open(pdfLink, '_blank');
    // const link = document.createElement('a');
    // link.href = pdfLink;
    // link.setAttribute('download', suggestedFileName);
    // document.body.appendChild(link); 
    // link.click(); 
    // document.body.removeChild(link);
  };


  return (
    <div className={styles.wrapper}>
      <Toast ref={toast} />
           
      {brochure ?
      <>
      <div className={styles.downloadSection}>
        <button className={styles.downloadButton}>
         Fill Form to Download Brochure
        
        </button>
      </div>
       <div className={`card ${styles.formCard}`}>
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
                        type="submit"
                        className="brand-btn text-white px-5"
                        
                      >
                        Download Brochure
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
      </div>
      </>
     :<div className="text-center fw-bold container">No Broucher Found</div>}
    </div>
  );
};

export default BroucherForm;
