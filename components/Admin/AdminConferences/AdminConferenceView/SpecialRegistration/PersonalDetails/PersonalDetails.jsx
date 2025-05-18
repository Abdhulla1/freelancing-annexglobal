"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";

export default function PersonalDetails({ toast }) {
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
      editCurrency: {
        header: "Edit Currency ",
        content: <EditCurrency data={data} />,
      },
      editTitle: {
        header: "Edit Personal Detail Title",
        content: <EditTitle data={data} />,
      },
      editCurrencyTitle: {
        header: "Edit Currency Detail Title",
        content: <EditTitle data={data} />,
      },
    };

    const selected = componentsMap[type];
    if (selected) {
      setSidebarState(selected);
      setIsVisible(true);
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
              defaultValue=""
            >
              <option value="" disabled>
                Select Currency
              </option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
            <button
              name="editCurrency"
              className="btn btn-outline-secondary rounded"
              onClick={(e) => handleModel(e.target.name)}
            >
              <i className="bx bx-edit-alt"></i>
            </button>
          </div>
        </div>
           <div className="col-6 mb-3">
        <label className="form-label">
          Registration Fee <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          name="couponCode"
          className="form-control"
          id="couponCode"
          placeholder="Enter Amount"
          onChange={(e) => console.log(e.target.value)}
          required
        />{" "}
      </div>
      </div>
    </div>
  );
}

function EditCurrency({ data }) {
  return (
    <div className="p-3">
      <div className="col-8 mb-3">
        <label className="form-label">
          Enter Currency dropdown name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          name="couponCode"
          className="form-control"
          id="couponCode"
          placeholder="Select Currency"
          onChange={(e) => console.log(e.target.value)}
          required
        />{" "}
      </div>
      <div className=" mb-3">
        <label className="form-label">Currency List</label>
        <div className="rounded border p-4 ">
          {[0,0,0].map((_e,i)=>(
<div key={i}  className="row gap-2 align-items-center">
            <span className="rounded-circle bg-secondary bg-opacity-10 mt-3 p-1 d-flex justify-content-center align-items-center" style={{height:'40px',width:'40px'}}>
              {i+1}
            </span>
            <div className="col-5 mb-3">
              <label className="form-label">
               Label

              </label>
              <input
                type="text"
                name="currency"
                className="form-control"
 
                placeholder="Enter Currency"
                onChange={(e) => console.log(e.target.value)}
                required
              />{" "}
            </div>
            <div className="col-5 mb-3">
              <label className="form-label">
               Value

              </label>
              <input
                type="text"
                name="currency"
                className="form-control"
 
                placeholder="Enter Currency"
                onChange={(e) => console.log(e.target.value)}
                required
              />{" "}
            </div>
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
