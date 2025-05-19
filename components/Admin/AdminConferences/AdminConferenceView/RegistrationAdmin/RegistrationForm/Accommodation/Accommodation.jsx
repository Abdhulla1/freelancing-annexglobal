"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";

export default function Accommodation({ toast }) {
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });
  // Fetch data on component mount or ID change

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const hasFile = uploads.some((upload) => upload.file);
  //   if (!hasFile) {
  //     toast.current.show({
  //       severity: "error",
  //       summary: "Image Upload Error",
  //       detail: "Please upload at least one landing image before submitting.",
  //       life: 3000,
  //     });
  //     return;
  //   }

  //   try {
  //     let imageUrls = [];

  //     const uploadPromises = uploads.map(async (upload) => {
  //       if (upload.file?.isUploaded) {
  //         return { url: upload.file.preview };
  //       } else if (upload.file) {
  //         return await uploadImage(upload.file);
  //       } else {
  //         return null;
  //       }
  //     });

  //     const responses = await Promise.all(uploadPromises);
  //     imageUrls = responses.filter(Boolean).map((res) => res.url);

  //     const finalPayload = {
  //       images: imageUrls,
  //       ...formData,
  //     };

  //     const response = await saveConferenceLandingPage(
  //       finalPayload,
  //       selectedConferenceID
  //     );

  //     if (response[0].msg === "Landing page updated successfully") {
  //       toast.current.show({
  //         severity: "success",
  //         summary: "Success!",
  //         detail: "The form has been submitted successfully.",
  //         life: 3000,
  //       });
  //     }else if (response[0].msg === "No modifications found") {
  //       toast.current.show({
  //         severity: "warn",
  //         summary: "Warning",
  //         detail: "No modifications found",
  //         life: 3000,
  //       });
  //     }
  //   } catch (error) {
  //     toast.current.show({
  //       severity: "error",
  //       summary: "Submission failed",
  //       detail: "Failed to submit the form. Please try again.",
  //       life: 3000,
  //     });
  //   }
  // };
  const handleModel = (type, data = null) => {
    const componentsMap = {
      editOptions: {
        header: `Edit ${data.label}`,
        content: <EditCurrency data={data} />,
      },
      editTitle: {
        header: "Edit Accommodation Title",
        content: <EditTitle data={data} />,
      },
    };

    const selected = componentsMap[type];
    if (selected) {
      setSidebarState(selected);
      setIsVisible(true);
    }
  };
  const dropdownOptions = [
    {
      label: "Occupancy",
      name: "occupancy",
      values: [
    { label: "Single Occupancy", value: "1" },
    { label: "Double Occupancy", value: "2" },
    { label: "Triple Occupancy", value: "3" },
    { label: "Quad Occupancy", value: "4" },
  ],
    },
    {
      label: "Rooms",
      name: "rooms",
      values: [
        { label: "One", value: "1" },
        { label: "Two", value: "2" },
        { label: "Three", value: "3" },
      ],
    },
    {
      label: "Period",
      name: "period",
      values: [
        { label: "One Night", value: "1night" },
        { label: "Two Nights", value: "2nights" },
        { label: "One Week", value: "1week" },
      ],
    },
  ];

  return (
    <div className="mt-3">
      <Dialog
        header={sidebarState.header}
        visible={isVisible}
        draggable={false}
        onHide={() => {
          if (!isVisible) return;
          setIsVisible(false);
        }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {/* Content Area */}
        {sidebarState.content}
      </Dialog>

      <label className="form-label fw-bold">
        Plan Your Stay & Accommodation &nbsp;{" "}
        <button
          name="editTitle"
          className="btn btn-outline-secondary rounded"
          onClick={(e) =>
            handleModel(e.target.name, "Plan Your Stay & Accommodation")
          }
        >
          <i className="bx bx-edit-alt"></i>
        </button>
      </label>
      <div className="row mt-3">
        {dropdownOptions.map((dropdown, idx) => (
          <div className=" mb-3" key={dropdown.name}>
            <label className="form-label">{dropdown.label}</label>
            <div className="d-flex col-6 align-items-center gap-2">
              <select
                className="form-select bg-secondary bg-opacity-10 rounded-2 p-2 px-3"
                defaultValue=""
              >
                <option value="" disabled>
                  Select {dropdown.label}
                </option>
                {dropdown.values.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                name="editOptions"
                className="btn btn-outline-secondary rounded"
                onClick={(e) => handleModel(e.target.name, dropdown)}
              >
                <i className="bx bx-edit-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditCurrency({ data }) {
  const [values, setValues] = useState(data.values || []);
  const [dropdownName, setDropdownName] = useState("");
  const [statusChecked, setStatusChecked] = useState(false);

  // Add new option
  const handleAdd = () => {
    setValues([...values, { label: "", value: "" }]);
  };

  // Delete option
  const handleDelete = (index) => {
    const newValues = values.filter((_, i) => i !== index);
    setValues(newValues);
  };

  // Update value
  const handleChange = (index, field, newValue) => {
    const updated = [...values];
    updated[index][field] = newValue;
    setValues(updated);
  };
  return (
    <div className="p-3">
      {/* <div className="row mb-3 justify-content-between align-items-end">
        <div className="col-md-8">
          <label className="form-label">
            Enter {data.label} dropdown name{" "}
            <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="couponCode"
            className="form-control"
            id="couponCode"
            placeholder={`Select ${data.label}`}
            value={dropdownName}
            onChange={(e) => setDropdownName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4 mt-4 mt-md-0">
          <div className="btn btn-outline-secondary rounded d-inline-flex align-items-center  gap-2">
            <span>Required</span>
            <InputSwitch
              checked={statusChecked}
              onChange={(e) => setStatusChecked(e.value)}
              style={{ scale: "0.7" }}
            />
          </div>
        </div>
      </div> */}

      <div className=" mb-3">
        <label className="form-label">{data.label} List</label>
        <button
          type="button"
          className="btn btn-outline-warning rounded ms-2"
          onClick={handleAdd}
        >
          <i className="bx bx-plus"></i>
        </button>
        <div className="rounded border p-4 mt-3">
          {values.map((item, i) => (
            <div key={i} className="row gap-1 align-items-center">
              <span
                className="rounded-circle bg-secondary bg-opacity-10 mt-3 p-1 d-flex justify-content-center align-items-center"
                style={{ height: "40px", width: "40px" }}
              >
                {i + 1}
              </span>
              <div className="col-5 mb-3">
                <label className="form-label">Label</label>
                <input
                  type="text"
                  name="currency"
                  className="form-control"
                  placeholder={`Enter ${data.label}`}
                  value={item.label}
                  onChange={(e) => handleChange(i, "label", e.target.value)}
                  required
                />{" "}
              </div>
              <div className="col-5 mb-3">
                <label className="form-label">Value</label>
                <input
                  type="text"
                  name="currency"
                  className="form-control"
                  placeholder={`Enter ${data.label}`}
                  value={item.value}
                  onChange={(e) => handleChange(i, "value", e.target.value)}
                  required
                />{" "}
              </div>
              <button
                type="button"
                className="btn col-1 btn-sm btn-outline-secondary mt-3 "
                onClick={() => handleDelete(i)}
                title="Delete"
              >
                <i className="pi pi-trash" style={{ fontSize: "16px" }}></i>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 p-2 d-flex justify-content-center align-items-center gap-3 w-100">
        <button
          className="btn px-5 bg-white border"
          onClick={() => setIsVisible(false)}
        >
          Close
        </button>
        <button className="btn px-5 btn-warning text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}
function EditTitle({ data }) {
  return (
    <div className="p-3">
      <label className="form-label">Title Name</label>
      <input
        type="text"
        name="couponCode"
        value={data}
        className="form-control"
        id="couponCode"
        placeholder="Select Currency"
        onChange={(e) => console.log(e.target.value)}
        required
      />{" "}
      <div className="mt-4 p-2 d-flex justify-content-center align-items-center gap-3 w-100">
        <button
          className="btn px-5 bg-white border"
          onClick={() => setIsVisible(false)}
        >
          Close
        </button>
        <button className="btn px-5 btn-warning text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}
