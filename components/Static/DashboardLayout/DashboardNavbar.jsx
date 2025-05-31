"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./DashboardNavbar.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { changePassword } from "@/service/adminService";
import { Avatar } from "primereact/avatar";
import { Toast } from "primereact/toast";
export default function DashboardNavbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const dropdownRef = useRef(null);
  const toast = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      // Redirect to login after logout
      router.push("/admin-annex-global-conferences");
    } catch (error) {
      toast.current.show({
            severity: "error",
            summary: "Delete Failed",
            detail:"Logout failed.",
            life: 3000,
          });
    }
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      handleLogout();
    }else{
      setId(id);
    }
  }, []);

  const [showDialog, setShowDialog] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitForm, setSubmitForm] = useState(null);

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSubmitForm(null);
    setIsFormValid(false);
  };

  const handleSubmit = async (values) => {
     const data = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };

       try {
          const res=await changePassword(data,id);
          if (res.status=== 200) {
          toast.current.show({
            severity: "success",
            summary: "Password Changed",
            detail: "Password Changed successfully.",
            life: 3000,
          });
             handleLogout();
        }else{
          toast.current.show({
            severity: "error",
            summary: "Failed to Change the Password",
            detail: res.data?.detail?.[0]?.msg|| "Could not Change. Try again.",
            life: 3000,
          });
        }
        
        } catch (error) {
          toast.current.show({
            severity: "error",
            summary: "Failed to Change the Password",
            detail: error.message || "Could not Change. Try again.",
            life: 3000,
          });
        }finally{
              handleCloseDialog();
        }
  };

  return (
    <nav className={`navbar navbar-expand-md ${styles["navbar-wrapper"]}`}>
            <Toast ref={toast} />
      
      <Dialog
        header="Change Password"
        visible={showDialog}
        style={{ width: "500px" }}
        onHide={handleCloseDialog} // optional close on mask click or header close icon
      >
        <ChangePasswordForm
          onValidChange={setIsFormValid}
          onSubmit={handleSubmit}
          setSubmitForm={setSubmitForm}
          onCancel={handleCloseDialog}
        />
      </Dialog>

      <div className="container-fluid ">
        <Link
          href="#"
          className="d-flex align-items-center text-decoration-none text-white"
        >
          <Image
            src="/icons/annex-global-logo.png"
            height={30}
            width={30}
            quality={100}
            alt="annex logo"
            className="me-2"
          />
          <span className={`fw-bold ${styles["logo-text"]}`}>
            Annex Global Conferences
          </span>
        </Link>

        <div className="d-flex align-items-center gap-3 gap-md-5 flex-grow-1 justify-content-end ">
          <div className="position-relative" ref={dropdownRef}>
            <div
              className={styles["rounded-avatar"]}
              onClick={() => setOpen(!open)}
              style={{ cursor: "pointer" }}
            >
              {/* <Image
                height={36}
                width={36}
                src="/icons/avatar.jpg"
                alt="profile"
              /> */}
              <Avatar icon="pi pi-user"/>
            </div>

            {open && (
              <div className={styles["dropdown-menu-custom"] + " shadow p-3"}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <div className={styles["rounded-avatar"]}>
                    {/* <Image
                      height={36}
                      width={36}
                      src="/icons/avatar.jpg"
                      alt="profile"
                    /> */}
                        <Avatar icon="pi pi-user"/>
                  </div>
                  <div className="fw-semibold">Annexglobalconference</div>
                </div>
                <hr className="my-2" />
                <div
                  className={styles["dropdown-item-custom"]}
                  onClick={handleOpenDialog}
                >
                  <i className="bx bx-cog me-2" />
                  Change Password
                </div>
                <hr className="my-2" />
                <div
                  className={styles["dropdown-item-custom"]}
                  onClick={handleLogout}
                >
                  <i className="bx bx-log-out me-2" />
                  Log Out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
function ChangePasswordForm({
  onValidChange,
  onSubmit,
  setSubmitForm,
  onCancel,
}) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={onSubmit}
    >
      {({ isValid, submitForm }) => {
        useEffect(() => {
          onValidChange(isValid);
        }, [isValid]);

        useEffect(() => {
          setSubmitForm(() => submitForm);
        }, [submitForm]);

        return (
          <Form className="d-flex flex-column gap-3">
            {/* Current Password */}
            <div>
              <label className="form-label">Current Password*</label>
              <div className="input-group">
                <Field
                  name="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  className="form-control"
                />
                <span
                  className="input-group-text bg-white"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  <i
                    className={`bx ${showCurrent ? "bx-hide" : "bx-show"}`}
                  ></i>
                </span>
              </div>
              <ErrorMessage
                name="currentPassword"
                component="div"
                className="text-danger"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="form-label">New Password*</label>
              <div className="input-group">
                <Field
                  name="newPassword"
                  type={showNew ? "text" : "password"}
                  className="form-control"
                />
                <span
                  className="input-group-text bg-white"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowNew(!showNew)}
                >
                  <i className={`bx ${showNew ? "bx-hide" : "bx-show"}`}></i>
                </span>
              </div>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="form-label">Confirm New Password*</label>
              <div className="input-group">
                <Field
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  className="form-control"
                />
                <span
                  className="input-group-text bg-white"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  <i
                    className={`bx ${showConfirm ? "bx-hide" : "bx-show"}`}
                  ></i>
                </span>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-warning text-white"
                disabled={!isValid}
              >
                Save
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
