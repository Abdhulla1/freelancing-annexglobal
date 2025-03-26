'use client';
import React, { useState } from "react";
import styles from "./ResearchPaperForm.module.css";
import { useDropzone } from "react-dropzone";

const ResearchPaperForm = () => {
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDrop = (acceptedFiles) => {
    setFormData({ ...formData, files: acceptedFiles });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={` ${styles.wrapper}`}>
      <div className={styles.downloadSection}>
        <button className={styles.downloadButton}>
          DOWNLOAD THE SAMPLE ABSTRACT HERE <span className={styles.downloadLink}>Download</span>
        </button>
      </div>

      <div className={`card  ${styles.formCard}`}>
        <h3 className="mb-4 mt-5 text-left">Submit Your Research Paper</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* First Name */}
            <div className="col-md-6">
              <label className={styles.label}>First Name *</label>
              <input
                type="text"
                name="firstName"
                className={`form-control ${styles.inputField}`}
                placeholder="Enter First Name"
                onChange={handleChange}
                required
              />
            </div>
            {/* Last Name */}
            <div className="col-md-6">
              <label className={styles.label}>Last Name *</label>
              <input
                type="text"
                name="lastName"
                className={`form-control ${styles.inputField}`}
                placeholder="Enter Last Name"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            {/* Email */}
            <div className="col-md-6">
              <label className={styles.label}>Email ID *</label>
              <input
                type="email"
                name="email"
                className={`form-control ${styles.inputField}`}
                placeholder="Enter Email ID"
                onChange={handleChange}
                required
              />
            </div>
            {/* Alternate Email */}
            <div className="col-md-6">
              <label className={styles.label}>Alternate Email</label>
              <input
                type="email"
                name="alternateEmail"
                className={`form-control ${styles.inputField}`}
                placeholder="Enter Alternate Email"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            {/* Country */}
            <div className="col-md-6">
              <label className={styles.label}>Country *</label>
              <input
                type="text"
                name="country"
                className={`form-control ${styles.inputField}`}
                placeholder="Enter Country"
                onChange={handleChange}
                required
              />
            </div>
            {/* Contact Number */}
            <div className="col-md-6">
              <label className={styles.label}>Contact Number *</label>
              <input
                type="text"
                name="contactNumber"
                className={`form-control ${styles.inputField}`}
                placeholder="Enter Contact Number"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            {/* Affiliation */}
            <div className="col-md-6">
              <label className={styles.label}>Affiliation *</label>
              <input
                type="text"
                name="affiliation"
                className={`form-control ${styles.inputField}`}
                placeholder="Enter Affiliation"
                onChange={handleChange}
                required
              />
            </div>
            {/* Title of Abstract */}
            <div className="col-md-6">
              <label className={styles.label}>Title of the Abstract *</label>
              <input
                type="text"
                name="title"
                className={`form-control ${styles.inputField}`}
                placeholder="Enter Title"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Additional Fields */}
          <div className="row">
            <div className="col-md-6">
              <label className={styles.label}>Addon Name</label>
              <input type="text" name="addonName" className={`form-control ${styles.inputField}`} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className={styles.label}>Addon Email</label>
              <input type="email" name="addonEmail" className={`form-control ${styles.inputField}`} onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label className={styles.label}>Addon Contact Number</label>
              <input type="text" name="addonContactNumber" className={`form-control ${styles.inputField}`} onChange={handleChange} />
            </div>
          </div>

          {/* File Upload */}
          {/* File Upload Section */}
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
              {formData.files.map((file, index) => (
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
