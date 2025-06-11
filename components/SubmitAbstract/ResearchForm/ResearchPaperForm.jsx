"use client";
import React, { useRef } from "react";
import styles from "./ResearchPaperForm.module.css";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "next/navigation";
import { Toast } from "primereact/toast";
import { useResearchForm, useUploadPdf } from "@/hooks/useWeather";
import { useMutation } from "@tanstack/react-query";

const ResearchPaperForm = ({abstract,conferenceName}) => {
  const toast = useRef(null);
  const researchFormMutation = useResearchForm();
  const uploadPdfMutation = useUploadPdf();
  const params = useParams();
  // const conferenceName = params?.slug;
  const formik = useFormik({
    initialValues: {
      conference: conferenceName || "",
      firstName: "",
      lastName: "",
      email: "",
      alternateEmail: "",
      country: "",
      mobileNumber: "",
      affiliation: "",
      title: "",
      address: "",
      addonName: "",
      addonEmail: "",
      addonMobileNumber: "",
      attachFiles: [], // <-- string here
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      country: Yup.string().required("Country is required"),
      mobileNumber: Yup.string().required("Mobile Number is required"),
      affiliation: Yup.string().required("Affiliation is required"),
      title: Yup.string().required("Title is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Normalize primary mobile number
        let normalizedMobile = values.mobileNumber
          .trim()
          .replace(/[\s\-().]/g, "");
        if (normalizedMobile.startsWith("+91"))
          normalizedMobile = normalizedMobile.slice(3);
        else if (normalizedMobile.startsWith("0"))
          normalizedMobile = normalizedMobile.slice(1);
        normalizedMobile = "+91" + normalizedMobile;

        // Normalize addon mobile number if present
        let normalizedAddonMobile = values.addonMobileNumber
          ? values.addonMobileNumber.trim().replace(/[\s\-().]/g, "")
          : "";
        if (normalizedAddonMobile.startsWith("+91"))
          normalizedAddonMobile = normalizedAddonMobile.slice(3);
        else if (normalizedAddonMobile.startsWith("0"))
          normalizedAddonMobile = normalizedAddonMobile.slice(1);
        if (normalizedAddonMobile)
          normalizedAddonMobile = "+91" + normalizedAddonMobile;

        // Upload files as before
        let attachFilesString = "";
        if (values.attachFiles && values.attachFiles.length > 0) {
          const formData = new FormData();
          values.attachFiles.forEach((file) => {
            formData.append("file", file);
          });

          const response = await uploadPdfMutation.mutateAsync(formData);
          const urls = response?.detail?.message?.map((item) => item.url) || [];
          attachFilesString = urls.join(",");
        }

        // Final submission data
        const submissionData = {
          ...values,
          mobileNumber: normalizedMobile,
          addonMobileNumber: normalizedAddonMobile,
          attachFiles: attachFilesString,
        };

        researchFormMutation.mutate(submissionData, {
          onSuccess: () => {
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "Form submitted successfully",
              life: 3000,
            });
            formik.resetForm({ values: formik.initialValues });
          },
          onError: (error) => {
            toast.current.show({
              severity: "error",
              summary: "Submission Failed",
              detail:
                error.message || "Failed to submit form. Please try again.",
              life: 3000,
            });

            console.error("Error submitting form:", error);
          },
        });
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Upload Failed",
          detail: error.message || "Failed to upload files. Please try again.",
          life: 3000,
        });

        console.error("PDF upload failed:", error);
      }
    },
  });

  const onDrop = (acceptedFiles) => {
    formik.setFieldValue("attachFiles", acceptedFiles);
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
      <Toast ref={toast} />
      <div className={styles.downloadSection}>
      
       { abstract &&<button className={styles.downloadButton}>
          DOWNLOAD THE SAMPLE ABSTRACT HERE{" "}
          <a href={abstract} target="_blank"  className={styles.downloadLink}>Download</a>
        </button>}
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
                className={`form-control ${
                  styles.inputField
                } ${getValidationClass("firstName")}`}
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
                className={`form-control ${
                  styles.inputField
                } ${getValidationClass("lastName")}`}
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
                className={`form-control ${
                  styles.inputField
                } ${getValidationClass("email")}`}
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
                value={formik.values.alternateEmail}
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
                className={`form-control ${
                  styles.inputField
                } ${getValidationClass("country")}`}
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
                name="mobileNumber"
                className={`form-control ${
                  styles.inputField
                } ${getValidationClass("mobileNumber")}`}
                placeholder="Enter Contact Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobileNumber}
              />
              <div className="invalid-feedback">
                {formik.errors.mobileNumber}
              </div>
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
                className={`form-control ${
                  styles.inputField
                } ${getValidationClass("affiliation")}`}
                placeholder="Enter Affiliation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.affiliation}
              />
              <div className="invalid-feedback">
                {formik.errors.affiliation}
              </div>
            </div>

            <div className="col-md-6 mb-2">
              <label className={styles.label}>
                Title of the Abstract <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="title"
                className={`form-control ${
                  styles.inputField
                } ${getValidationClass("title")}`}
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
                value={formik.values.address}
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
                value={formik.values.addonName}
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
                value={formik.values.addonEmail}
                className={`form-control ${styles.inputField}`}
                placeholder="Enter Addon Email"
                onChange={formik.handleChange}
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className={styles.label}>Addon Contact Number</label>
              <input
                type="text"
                name="addonMobileNumber"
                value={formik.values.addonMobileNumber}
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
              {formik.values.attachFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={styles.submitButton}
          >
            {formik.isSubmitting ? (
              <>
                <i
                  className="pi pi-spin pi-spinner"
                  style={{ marginRight: "0.5em" }}
                ></i>
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResearchPaperForm;
