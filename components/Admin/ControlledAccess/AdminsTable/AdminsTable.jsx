"use client";
import React, { useEffect, useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Sidebar } from "primereact/sidebar";
import { ProgressSpinner } from "primereact/progressspinner";
import "./style.css";
import { fetchAdmins, createAdmin } from "@/service/adminService";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AdminsTable() {
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [adminsData, setAdminsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to track errors
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      expiringIn: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 characters").required("Required"),
      expiringIn: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await createAdmin(values); // Call your service
        setVisibleDetails(false); // Close sidebar
        resetForm(); // Clear form
      } catch (error) {
        console.error("Error creating admin:", error);
      }
    },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAdmins();
        setAdminsData(data);
        setLoading(false);
        setError(null); // Reset error if data is fetched successfully
      } catch (error) {
        setLoading(false);
        setError("Failed to fetch admins. Please try again later.");
        console.error("Failed to fetch admins:", error);
      }
    };
    loadData();
  }, []);

  const confirmReset = () => {
    const accept = () => {
      console.log("accepted");
    };
    const reject = () => {
      console.log("rejected");
    };
    confirmDialog({
      message:
        "Resetting the user will delete all of their restrictions, Confirm?",
      acceptLabel: "OK",
      rejectLabel: "Cancel",
      acceptClassName: "btn px-5 btn-warning text-white shadow-none",
      rejectClassName: "btn px-5 bg-white border me-3 shadow-none",
      defaultFocus: "accept",
      accept,
      reject,
      className: "custom-confirm-dialog",
    });
  };

  return (
    <div className="table-responsive">
      <Sidebar
        visible={visibleDetails}
        header={<h5 className="text-black">Add New Administrator</h5>}
        position="right"
        dismissable={false}
        onHide={() => setVisibleDetails(false)}
        className="custom-sidebar"
      >
        <div className="d-flex flex-column justify-content-between k h-100">
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="username" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="username"
                placeholder="Enter Email"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="emailPassword" className="form-label">
                Password
              </label>
              <div className="d-flex gap-2">
                <input
                  type="email"
                  name="emailPassword"
                  className="form-control"
                  id="emailPassword"
                  placeholder="Enter Email"
                  autoComplete="off"
                />
                <button className="btn btn-outline-warning px-3">
                  Generate
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="expiring" className="form-label">
                Expiring In
              </label>
              <select id="expiring" className="form-select no-outline">
                <option value={""}>Select Expiring</option>
                <option value={"1hr"}>One hour</option>
                <option value={"2hr"}>Two hour</option>
                <option value={"3hr"}>Three hour</option>
                <option value={"4hr"}>Four hour</option>
              </select>
            </div>
          </div>
          <div className="bg-secondary bg-opacity-10 p-2 d-flex justify-content-center align-items-center gap-3 w-100">
            <button
              className="btn px-5 bg-white border"
              onClick={() => setVisibleDetails(false)}
            >
              Close
            </button>
            <button className="btn px-5 btn-warning text-white">Add</button>
          </div>
        </div>
      </Sidebar>

      <ConfirmDialog draggable={false} />

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="5"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <table className="tabel w-100">
          <thead>
            <tr>
              <td className="p-2 table-heading">ID</td>
              <td className="p-2 table-heading">Email ID</td>
              <td className="p-2 table-heading">Expiring In</td>
              <td className="p-2 table-heading text-nowrap">Last Logged In</td>
              <td className="p-2 table-heading">Status</td>
              <td className="p-2 table-heading">Action</td>
            </tr>
          </thead>

          <tbody>
            {adminsData.map((element, i) => (
              <tr key={i}>
                <td className="p-3 table-data">{i + 1}</td>
                <td className="p-3 text-nowrap table-data">{element.email}</td>
                <td className="p-3 text-nowrap table-data">
                  {element.expiringIn}
                </td>
                <td className="p-3 text-nowrap table-data">
                  {element.lastLoggedIn}
                </td>
                <td
                  className={`p-3 text-nowrap table-data ${
                    element.status === "Active" ? "text-success" : "text-danger"
                  }`}
                >
                  {element.status}
                </td>

                <td className="p-3 table-data d-flex gap-1">
                  <button className="btn btn-outline-secondary rounded">
                    <i className="bx bx-edit-alt"></i>
                  </button>
                  <button className="btn btn-outline-secondary rounded">
                    <i className="bx bx-trash-alt"></i>
                  </button>
                  <button
                    onClick={confirmReset}
                    className="btn btn-outline-secondary rounded"
                  >
                    <i className="bx bx-refresh"></i>
                  </button>
                  <button className="btn btn-outline-secondary rounded">
                    <i className="bx bx-lock"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="btn btn-lg text-white rounded-circle btn-warning position-absolute"
        style={{ bottom: "50px", right: "50px", zIndex: 1000 }}
        onClick={() => setVisibleDetails(true)}
      >
        +
      </button>
    </div>
  );
}
