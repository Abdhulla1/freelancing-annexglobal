"use client";
import React, { useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Image from "next/image";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
import Link from "next/link";
const submissionData = [
  {
    firstName: "John",
    lastName: "Doe",
    emailId: "john.doe@example.com",
    phoneNumber: "+1 555-123-4567",
    address: "123 Main Street, New York",
    country: "USA",
    submissionDate: "2025-05-13",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    emailId: "jane.smith@example.com",
    phoneNumber: "+44 20 7946 0958",
    address: "456 Oak Avenue, London",
    country: "UK",
    submissionDate: "2025-05-14",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    emailId: "alice.johnson@example.com",
    phoneNumber: "+61 2 9374 4000",
    address: "789 Pine Road, Sydney",
    country: "Australia",
    submissionDate: "2025-05-15",
  },
  {
    firstName: "Bob",
    lastName: "Williams",
    emailId: "bob.williams@example.com",
    phoneNumber: "+91 98765 43210",
    address: "101 Maple Lane, Mumbai",
    country: "India",
    submissionDate: "2025-05-16",
  },
  {
    firstName: "Charlie",
    lastName: "Brown",
    emailId: "charlie.brown@example.com",
    phoneNumber: "+81 3-1234-5678",
    address: "202 Cedar Street, Tokyo",
    country: "Japan",
    submissionDate: "2025-05-17",
  },
];


export default function BrochureTableAdmin({
  visibleDetails,
  setVisibleDetails,
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
        header: "View Submit Abstract Form",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Coupons",
        content: <Edit data={data} />,
      },
      add: {
        header: "Add Coupons",
        content: <Add />,
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
            <td className="p-2 table-heading text-nowrap">First Name</td>
            <td className="p-2 table-heading text-nowrap">Last Name</td>
            <td className="p-2 table-heading">Email ID</td>
            <td className="p-2 table-heading text-nowrap">Phone Number</td>
            <td className="p-2 table-heading">Address</td>
            <td className="p-2 table-heading text-nowrap">Submission Date</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {submissionData.map((element, i) => (
            <tr key={i}>
              <td className="p-3 table-data">{element.firstName}</td>
              <td className="p-3 table-data">{element.lastName}</td>
              <td className="p-3 table-data">{element.emailId}</td>
              <td className="p-3 table-data  text-nowrap">{element.phoneNumber}</td>
              <td className="p-3 table-data">{element.address}</td>
              <td className="p-3 table-data">{element.submissionDate}</td>
              <td className="p-3 table-data">
                <div className="d-flex gap-1 justify-content-center flex-nowrap">
                  {/* <button
                    name="edit"
                    className="btn btn-outline-secondary rounded"
                    onClick={(e) => handleModel(e.target.name, element)}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button> */}
                  <button
                    className="btn btn-outline-secondary rounded"
                    onClick={confirmDelete}
                  >
                    <i className="bx bx-trash-alt"></i>
                  </button>
                  <button
                    name="view"
                    className="btn btn-outline-warning rounded"
                    onClick={(e) => handleModel(e.target.name, element)}
                  >
                    <i className="bx bx-chevron-right"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button
        name="add"
        className="btn btn-lg text-white rounded-circle  btn-warning position-absolute"
        style={{ bottom: "50px", right: "50px", zIndex: 1000 }}
        onClick={(e) => handleModel(e.target.name)}
      >
        +
      </button> */}
    </div>
  );
}

function Edit({ data }) {
  return (
    <div className="d-flex gap-3 container flex-column h-100">
      <div className="row">
        <div className="col-6">
          <label htmlFor="couponCode" className="form-label">
            Coupon Code
          </label>
          <input
            type="text"
            name="couponCode"
            value={data.couponCode}
            className="form-control"
            id="couponCode"
            placeholder="Enter Coupon Code"
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="discountType" className="form-label">
            Discount Type*
          </label>
          <select
            name="discountType"
            id="discountType"
            className="form-control"
            onChange={(e) => console.log(e.target.value)}
            required
          >
            <option value="">Select Discount Type</option>
            <option value="Percentage">Percentage</option>
            <option value="Fixed Rate">Fixed Rate</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="discountValue" className="form-label">
            Discount Value
          </label>
          <input
            type="text"
            name="discountValue"
            className="form-control"
            id="discountValue"
            placeholder="Enter Discount Value"
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="date" className="form-label">
            Start & End Date*
          </label>
          <input
            type="text"
            name="date"
            value={data.expiryDate}
            className="form-control"
            id="date"
            placeholder="Enter Discount Value"
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="discountValue" className="form-label">
            Applicable Registration type
          </label>
          <input
            type="text"
            name="registrationtype"
            value={data.name}
            className="form-control"
            id="registrationtype"
            placeholder="Enter Applicable Registration type"
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
}
function Add({ data }) {
  return (
    <div className="d-flex gap-3 container flex-column h-100">
      <div className="row">
        <div className="col-6">
          <label htmlFor="couponCode" className="form-label">
            Coupon Code
          </label>
          <input
            type="text"
            name="couponCode"
            className="form-control"
            id="couponCode"
            placeholder="Enter Coupon Code"
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="discountType" className="form-label">
            Discount Type*
          </label>
          <select
            name="discountType"
            id="discountType"
            className="form-control"
            onChange={(e) => console.log(e.target.value)}
            required
          >
            <option value="">Select Discount Type</option>
            <option value="Percentage">Percentage</option>
            <option value="Fixed Rate">Fixed Rate</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="discountValue" className="form-label">
            Discount Value
          </label>
          <input
            type="text"
            name="discountValue"
            className="form-control"
            id="discountValue"
            placeholder="Enter Discount Value"
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="date" className="form-label">
            Start & End Date*
          </label>
          <input
            type="text"
            name="date"
            className="form-control"
            id="date"
            placeholder="Enter Discount Value"
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="discountValue" className="form-label">
            Applicable Registration type
          </label>
          <input
            type="text"
            name="registrationtype"
            className="form-control"
            id="registrationtype"
            placeholder="Enter Applicable Registration type"
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
}

function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <div className="row">
        <div className="col-4">
          <label className="form-label  mb-2">First Name</label>
          <p className="text-black rounded-2 p-2">
            {data.firstName}
          </p>
        </div>
        <div className="col-4">
          <label className="form-label   mb-2">Last Name</label>
          <p className="text-black rounded-2 p-2">
            {data.lastName}
          </p>
        </div>
        <div className="col-4">
          <label className="form-label col-3 mb-2">Country</label>
          <p className="text-black rounded-2 p-2">
            {data.country}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-7">
          <label className="form-label  mb-2">Email ID</label>
          <p className="text-black rounded-2 p-2">
            {data.emailId}
          </p>
        </div>
  
        <div className="col-4">
          <label className="form-label col-3 mb-2">Contact</label>
          <p className="text-black rounded-2 p-2">
            {data.contact}
          </p>
        </div>
      </div>
   <div className="col-7">
          <label className="form-label col-3 mb-2">Full Address</label>
          <p className="text-black rounded-2 p-2">
            {data.address}
          </p>
        </div>
    
    </div>
  );
}

function Delete({ data = null }) {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Brochure</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
