"use client";
import React, { useState, useRef, useEffect } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Paginator } from "primereact/paginator";
import { Sidebar } from "primereact/sidebar";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  patchConferenceAttendees,
  deleteConferenceAttendees,
} from "@/service/AdminConfernecePages/confernce";
import { Button } from "primereact/button";
import Image from "next/image";

export default function ConferenceAttendees({
  selectedConferenceID,
  conferenceAttendees,
  fetchConfernceData,
  toast,
}) {
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });
  const [first, setFirst] = useState(0); // starting index
  const [rows, setRows] = useState(10); // rows per page

  const handleDelete = async (attendeesId) => {
    try {
      const response = await deleteConferenceAttendees(selectedConferenceID, {
        attendeesId: attendeesId,
      });
      if (response.status !== 200) {
        throw new Error(
          response.data.detail[0].msg || "Failed to delete Conference Attendees"
        );
      }
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Conference Attendees has been deleted.",
        life: 3000,
      });
      fetchConfernceData();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Failed to delete. Please try again.",
        life: 3000,
      });
    }
  };
  const handleStatusChange = async (newStatus, id) => {
    try {
      const response = await updateTestiMonialStatus(selectedConferenceID, id, {
        status: newStatus,
      });

      if (response.status === 200) {
        // Update local state
        fetchConfernceData();
        toast.current?.show({
          severity: "success",
          summary: "Updated",
          detail: response.data.detail[0].msg || "Status updated successfully",
        });
      } else {
        console.log(response.response.data.detail[0].msg);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail:
            response.response.data.detail[0].msg || "Status update failed",
        });
      }
    } catch (err) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Status update failed",
      });
    }
  };
  const confirmDelete = (attendeesId) => {
    const accept = () => {
      handleDelete(attendeesId);
    };
    confirmDialog({
      message: <Delete />,
      acceptLabel: "OK",
      rejectLabel: "Cancel",
      acceptClassName: "btn px-5 btn-warning text-white shadow-none",
      rejectClassName: "btn px-5 bg-white border me-3 shadow-none",
      defaultFocus: "accept",
      accept,
      className: "custom-confirm-dialog",
    });
  };

  const handleSidebar = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Testimonial",
        content: <View data={data} toast={toast} />,
      },
      edit: {
        header: "Edit Testimonial",
        content: (
          <Edit
            data={data}
            selectedConferenceID={selectedConferenceID}
            toast={toast}
            fetchData={fetchConfernceData}
            setIsVisible={setIsVisible}
          />
        ),
      },
      add: {
        header: "Add Testimonial",
        content: (
          <Add
            selectedConferenceID={selectedConferenceID}
            toast={toast}
            setIsVisible={setIsVisible}
            fetchData={fetchConfernceData}
          />
        ),
      },
    };

    const selected = componentsMap[type];
    if (selected) {
      setSidebarState(selected);
      setIsVisible(true);
    }
  };
  return (
    <div className="table-responsive">
      <Sidebar
        visible={isVisible}
        header={<h5 className="text-black">{sidebarState.header}</h5>}
        position="right"
        dismissable={false}
        onHide={() => setIsVisible(false)}
        className="custom-sidebar"
      >
        <>
          <div className="d-flex flex-column justify-content-between h-100">
            {/* Content Area */}

            {sidebarState.content}
          </div>
        </>
      </Sidebar>
      <ConfirmDialog draggable={false} />
      {conferenceAttendees.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>No Conference Attendees found</h5>
          <p>Try adding a new Conferenc eAttendees using the + button.</p>
        </div>
      ) : (
        <>
          <table className="tabel w-100  table-striped-columns">
            <thead>
              <tr>
            <td className="p-2 table-heading">#</td>
                <td className="p-2 table-heading">Full Name</td>
                <td className="p-2 table-heading"> Country</td>
                <td className="p-2 table-heading">Affiliation</td>
                <td className="p-2 table-heading">Action</td>
              </tr>
            </thead>
            <tbody>
              {conferenceAttendees.slice(first, first + rows).map((element, i) => (
                <tr key={i}>
            <td className="p-3 table-data">{i+1}</td>
                  <td className="p-3 table-data">{element.name}</td>
                  <td className="p-3 table-data">{element.country}</td>
                  <td className="p-3 table-data">{element.affliation}</td>
                  <td className="p-3 table-data ">
                    <div className="d-flex gap-1  justify-content-center flex-nowrap">
                      <button
                        name="edit"
                        className="btn btn-outline-secondary rounded"
                        onClick={(e) => handleSidebar(e.target.name, element)}
                      >
                        <i className="bx bx-edit-alt"></i>
                      </button>
                      <button
                        className="btn btn-outline-secondary rounded"
                        onClick={() => confirmDelete(element.attendeesId)}
                      >
                        <i className="bx bx-trash-alt"></i>
                      </button>
                      <button
                        name="view"
                        className="btn btn-outline-warning rounded"
                        onClick={(e) => handleSidebar(e.target.name, element)}
                      >
                        <i className="bx bx-chevron-right"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginator
            first={first}
            rows={rows} // set rows using useState, e.g., 10
            totalRecords={conferenceAttendees.length}
            onPageChange={(e) => {
              setFirst(e.first);
            }}
            className="mt-4"
          />
        </>
      )}
      <button
        name="add"
        className="btn btn-lg text-white rounded-circle  btn-warning position-absolute"
        style={{ bottom: "50px", right: "50px", zIndex: 1000 }}
        onClick={(e) => handleSidebar(e.target.name)}
      >
        +
      </button>
    </div>
  );
}
function Edit({ data, selectedConferenceID, setIsVisible, toast, fetchData }) {
 
  const [buttonLoading, setButtonLoading] = useState(false);

  const submitTestimonial = async (values) => {
    setButtonLoading(true);
    try {
      const payload = {
        name: values.name,
        country: values.country,
        affliation: values.affliation,

      };

      const response = await patchConferenceAttendees(
        selectedConferenceID,
        payload,
        data.attendeesId
      );

      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Updated",
          detail:
            response.data.detail[0].msg || "Conference Attendees updated successfully",
        });
        setIsVisible(false);
        fetchData();
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: err.message || "Something went wrong!",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data.name || "",
      country: data.country || "",
      affliation: data.affliation || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      country: Yup.string().required(" Country is required"),
      affliation: Yup.string().required("Affiliation is required"),
    }),
    onSubmit: submitTestimonial,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="position-relative"
      style={{ height: "100vh" }}
    >
      <div
        className="p-3"
        style={{ overflowY: "auto", height: "calc(100vh - 200px)" }}
      >

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
           Full Name*
          </label>
          <input
            type="text"
            name="name"
            className={`form-control ${
              formik.touched.name && formik.errors.name ? "is-invalid" : ""
            }`}
            placeholder="Enter Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-danger">{formik.errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">
         Country*
          </label>
          <input
            type="text"
            name="country"
            className={`form-control ${
              formik.touched.country && formik.errors.country
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter Country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.country && formik.errors.country && (
            <div className="text-danger">{formik.errors.country}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="affliation" className="form-label">
            Affliation*
          </label>
          <input
            type="text"
            name="affliation"
            className={`form-control ${
              formik.touched.affliation && formik.errors.affliation
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter Affiliation"
            value={formik.values.affliation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.affliation && formik.errors.affliation && (
            <div className="text-danger">{formik.errors.affliation}</div>
          )}
        </div>


      </div>

      <div
        className="bg-secondary position-absolute z-2 bg-opacity-10 p-2 d-flex justify-content-center align-items-center gap-3 w-100"
        style={{ bottom: 0, left: 0, height: "80px" }}
      >
        <button
          className="btn px-5 bg-white border"
          onClick={() => setIsVisible(false)}
          type="button"
        >
          Close
        </button>
        <Button
          label="Save"
          type="submit"
          className="btn px-5 btn-warning text-white"
          loading={buttonLoading}
          style={{ outline: "none", boxShadow: "none" }}
        />
      </div>
    </form>
  );
}

function Add({ selectedConferenceID, setIsVisible, toast, fetchData }) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const submitTestimonial = async (data) => {
    setButtonLoading(true);
    try {
      //  Prepare payload and call API
      const payLoad = {
        name: data.name,
        country: data.country,
        affliation: data.affliation,
      };

      const response = await patchConferenceAttendees(selectedConferenceID, payLoad);

      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Saved",
          detail:
            response.data.detail[0].msg || "Conference Attendees created successfully",
        });
        setIsVisible(false);
        fetchData();
      } else {
        setButtonLoading(false);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Testimonial creation failed",
        });
      }
    } catch (err) {
      setButtonLoading(false);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: err.message || "Something went wrong!",
      });
    } finally {
      setButtonLoading(false);
    }
  };


  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
      affliation: "",
 
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      country: Yup.string().required(" Country is required"),
      affliation: Yup.string().required("Affliation is required"),
    }),
    
      onSubmit: (values) => {
      const finalData = {
        ...values,
      };
      submitTestimonial(finalData);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="position-relative"
      style={{ height: "100vh" }}
    >
      <div
        className="p-3"
        style={{ overflowY: "auto", height: "calc(100vh - 200px)" }}
      >

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
           Full Name*
          </label>
          <input
            type="text"
            name="name"
            className={`form-control ${
              formik.touched.name && formik.errors.name ? "is-invalid" : ""
            }`}
            placeholder="Enter Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-danger">{formik.errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="affliation" className="form-label">
            Affiliation*
          </label>
          <input
            type="text"
            name="affliation"
            className={`form-control ${
              formik.touched.affliation && formik.errors.affliation
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter Affiliation "
            value={formik.values.affliation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.affliation && formik.errors.affliation && (
            <div className="text-danger">{formik.errors.affliation}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country*
          </label>
          <input
            type="text"
            name="country"
            className={`form-control ${
              formik.touched.country && formik.errors.country
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.country && formik.errors.country && (
            <div className="text-danger">{formik.errors.country}</div>
          )}
        </div>
      </div>

      <div
        className="bg-secondary position-absolute z-2 bg-opacity-10 p-2 d-flex justify-content-center align-items-center gap-3 w-100"
        style={{ bottom: 0, left: 0, height: "80px" }}
      >
        <button
          className="btn px-5 bg-white border"
          onClick={() => setIsVisible(false)}
          type="button"
        >
          Close
        </button>
        <Button
          label="Save"
          type="submit"
          className="btn px-5 btn-warning text-white"
          loading={buttonLoading}
          style={{ outline: "none", boxShadow: "none" }}
        />
      </div>
    </form>
  );
}
function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <div>
        <label className="form-label mb-2">Full Name</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.name}</p>
      </div>
      <div>
        <label className="form-label mb-2">Affiliation</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.affliation}</p>
      </div>
      <div>
        <label className="form-label mb-2">Country</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.country}</p>
      </div>
    </div>
  );
}


function Delete({ data = null }) {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Conference Attendee</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
