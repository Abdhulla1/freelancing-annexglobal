"use client";
import React, { useState, useEffect } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { updateMediaLinkStatus,updateMediaLink} from "@/service/footerService";
import { useFormik } from "formik";
import * as Yup from "yup";
const mediaLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/johndoe",
    isEnable: true,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/johndoe",
    isEnable: false,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/johndoe",
    isEnable: true,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/johndoe",
    isEnable: false,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UC123456",
    isEnable: true,
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/1234567890",
    isEnable: true,
  },
  {
    name: "Email1",
    url: "gynecology@annexglobalconferences.com",
    isEnable: true,
  },
  {
    name: "Email 2",
    url: "gynecology@annexglobalconferences.com",
    isEnable: true,
  },
];

export default function FooterTabelAdmin({
  toast,
  footertable,
  footertableUpdate,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });

  const [statusChecked, setStatusChecked] = useState(false);

  const confirmDelete = () => {
    const accept = () => {
      console.log("accepted");
    };
    const reject = () => {
      console.log("rejectcted");
    };
    confirmDialog({
      message: <Delete />,
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

  const handleModel = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Media Link",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Media Link",
        content: <Edit data={data} handleURLChange={handleURLChange} setIsVisible={setIsVisible} />,
      },
    };

    const selected = componentsMap[type];
    if (selected) {
      setSidebarState(selected);
      setIsVisible(true);
    }
  };

  const handleStatusChange = async (newStatus, id) => {
    try {
      const response = await updateMediaLinkStatus(id, newStatus);

      if (response.status === 200) {
        // Update local state
        const updatedTable = footertable.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        );
        footertableUpdate(updatedTable); // see note below

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

  const handleURLChange = async (data, newUrl) => {
    const payLoad={
      ...data,url:newUrl
    }
    console.log(payLoad)
    try {
      const response = await updateMediaLink(data._id, payLoad);
      console.log(response)
      if (response.status === 200) {
        const updatedTable = footertable.map((item) =>
  item._id === data._id ? { ...item, url: newUrl } : item
);

        footertableUpdate(updatedTable); // see note below

        toast.current?.show({
          severity: "success",
          summary: "Updated",
          detail: response.data.detail[0].msg || "Status updated successfully",
        });
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail:
             "URL update failed",
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

  return (
    <div className="table-responsive">
      <Dialog
        header={sidebarState.header}
        visible={isVisible}
        draggable={false}
        onHide={() => {
          if (!isVisible) return;
          setIsVisible(false);
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {/* Content Area */}
        {sidebarState.content}
      </Dialog>
      <ConfirmDialog draggable={false} />
      <table className="tabel w-100  table-striped-columns">
        <thead>
          <tr>
            <td className="p-2 table-heading">#</td>
            <td className="p-2 table-heading">Name</td>
            <td className="p-2 table-heading">Url</td>
            <td className="p-2 table-heading">Enable/Disable</td>
            <td className="p-2 table-heading text-center">Action</td>
          </tr>
        </thead>
        <tbody>
          {footertable.map((element, i) => (
            <tr key={i}>
              <td className="p-3 table-data">{i + 1}</td>
              <td className="p-3 table-data">{element.name}</td>
              <td className="p-3  table-data ">{element.url}</td>

              <td className="p-3  table-data ">
                {" "}
                <InputSwitch
                  checked={element.status}
                  onChange={(e) => handleStatusChange(e.value, element._id)}
                  style={{ scale: "0.7" }}
                />
              </td>
              <td className="p-3 table-data ">
                <div className="d-flex gap-1  justify-content-center flex-nowrap">
                  <button
                    name="edit"
                    className="btn btn-outline-secondary rounded"
                    onClick={(e) => handleModel(e.target.name, element)}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button>
                  {/* <button
                    className="btn btn-outline-secondary rounded"
                    onClick={confirmDelete}
                  >
                    <i className="bx bx-trash-alt"></i>
                  </button> */}
                  {/* <button
                    name="view"
                    className="btn btn-outline-warning rounded"
                    onClick={(e) => handleModel(e.target.name, element)}
                  >
                    <i className="bx bx-chevron-right"></i>
                  </button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Edit({ data, handleURLChange, setIsVisible }) {
  const formik = useFormik({
    initialValues: {
      url: data.url || "",
    },
    validationSchema: Yup.object({
      url: Yup.string()
        .matches(/^https?:\/\/.+/, "Enter a valid URL (must start with http:// or https://)")
        .required("URL is required"),
    }),
    onSubmit: (values) => {
      handleURLChange(data, values.url);
      setIsVisible(false);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex gap-3 container flex-column h-100"
    >
      <div className="mt-2">
        <label htmlFor="url" className="form-label">
          {data.name}
        </label>
        <div className="input-group border rounded p-1">
          <span
            className="btn rounded-2 text-white me-1"
            id="basic-addon1"
            style={{ backgroundColor: "#111880" }}
          >
            <i className="bx bx-link-alt"></i>
          </span>
          <input
            id="url"
            name="url"
            type="text"
            className={`form-control border-0 ${
              formik.touched.url && formik.errors.url ? "is-invalid" : ""
            }`}
            placeholder="Please enter a valid URL."
            autoComplete="off"
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.url && formik.errors.url && (
          <div className="text-danger mt-1">{formik.errors.url}</div>
        )}
      </div>

      <div className="bg-secondary bg-opacity-10 p-2 d-flex justify-content-center align-items-center gap-3 w-100">
        <button
          type="button"
          className="btn px-5 bg-white border"
          onClick={() => setIsVisible(false)}
         
        >
          Close
        </button>
        <button type="submit" className="btn px-5 btn-warning text-white" disabled={!formik.dirty}>
          Save
        </button>
      </div>
    </form>
  );
}
function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <div>
        <label className="form-label  mb-2">Name</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.name}</p>
      </div>
      <div>
        <label className="form-label  mb-2">Email</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.email}</p>
      </div>
      <div>
        <label className="form-label  mb-2">Event</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.event}</p>
      </div>

      <div>
        <label className="form-label mb-2">message</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.message}
        </p>
      </div>
    </div>
  );
}
