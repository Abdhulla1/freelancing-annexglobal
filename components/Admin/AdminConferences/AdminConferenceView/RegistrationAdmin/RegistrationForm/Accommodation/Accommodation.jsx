"use client";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateAccommodationDetails } from "@/service/AdminConfernecePages/confernce";
export default function Accommodation({
  selectedConferenceID,
  initialData,
  fetchConfernceData,
  toast,
}) {
    const [buttonLoading, setButtonLoading] = useState(false);
  
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      heading: initialData.heading || "",
      occupancy: initialData.occupancy || [],
      rooms: initialData.rooms || [],
      period: initialData.period || [],
    },
    validationSchema: Yup.object({
      heading: Yup.string().required("Heading is required"),
      occupancy: Yup.array().min(1, "Occupancy options required"),
      rooms: Yup.array().min(1, "Rooms options required"),
      period: Yup.array().min(1, "Period options required"),
    }),
    onSubmit: async (values) => {
         setButtonLoading(true)
      try {
        const response = updateAccommodationDetails(
          selectedConferenceID,
          values
        );
        if (response.status === 200) {
          toast.current?.show({
            severity: "success",
            summary: "Saved",
            detail: "Accommodation details saved successfully",
            life: 3000,
          });
          fetchConfernceData()
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.message || "Failed to save",
          life: 3000,
        });
      } finally {
        setButtonLoading(false)
      }
    },
  });

  const handleModel = (type, data = null) => {
    const isTitle = type === "editTitle";
    setSidebarState({
      header: isTitle ? "Edit Accommodation Title" : `Edit ${data.label}`,
      content: isTitle ? (
        <EditTitle
          title={formik.values.heading}
          onSave={(newVal) => {
            formik.setFieldValue("heading", newVal);
            setIsVisible(false);
          }}
          onClose={() => setIsVisible(false)}
        />
      ) : (
        <EditOptions
          data={data}
          values={formik.values[data.name]}
          onSave={(newVals) => {
            formik.setFieldValue(data.name, newVals);
            setIsVisible(false);
          }}
          onClose={() => setIsVisible(false)}
        />
      ),
    });
    setIsVisible(true);
  };

  const dropdownOptions = [
    { label: "Occupancy(Amount Should Be In $USD)", name: "occupancy" },
    { label: "Rooms", name: "rooms" },
    { label: "Period", name: "period" },
  ];

  return (
    <div className="mt-3">
      <Dialog
        header={sidebarState.header}
        visible={isVisible}
        draggable={false}
        onHide={() => setIsVisible(false)}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {sidebarState.content}
      </Dialog>

      <label className="form-label fw-bold">
        Plan Your Stay & Accommodation &nbsp;
        <button
          className="btn btn-outline-secondary rounded"
          onClick={() => handleModel("editTitle")}
        >
          <i className="bx bx-edit-alt"></i>
        </button>
      </label>

      <div className="row mt-3">
        {dropdownOptions.map((dropdown) => (
          <div className="mb-3" key={dropdown.name}>
            <label className="form-label">{dropdown.label}</label>
            <div className="d-flex col-6 align-items-center gap-2">
              <select
                className="form-select bg-secondary bg-opacity-10 rounded-2 p-2 px-3"
                defaultValue=""
              >
                <option value="" disabled>
                  {formik.values[dropdown.name].length === 0
                    ? `Add ${dropdown.label} options`
                    : `Select ${dropdown.label}`}
                </option>
                {formik.values[dropdown.name].map((opt, idx) => (
                  <option key={idx} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-outline-secondary rounded"
                onClick={() => handleModel("editOptions", dropdown)}
              >
                <i className="bx bx-edit-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          className="btn btn-warning text-white"
          disabled={!(formik.isValid && formik.dirty)}
          onClick={formik.handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

function EditTitle({ title, onSave, onClose }) {
  const [value, setValue] = useState(title || "");

  return (
    <div className="p-3">
      <label className="form-label">Title Name</label>
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="mt-4 d-flex justify-content-center gap-3 w-100">
        <button className="btn px-5 bg-white border" onClick={onClose}>
          Close
        </button>
        <button
          className="btn px-5 btn-warning text-white"
          onClick={() => onSave(value)}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

function EditOptions({ data, values, onSave, onClose }) {
  const [options, setOptions] = useState(values || []);
  const [errors, setErrors] = useState([]);

  const validateOptions = () => {
    const newErrors = options.map((item) => {
      const error = {};
      if (!item.label?.trim()) error.label = "Label is required";
      if (!item.value?.trim()) error.value = "Value is required";
      else if (!/^[0-9]+$/.test(item.value))
        error.value = "Value must be a number";
      return error;
    });
    setErrors(newErrors);
    return newErrors.every((err) => Object.keys(err).length === 0);
  };

  const handleAdd = () => {
    let placeholder = { label: "", value: "" };
    if (data.name === "occupancy") {
      placeholder = { label: "Single Occupancy ($120)", value: "120" };
    } else if (data.name === "rooms") {
      placeholder = { label: "One", value: "1" };
    } else if (data.name === "period") {
      placeholder = { label: "One Night", value: "1" };
    }
    setOptions([...options, placeholder]);
    setErrors([...errors, {}]);
  };

  const handleDelete = (index) => {
    setOptions(options.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  return (
    <div className="p-3">
      <div className="mb-3">
        <label className="form-label">{data.label} Options</label>
        <button
          type="button"
          className="btn btn-outline-warning rounded ms-2"
          onClick={handleAdd}
        >
          <i className="bx bx-plus"></i>
        </button>
        <div className="rounded border p-4 mt-3">
          {options.map((item, i) => (
            <div key={i} className="row gap-1 align-items-center">
              <span
                className="rounded-circle bg-secondary bg-opacity-10 mt-3 p-1 d-flex justify-content-center align-items-center"
                style={{ height: 40, width: 40 }}
              >
                {i + 1}
              </span>
              <div className="col-5 mb-3">
                <label className="form-label">Label</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.label}
                  onChange={(e) => handleChange(i, "label", e.target.value)}
                />
                {errors[i]?.label && (
                  <div className="text-danger small">{errors[i].label}</div>
                )}
              </div>
              <div className="col-5 mb-3">
                <label className="form-label">Value</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.value}
                  onChange={(e) => handleChange(i, "value", e.target.value)}
                />
                {errors[i]?.value && (
                  <div className="text-danger small">{errors[i].value}</div>
                )}
              </div>
              <button
                type="button"
                className="btn col-1 btn-sm btn-outline-secondary mt-3"
                onClick={() => handleDelete(i)}
              >
                <i className="pi pi-trash" style={{ fontSize: 16 }}></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-center gap-3 w-100">
        <button className="btn px-5 bg-white border" onClick={onClose}>
          Close
        </button>
        <button
          className="btn px-5 btn-warning text-white"
          onClick={() => {
            if (validateOptions()) onSave(options);
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
