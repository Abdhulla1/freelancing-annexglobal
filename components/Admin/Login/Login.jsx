"use client";
import React, { useState, useRef, useEffect } from "react";
import style from "./Login.module.css";
import Image from "next/image";
import Link from "next/link";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { restPasswordLink } from "@/service/adminConference";
const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const forgotPasswordSchema = Yup.object({
  resetEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const router = useRouter();
  const toast = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setButtonLoading(true);
        const response = await axios.post("/api/login", values);
        const data = response.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);

        if (data.success) {
          router.push("/admin-annex-global-conferences/dashboard");
        } else {
          toast.current.show({
            severity: "error",
            summary: "Login Failed",
            detail: data.message || "Login failed.",
            life: 3000,
          });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Login Error",
          detail:
            error.response?.data?.message ||
            "Something went wrong during login.",
          life: 3000,
        });
      } finally {
        setButtonLoading(false);
      }
    },
  });

  const forgotFormik = useFormik({
    initialValues: {
      resetEmail: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          actionType: "Send",
          email: values.resetEmail,
        };
        // Replace with your actual API endpoint for forgot password
        const response = await restPasswordLink(payload);
        const data = response.data;

        if (data.status === 200) {
          toast.current.show({
            severity: "warning",
            summary: "Reset Link Sent",
            detail: data?.detail[0].msg || "Please check your email for the password reset link.",
            life: 3000,
          });
          setIsForgotPasswordOpen(false);
        } else {
          toast.current.show({
            severity: "error",
            summary: "Request Failed",
            detail:
              data.message || "Failed to send reset link. Please try again.",
            life: 3000,
          });
        }
      } catch (err) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Something went wrong while requesting password reset.",
          life: 3000,
        });
      }
    },
  });

  useEffect(() => {
    if (loginFormik.values.password.length > 0) {
      setPasswordVisible(true);
    } else {
      setPasswordVisible(false);
    }
  }, [loginFormik.values.password]);

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
          {!isForgotPasswordOpen ? (
            <>
              <h3 className="text-uppercase text-white">Login</h3>
              <p className="text-white text-capitalize">
                Enter your credentials to access the admin panel
              </p>
              <form
                onSubmit={loginFormik.handleSubmit}
                noValidate
                className="w-50 mt-4"
              >
                <div className="mb-4 ">
                  <label htmlFor="email" className="form-label text-white">
                    User name / Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${style["input"]}`}
                    id="email"
                    placeholder="Enter user name or email Id"
                    value={loginFormik.values.email}
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    autoComplete="off"
                  />
                  {loginFormik.touched.email && loginFormik.errors.email && (
                    <div className="text-danger">
                      {loginFormik.errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label text-white">
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={`form-control ${style["input"]} pe-5`}
                      placeholder="Enter your password"
                      value={loginFormik.values.password}
                      onChange={loginFormik.handleChange}
                      onBlur={loginFormik.handleBlur}
                    />
                    {passwordVisible && (
                      <i
                        className={`pi ${
                          showPassword ? "pi-eye-slash" : "pi-eye"
                        } text-gray position-absolute`}
                        style={{
                          top: "50%",
                          right: "15px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    )}
                    {loginFormik.touched.password &&
                      loginFormik.errors.password && (
                        <div className="text-danger">
                          {loginFormik.errors.password}
                        </div>
                      )}
                  </div>
                  <div
                    className="form-text text-white"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsForgotPasswordOpen(true)}
                  >
                    Forgot Password?
                  </div>
                </div>

                {/* <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className={`form-check-input ${style["checkbox"]}`}
                                        id="rememberMe"
                                    />
                                    <label
                                        className="form-check-label text-white"
                                        htmlFor="rememberMe"
                                    >
                                        Remember me
                                    </label>
                                </div>
             */}
                <Button
                  label="Login"
                  type="submit"
                  className={`p-1 d-block text-center text-decoration-none text-white rounded mt-5 w-100 text-white main-btn }`}
                  loading={buttonLoading}
                  disabled={loginFormik.isSubmitting || !loginFormik.isValid}
                  style={{ outline: "none", boxShadow: "none" }}
                />
              </form>
            </>
          ) : (
            <>
              <h3 className="text-uppercase text-white">Forgot Password</h3>
              <p className="text-white text-center text-capitalize col-8">
                Please enter your email address. You will receive a link to
                create a new password via email.
              </p>
              <form className="w-50 mt-4" onSubmit={forgotFormik.handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="resetEmail" className="form-label text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${style["input"]}`}
                    id="resetEmail"
                    name="resetEmail"
                    value={forgotFormik.values.resetEmail}
                    placeholder="Enter Your Email ID"
                    onChange={forgotFormik.handleChange}
                    onBlur={forgotFormik.handleBlur}
                    required
                  />
                  {forgotFormik.touched.resetEmail &&
                    forgotFormik.errors.resetEmail && (
                      <div className="text-danger">
                        {forgotFormik.errors.resetEmail}
                      </div>
                    )}
                </div>
                <button
                  type="submit"
                  className={`p-1  text-white rounded mt-3 w-100 text-white main-btn }`}
                  disabled={forgotFormik.isSubmitting || !forgotFormik.isValid}
                >
                  Send Reset Link
                </button>
                <div
                  className={` text-decoration-none text-center text-capitalize mt-4 ${style["go-to-btn"]}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsForgotPasswordOpen(false)}
                >
                  ← Back to Login
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
