"use client";
import React from "react";
import styles from "./ResearchPaperForm.module.css";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";

const ResearchPaperForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      alternateEmail: "",
      country: "",
      contactNumber: "",
      affiliation: "",
      title: "",
      address: "",
      addonName: "",
      addonEmail: "",
      addonContactNumber: "",
      files: [],
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      country: Yup.string().required("Country is required"),
      contactNumber: Yup.string().required("Contact Number is required"),
      affiliation: Yup.string().required("Affiliation is required"),
      title: Yup.string().required("Title is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onDrop = (acceptedFiles) => {
    formik.setFieldValue("files", acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const getValidationClass = (field) =>
    formik.touched[field] && formik.errors[field]
      ? "is-invalid"
      : formik.touched[field];

  return (
    <div className={styles.wrapper}>
      <div className={styles.downloadSection}>
        <button className={styles.downloadButton}>
          DOWNLOAD THE SAMPLE ABSTRACT HERE{" "}
          <span className={styles.downloadLink}>Download</span>
        </button>
      </div>

      <div className={`card ${styles.formCard}`}>
        <h3 className="mb-4 mt-5 text-left">Submit Your Research Paper</h3>
        <form onSubmit={formik.handleSubmit}>
          {/* First and Last Name */}
          <div className="row">
            <div className="col-md-6 mb-2">
              <label className={styles.label}>
                First Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                className={`form-control ${styles.inputField} ${getValidationClass("firstName")}`}
                placeholder="Enter First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              <div className="invalid-feedback">{formik.errors.firstName}</div>
            </div>

            <div className="col-md-6 mb-2">
              <label className={styles.label}>
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                className={`form-control ${styles.inputField} ${getValidationClass("lastName")}`}
                placeholder="Enter Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              <div className="invalid-feedback">{formik.errors.lastName}</div>
            </div>
          </div>

          {/* Email and Alternate Email */}
          <div className="row">
            <div className="col-md-6 mb-2">
              <label className={styles.label}>
                Email ID <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="email"
                className={`form-control ${styles.inputField} ${getValidationClass("email")}`}
                placeholder="Enter Email ID"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <div className="invalid-feedback">{formik.errors.email}</div>
            </div>

            <div className="col-md-6 mb-2">
              <label className={styles.label}>Alternate Email</label>
              <input
                type="email"
                name="alternateEmail"
                className={`form-control ${styles.inputField}`}
                placeholder="Enter Alternate Email"
                onChange={formik.handleChange}
              />
            </div>
          </div>

          {/* Country and Contact */}
          <div className="row">
            <div className="col-md-6 mb-2">
              <label className={styles.label}>
                Country <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="country"
                className={`form-control ${styles.inputField} ${getValidationClass("country")}`}
                placeholder="Enter Country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
              />
              <div className="invalid-feedback">{formik.errors.country}</div>
            </div>

            <div className="col-md-6 mb-2">
              <label className={styles.label}>
                Contact Number <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="contactNumber"
                className={`form-control ${styles.inputField} ${getValidationClass("contactNumber")}`}
                placeholder="Enter Contact Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contactNumber}
              />
              <div className="invalid-feedback">{formik.errors.contactNumber}</div>
            </div>
          </div>

          {/* Affiliation and Title */}
          <div className="row">
            <div className="col-md-6 mb-2">
              <label className={styles.label}>
                Affiliation <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="affiliation"
                className={`form-control ${styles.inputField} ${getValidationClass("affiliation")}`}
                placeholder="Enter Affiliation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.affiliation}
              />
              <div className="invalid-feedback">{formik.errors.affiliation}</div>
            </div>

            <div className="col-md-6 mb-2">
              <label className={styles.label}>
                Title of the Abstract <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="title"
                className={`form-control ${styles.inputField} ${getValidationClass("title")}`}
                placeholder="Enter Title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              <div className="invalid-feedback">{formik.errors.title}</div>
            </div>
          </div>

          {/* Optional Fields */}
          <div className="row">
            <div className="col-md-6 mb-2">
              <label className={styles.label}>Address</label>
              <input
                type="text"
                name="address"
                className={`form-control ${styles.inputField}`}
                placeholder="Enter Address"
                onChange={formik.handleChange}
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className={styles.label}>Addon Name</label>
              <input
                type="text"
                name="addonName"
                className={`form-control ${styles.inputField}`}
                placeholder="Enter Addon Name"
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-2">
              <label className={styles.label}>Addon Email</label>
              <input
                type="email"
                name="addonEmail"
                className={`form-control ${styles.inputField}`}
                placeholder="Enter Addon Email"
                onChange={formik.handleChange}
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className={styles.label}>Addon Contact Number</label>
              <input
                type="text"
                name="addonContactNumber"
                className={`form-control ${styles.inputField}`}
                placeholder="Enter Addon Contact Number"
                onChange={formik.handleChange}
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-3">
            <label className={styles.label}>Attach Files</label>
            <div {...getRootProps()} className={styles.uploadBox}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here...</p>
              ) : (
                <p>Click or Drag a file to this area to upload</p>
              )}
            </div>
            <ul>
              {formik.values.files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            Submit →
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResearchPaperForm;
