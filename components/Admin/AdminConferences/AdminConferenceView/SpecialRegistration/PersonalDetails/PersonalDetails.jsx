"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { updateSpecialRegistration } from "@/service/AdminConfernecePages/confernce";
import { Button } from "primereact/button";
export default function PersonalDetails({
  selectedConferenceID,
  PersonalDetails,
  fetchConfernceData,
  toast,
}) {
const [isVisible, setIsVisible] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });

  const initialData = {
    heading: PersonalDetails.heading || "",
    currencyInfo: PersonalDetails.currencyInfo || "",
    currency: PersonalDetails.currency || [],
    registrationFee: PersonalDetails.registrationFee || "",
  };

  const [formData, setFormData] = useState({ ...initialData });

  const handleModel = (type) => {
    const isHeading = type === "editTitle";
    setSidebarState({
      header: isHeading ? "Edit Personal Detail Title" : "Edit Currency Detail Title",
      content: (
        <EditTitle
          title={isHeading ? formData.heading : formData.currencyInfo}
          onSave={(newVal) => {
            setFormData((prev) => ({
              ...prev,
              [isHeading ? "heading" : "currencyInfo"]: newVal,
            }));
            setIsVisible(false);
          }}
          onClose={() => setIsVisible(false)}
        />
      ),
    });
    setIsVisible(true);
  };

  const isFormChanged =
    formData.heading !== initialData.heading ||
    formData.currencyInfo !== initialData.currencyInfo ||
    JSON.stringify(formData.currency) !== JSON.stringify(initialData.currency) ||
    formData.registrationFee !== initialData.registrationFee;

  const isFormValid =
    formData.heading.trim() &&
    formData.currencyInfo.trim() &&
    formData.currency.length > 0 &&
    formData.registrationFee !== "";

  const handleSubmit = async () => {
    setButtonLoading(true)
    if (!isFormValid) {
      toast.current.show({
        severity: "error",
        summary: "Validation Failed",
        detail: "All fields are required",
        life: 3000,
      });
      return;
    }

    const payload = { ...formData };

    try {
      const response=await updateSpecialRegistration(selectedConferenceID,payload)
      if(response.status==200){
 toast.current.show({
        severity: "success",
        summary: "Saved",
        detail: response.data?.detail?.[0]?.msg ||"Personal Details saved successfully",
        life: 3000,
      });
      fetchConfernceData()
      }
     
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to save",
        life: 3000,
      });
    }finally{
      setButtonLoading(false)
    }
  };
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
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {/* Content Area */}
        {sidebarState.content}
      </Dialog>
      <label className="form-label">
        Please fill in the Event Registration Form below to complete your
        registration &nbsp;{" "}
        <button
          name="editTitle"
          className="btn btn-outline-secondary rounded"
          onClick={(e) =>
            handleModel(
              e.target.name,
              "Please fill in the Event Registration Form below to complete your registration"
            )
          }
        >
          <i className="bx bx-edit-alt"></i>
        </button>
      </label>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">
            First Name <span className="text-danger">*</span>
          </label>
          <div className="bg-secondary bg-opacity-10 rounded-2 p-2 px-3">
            Enter First Name
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Last Name <span className="text-danger">*</span>
          </label>
          <div className="bg-secondary bg-opacity-10 rounded-2 p-2 px-3">
            Enter Last Name
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Email ID <span className="text-danger">*</span>
          </label>
          <div className="bg-secondary bg-opacity-10 rounded-2 p-2 px-3">
            Enter Email ID
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Contact Number <span className="text-danger">*</span>
          </label>
          <div className="bg-secondary bg-opacity-10 rounded-2 p-2 px-3">
            Enter Contact Number
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Country <span className="text-danger">*</span>
          </label>
          <div className="bg-secondary bg-opacity-10 rounded-2 p-2 px-3">
            Enter Country
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Address <span className="text-danger">*</span>
          </label>
          <div className="bg-secondary bg-opacity-10 rounded-2 p-2 px-3">
            Enter Address
          </div>
        </div>
      </div>
      <label className="form-label">
        Provide the custom fee for this special registration type &nbsp;{" "}
        <button
          name="editCurrencyTitle"
          className="btn btn-outline-secondary rounded"
          onClick={(e) =>
            handleModel(
              e.target.name,
              "Choose your preferred currency for a seamless experience."
            )
          }
        >
          <i className="bx bx-edit-alt"></i>
        </button>
      </label>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Set Currency</label>
          <div className="d-flex align-items-center gap-2">
            <select
              className="form-select bg-secondary bg-opacity-10 rounded-2 p-2 px-3"
              value={formData.currency[0] || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, currency: [e.target.value] }))
              }
            >
              <option value="" disabled>
                Select Currency
              </option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            Registration Fee <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Amount"
            value={formData.registrationFee}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                registrationFee: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>
      <div className="mt-4">
          <Button
                  label="Save Changes"
                  type="submit"
                  className="btn px-5 btn-warning text-white"
                  loading={buttonLoading}
                  
          onClick={handleSubmit}
                  disabled={!isFormValid || !isFormChanged}
                />
       
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
