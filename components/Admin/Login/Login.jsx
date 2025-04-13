"use client";
import React, { useState } from "react";
import style from "./Login.module.css";
import Image from "next/image";
import Link from "next/link";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Password is required"),
});
const forgotPasswordSchema = Yup.object().shape({
  resetEmail: Yup.string().email("Invalid email").required("Email is required"),
});

export default function Login() {
    const [loginData,setLoginData]=useState({
        email:"",
        password:""
    });
    const [forgotPassword,setForgotPassword]=useState({
        resetEmail:"",
        
    });
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const router = useRouter();
  const BASE_URL="https://139.59.15.8:8003/api/v1"

//   const loginFormik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     validationSchema: loginSchema,
//     onSubmit: (values) => {
//       console.log("Login Submited" + values);
//     },
//   });
//   const forgotFormik = useFormik({
//     initialValues: {
//       resetEmail: "",
//     },
//     validationSchema: forgotPasswordSchema,
//     onSubmit: (values) => {
//       console.log("Reset Email Sent", values);
//     },
//   });
    const handleSubmit= async (e)=>{
            e.preventDefault();
            try {
              const response = await axios.post("/api/login", loginData);
        
              const data = response.data;     
              if (data.success) {
                router.push("/admin-annex-global-conferences/dashboard");
              } else {
                setError("Login failed. Check credentials.");
              }
            } catch (err) {
              console.error("Login error:", err);
              setError("Something went wrong.");
            }
  
    }
  return (
    <div className={`container-fluid ${style["login-container"]}`}>
      <div className="row p-5 d-flex justify-content-center align-items-center h-100">
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
                onSubmit={handleSubmit}
                noValidate
                className="w-50 mt-4"
              >
                <div className="mb-4 ">
                  <label htmlFor="username" className="form-label text-white">
                    User name / Email ID
                  </label>
                  <input
                    type="email"
                      name="username"
                    className={`form-control ${style["input"]} `}
                    id="username"
                    name="email"
                    placeholder="Enter user name or email Id"
                    value={loginData.email}
                    onChange={(e)=>(setLoginData({...loginData,[e.target.name]:e.target.value}))}
                    autoComplete="off"
                  />

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
                      className={`form-control ${style["input"]} pe-5 `}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e)=>(setLoginData({...loginData,[e.target.name]:e.target.value}))}

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
                      }}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  
                  </div>
                  <div
                    className="form-text text-white"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsForgotPasswordOpen(true)}
                  >
                    Forgot Password?
                  </div>
                </div>

                <div className="form-check">
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
                <button
                href={'/admin-annex-global-conferences/dashboard'}
                  type="submit"
                  className={`p-1 d-block text-center text-decoration-none text-white rounded mt-5 w-100 text-white main-btn }`}
                >
                  Login
                </button>
              </form>
            </>
          ) : (
            <>
              <h3 className="text-uppercase text-white">Forgot Password</h3>
              <p className="text-white text-center text-capitalize col-8">
                Please enter your email address. You will receive a link to
                create a new password via email.
              </p>
              <form className="w-50 mt-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="resetEmail" className="form-label text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${style["input"]}`}
                    id="resetEmail"
                    name="resetEmail"
                    value={forgotPassword.resetEmail}
                    placeholder="Enter Your Email ID"
                    onChange={(e)=>setForgotPassword({...forgotPassword,[e.target.name]:e.target.value})}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`p-1  text-white rounded mt-3 w-100 text-white main-btn }`}
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
