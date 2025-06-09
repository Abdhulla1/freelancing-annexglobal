"use client";
import React, { useEffect, useState, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Sidebar } from "primereact/sidebar";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputSwitch } from "primereact/inputswitch";
import { Paginator } from "primereact/paginator";
import {
  fetchAdmins,
  createAdmin,
  updateAdmin,
  resetAdmin,
  deleteAdmin,
} from "@/service/adminService";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import "./style.css";

export default function AdminsTable() {
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [adminsData, setAdminsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  const [error, setError] = useState(null);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const loadData = async () => {
    try {
      const res = await fetchAdmins(currentPage, rowsPerPage);
      setAdminsData(res.data);
      setTotalRecords(res.total);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch admins",
        life: 3000,
      });
      setError("Failed to fetch admins. Please try again later.");
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    loadData();
  }, [currentPage]);

  const handleSidebar = (type, data = null) => {
    const componentsMap = {
      add: {
        header: <h5 className="text-black">Add New Administrator</h5>,
        content: (
          <Add
            setVisibleDetails={setVisibleDetails}
            toast={toast}
            loadData={loadData}
          />
        ),
      },
      edit: {
        header: <h5 className="text-black">Edit Administrator</h5>,
        content: (
          <Edit
            setVisibleDetails={setVisibleDetails}
            toast={toast}
            data={data}
            loadData={loadData}
          />
        ),
      },
    };

    const selected = componentsMap[type];
    if (selected) {
      setSidebarState(selected);
      setVisibleDetails(true);
    }
  };
  const handleReset = async (id) => {
    try {
      const response = await resetAdmin(id);
      if (response.msg !== "No modifications found") {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Admin reset successfully",
          life: 3000,
        });
        loadData();
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Warning",
          detail: "No modifications found",
          life: 3000,
        });
      }
    } catch (error) {
      let detailMessage = "Failed to reset admin";

      if (error.isAxiosError && error.response?.data?.detail?.length > 0) {
        detailMessage = error.response.data.detail.map((e) => e.msg).join(", ");
      }

      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: detailMessage,
        life: 3000,
      });
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await deleteAdmin(id);
      if (response.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Admin Deleted successfully",
          life: 3000,
        });
        loadData();
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to Delete admin",
          life: 3000,
        });
      }
    } catch (error) {
      let detailMessage = "Failed to Delete admin";
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: detailMessage,
        life: 3000,
      });
    }
  };

  const confirmReset = (id) => {
    confirmDialog({
      message:
        "Resetting the user will delete all of their restrictions. Confirm?",
      acceptLabel: "OK",
      rejectLabel: "Cancel",
      acceptClassName: "btn px-5 btn-warning text-white shadow-none",
      rejectClassName: "btn px-5 bg-white border me-3 shadow-none",
      defaultFocus: "accept",
      accept: () => handleReset(id),

      className: "custom-confirm-dialog",
    });
  };
  const confirmDelete = (id) => {
    confirmDialog({
      message: <Delete />,
      acceptLabel: "OK",
      rejectLabel: "Cancel",
      acceptClassName: "btn px-5 btn-warning text-white shadow-none",
      rejectClassName: "btn px-5 bg-white border me-3 shadow-none",
      defaultFocus: "accept",
      accept: () => handleDelete(id),

      className: "custom-confirm-dialog",
    });
  };

  return (
    <div className="table-responsive">
      <Toast ref={toast} />

      <Sidebar
        visible={visibleDetails}
        header={sidebarState.header}
        position="right"
        dismissable={false}
        onHide={() => setVisibleDetails(false)}
        className="custom-sidebar"
      >
        {sidebarState.content}
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
      ) : adminsData.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>No admin records found</h5>
          <p>Try adding an administrator using the + button below.</p>
        </div>
      ) : (
        <>
          <table className="tabel w-100">
            <thead>
              <tr>
                <td className="p-2 table-heading">ID</td>
                <td className="p-2 table-heading">Email ID</td>
                <td className="p-2 table-heading">Expiring In</td>
                <td className="p-2 table-heading text-nowrap">
                  Last Logged In
                </td>
                <td className="p-2 table-heading">Role</td>
                <td className="p-2 table-heading">Status</td>
                <td className="p-2 table-heading">Action</td>
              </tr>
            </thead>
            <tbody>
              {adminsData.map((element, i) => (
                <tr key={i}>
                  <td className="p-3 table-data">{i + 1}</td>
                  <td className="p-3 text-nowrap table-data">
                    {element.email}
                  </td>
                  <td className="p-3 text-nowrap table-data">
                    {element.expiringIn}
                  </td>
                  <td className="p-3 text-nowrap table-data">
                    {element.lastLoggedIn}
                  </td>
                  <td className="p-3  table-data ">
                    {element.isUser ? "User" : "Admin"}
                  </td>
                  <td
                    className={`p-3 text-nowrap table-data ${
                      element.status === "Active"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {element.status}
                  </td>
                  <td className="p-3 table-data d-flex gap-1">
                    <button
                      className="btn btn-outline-secondary rounded"
                      name="edit"
                      onClick={(e) =>
                        handleSidebar(e.currentTarget.name, element)
                      }
                    >
                      <i className="bx bx-edit-alt"></i>
                    </button>
                    <button
                      className="btn btn-outline-secondary rounded"
                      onClick={() => confirmDelete(element._id)}
                    >
                      <i className="bx bx-trash-alt"></i>
                    </button>
                    <button
                      onClick={() => confirmReset(element._id)}
                      className="btn btn-outline-secondary rounded"
                    >
                      <i className="bx bx-refresh"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginator
            first={(currentPage - 1) * rowsPerPage}
            rows={rowsPerPage}
            totalRecords={totalRecords}
            onPageChange={(e) =>
              setCurrentPage(Math.floor(e.first / e.rows) + 1)
            }
            className="mt-4"
          />
        </>
      )}

      {/*  Add Button */}
      <button
        name="add"
        className="btn btn-lg text-white rounded-circle btn-warning position-absolute"
        style={{ bottom: "50px", right: "50px", zIndex: 1000 }}
        onClick={(e) => handleSidebar(e.target.name)}
      >
        +
      </button>
    </div>
  );
}

// Add Admin Component
function Add({ setVisibleDetails, toast, loadData }) {
  const [isUser, setIsUser] = useState(true); // true = User, false = Admin

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    formik.setFieldValue("password", password);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      expiringIn: "",
      role: isUser ? "User" : "Admin",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 characters").required("Required"),
      expiringIn: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        email: values.email,
        password: values.password,
        expiringIn: values.expiringIn,
        isUser: isUser,
      };
      try {
        await createAdmin(payload);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Admin created successfully",
          life: 3000,
        });
        setVisibleDetails(false);
        resetForm();
        loadData();
      } catch (error) {
        let detailMessage = "Failed to create admin";
        if (error.isAxiosError && error.response?.data?.detail?.length > 0) {
          detailMessage = error.response.data.detail
            .map((e) => e.msg)
            .join(", ");
        }
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: detailMessage,
          life: 3000,
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="h-100">
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="p-4">
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              placeholder="Enter Email"
              autoComplete="off"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="d-flex gap-2">
              <input
                type="text"
                name="password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter Password"
                autoComplete="off"
                {...formik.getFieldProps("password")}
              />
              <button
                type="button"
                className="btn btn-outline-warning px-3"
                onClick={generatePassword}
              >
                Generate
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback d-block">
                {formik.errors.password}
              </div>
            )}
          </div>
          {/* Role Toggle */}
          <div className="mb-4 d-flex align-items-center justify-content-between">
            <label className="form-label mb-0">
              Role: {isUser ? "User" : "Admin"}
            </label>
            <InputSwitch
              checked={isUser}
              onChange={(e) => setIsUser(e.value)}
              style={{ scale: "0.9" }}
            />
          </div>

          {/* Expiring In */}
          <div className="mb-4">
            <label htmlFor="expiringIn" className="form-label">
              Expiring In
            </label>
            <select
              id="expiringIn"
              name="expiringIn"
              className={`form-select ${
                formik.touched.expiringIn && formik.errors.expiringIn
                  ? "is-invalid"
                  : ""
              }`}
              {...formik.getFieldProps("expiringIn")}
            >
              <option value="">Select Expiring</option>
              <option>Non Expiring</option>
              <option>One Hour</option>
              <option>One Day</option>
              <option>Three Days</option>
              <option>One Week</option>
              <option>Two Weeks</option>
              <option>One Month</option>
            </select>
            {formik.touched.expiringIn && formik.errors.expiringIn && (
              <div className="invalid-feedback d-block">
                {formik.errors.expiringIn}
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="bg-secondary bg-opacity-10 p-2 d-flex justify-content-center align-items-center gap-3 w-100">
          <button
            type="button"
            className="btn px-5 bg-white border"
            onClick={() => setVisibleDetails(false)}
          >
            Close
          </button>
          <button type="submit" className="btn btn-warning px-5 text-white">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
// Edit Admin Component
function Edit({ setVisibleDetails, toast, data, loadData }) {
  const [isUser, setIsUser] = useState(data?.isUser); // true = User, false = Admin

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    formik.setFieldValue("password", password);
  };

  const formik = useFormik({
    initialValues: {
      email: data?.email || "",
      password: data?.password || "",
      expiringIn: data?.expiringIn || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 characters").required("Required"),
      expiringIn: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        email: values.email,
        password: values.password,
        expiringIn: values.expiringIn,
        isUser: isUser,
      };

      try {
        await updateAdmin(payload, data._id);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Admin Updated successfully",
          life: 3000,
        });
        setVisibleDetails(false);
        resetForm();
        loadData();
      } catch (error) {
        let detailMessage = "Failed to Update admin";
        if (error.isAxiosError && error.response?.data?.detail?.length > 0) {
          detailMessage = error.response.data.detail
            .map((e) => e.msg)
            .join(", ");
        }
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: detailMessage,
          life: 3000,
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="h-100">
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="p-4">
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              placeholder="Enter Email"
              autoComplete="off"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="d-flex gap-2">
              <input
                type="text"
                name="password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter Password"
                autoComplete="off"
                {...formik.getFieldProps("password")}
              />
              <button
                type="button"
                className="btn btn-outline-warning px-3"
                onClick={generatePassword}
              >
                Generate
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback d-block">
                {formik.errors.password}
              </div>
            )}
          </div>
          {/* Role Toggle */}
          <div className="mb-4 d-flex align-items-center justify-content-between">
            <label className="form-label mb-0">
              Role: {isUser ? "User" : "Admin"}
            </label>
            <InputSwitch
              checked={isUser}
              onChange={(e) => setIsUser(e.value)}
              style={{ scale: "0.9" }}
            />
          </div>
          {/* Expiring In */}
          <div className="mb-4">
            <label htmlFor="expiringIn" className="form-label">
              Expiring In
            </label>
            <select
              id="expiringIn"
              name="expiringIn"
              className={`form-select ${
                formik.touched.expiringIn && formik.errors.expiringIn
                  ? "is-invalid"
                  : ""
              }`}
              {...formik.getFieldProps("expiringIn")}
            >
              <option value="">Select Expiring</option>
              <option>Non Expiring</option>
              <option>One Hour</option>
              <option>One Day</option>
              <option>Three Days</option>
              <option>One Week</option>
              <option>Two Weeks</option>
              <option>One Month</option>
            </select>
            {formik.touched.expiringIn && formik.errors.expiringIn && (
              <div className="invalid-feedback d-block">
                {formik.errors.expiringIn}
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="bg-secondary bg-opacity-10 p-2 d-flex justify-content-center align-items-center gap-3 w-100">
          <button
            type="button"
            className="btn px-5 bg-white border"
            onClick={() => setVisibleDetails(false)}
          >
            Close
          </button>
          <button type="submit" className="btn btn-warning px-5 text-white">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
function Delete() {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Admin </h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Admin? This action cannot be
        undone.
      </p>
    </div>
  );
}
