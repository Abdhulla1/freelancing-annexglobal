"use client";
import React, { useRef, useState } from "react";
import style from "./ResetPassword.module.css";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { restPassword } from "@/service/adminConference";
// PrimeReact CSS assumed to be globally imported
// e.g., import 'primereact/resources/themes/saga-blue/theme.css';

export default function ResetPassword({ securityKey }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm your password"),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          actionType: "Send",
          email: "",
          password: values.confirmPassword,
          securityKey: securityKey,
        };
        // Replace with your actual API endpoint for forgot password
        const response = await restPassword(payload);
        const data = response.data;

        if (data.status === 200) {
          setIsPasswordChanged(true);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Password reset successfully!",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Request Failed",
            detail: data.message || "Failed to Reset. Please try again.",
            life: 3000,
          });
        }
      } catch (err) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err.message || "Something went wrong while requesting password reset.",
          life: 3000,
        });
      }
    },
  });

  return (
    <div className={`container-fluid ${style["login-container"]}`}>
      <Toast ref={toast} />
      <div className="row p-5 d-flex justify-content-center align-items-center vh-100">
        <div className="container col-12 col-md-6 d-flex justify-content-center align-items-center flex-column">
          <Image
            src={"/icons/annex-global-logo.png"}
            height={50}
            width={50}
            quality={100}
            alt="annex logo"
          />
          <h3 className="text-uppercase text-white mt-4 mb-4">
            annex global conferences
          </h3>
          <p className="text-white lead col-md-8 text-center text-capitalize">
            “Exploring New Realms, Challenging Constraints, Fostering
            Collaboration”
          </p>
          <Link
            href={"/"}
            className={` text-decoration-none text-capitalize ${style["go-to-btn"]}`}
          >
            <span className="fs-4">←</span> Go To website
          </Link>
        </div>

        <div
          className={`container-fluid col-12 col-md-6 d-flex justify-content-center align-items-center flex-column ${style["login-form-container"]}`}
        >
          {!isPasswordChanged ? (
            <>
              <h3 className="text-uppercase text-white">
                Create a New Password
              </h3>
              <p className="text-white text-capitalize">
                Enter a strong new password to secure your account
              </p>
              <form
                onSubmit={formik.handleSubmit}
                className="w-50 mt-4"
                noValidate
              >
                {/* New Password */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label text-white">
                    New Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      autoComplete="new-password"
                      className={`form-control ${style["input"]} pe-5 `}
                      placeholder="Enter New Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <i
                      className={`pi ${
                        showPassword ? "pi-eye-slash" : "pi-eye"
                      } text-gray position-absolute`}
                      style={{
                        top: "50%",
                        right: "15px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        zIndex: 2,
                      }}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <small className="text-danger d-block mt-1">
                      {formik.errors.password}
                    </small>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-2">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label text-white"
                  >
                    Confirm New Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="new-password"
                      className={`form-control ${style["input"]} pe-5 `}
                      placeholder="Enter Confirm New Password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <i
                      className={`pi ${
                        showPassword ? "pi-eye-slash" : "pi-eye"
                      } text-gray position-absolute`}
                      style={{
                        top: "50%",
                        right: "15px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        zIndex: 2,
                      }}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  </div>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <small className="text-danger d-block mt-1">
                        {formik.errors.confirmPassword}
                      </small>
                    )}
                </div>

                <button
                  type="submit"
                  className={`p-1 text-white rounded mt-3 w-100 main-btn`}
                >
                  Reset password
                </button>

                <Link
                  href={"/admin-annex-global-conferences"}
                  className={` text-decoration-none d-block text-center text-capitalize mt-4 ${style["go-to-btn"]}`}
                >
                  ← Back to Login
                </Link>
              </form>
            </>
          ) : (
            <>
              <Image
                src={"/icons/checkmark.png"}
                height={50}
                width={50}
                quality={100}
                alt="annex logo"
              />
              <p className="text-white text-center text-capitalize mt-4 col-10">
                Congratulations! Your password has been reset successfully. Log
                in now to continue managing your conferences.
              </p>
              <Link
                href={"/admin-annex-global-conferences"}
                className={`p-1 text-white rounded text-decoration-none d-block text-center w-50 text-capitalize mt-4 main-btn`}
              >
                Go to Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
