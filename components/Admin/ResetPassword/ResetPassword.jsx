"use client";
import React, { useState } from "react";
import style from "./ResetPassword.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ResetPassword() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [forgotPassword, setForgotPassword] = useState({
    resetEmail: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submited" + loginData);
  };
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
          {!isPasswordChanged ? (
            <>
              <h3 className="text-uppercase text-white">
                Create a New Password
              </h3>
              <p className="text-white text-capitalize">
                Enter a strong new password to secure your account{" "}
              </p>
              <form onSubmit={handleSubmit} noValidate className="w-50 mt-4">
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
                      placeholder="Enter New password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          [e.target.name]: e.target.value,
                        })
                      }
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
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="form-label text-white">
                    Confirm New Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={`form-control ${style["input"]} pe-5 `}
                      placeholder="Enter Confirm New Password"
                      value={loginData.password}
                      autoComplete="new-password"
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          [e.target.name]: e.target.value,
                        })
                      }
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
                </div>
                <button
                  type="submit"
                  onClick={() => setIsPasswordChanged(true)}
                  className={`p-1  text-white rounded mt-3 w-100 text-white main-btn }`}
                >
                  Reset password
                </button>
                <Link
                  href={"/admin-annex-global-conferences"}
                  className={` text-decoration-none d-block text-center text-capitalize mt-4 ${style["go-to-btn"]}`}
                  style={{ cursor: "pointer" }}
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
                className={`p-1  text-white rounded text-decoration-none d-block text-center w-50 text-capitalize mt-4 main-btn }`}
                style={{ cursor: "pointer" }}
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
