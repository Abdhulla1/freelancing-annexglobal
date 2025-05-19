"use client";
import React, { useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Image from "next/image";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
const registerDetails = [
  {
    fullName: "John Doe",
    email: "john.doe@example.com",
    contactNumber: "+1 555-1234",
    country: "USA",
    address: "123 Main St, New York, NY",
    conferenceName: "Global Health Summit 2026",
    registration: [
      { type: "Delegate Registration", tier: "Mid Term", price: 390.23, quantity: 2 }
    ],
    accommodation: {
      occupancy: "Single ($120)",
      period: "Two Nights",
      room: "One",
      accommodationCost: 240.00
    },
    summary: {
      ticketPrice: 780.46,
      accommodationCost: 240.00,
      netTotal: 1020.46
    }
  },
  {
    fullName: "Aisha Khan",
    email: "aisha.khan@example.com",
    contactNumber: "+91 9876543210",
    country: "India",
    address: "45 MG Road, Bengaluru",
    conferenceName: "Primary Healthcare Congress",
    registration: [
      { type: "Student Registration", tier: "Final Call", price: 399.74, quantity: 1 },
      { type: "E-Poster Presentation", tier: "Final Call", price: 399.74, quantity: 1 }
    ],
    accommodation: {
      occupancy: "Single ($120)",
      period: "One Night",
      room: "One",
      accommodationCost: 120.00
    },
    summary: {
      ticketPrice: 799.48,
      accommodationCost: 120.00,
      netTotal: 919.48
    }
  },
  {
    fullName: "Liam Smith",
    email: "liam.smith@example.co.uk",
    contactNumber: "+44 7700 900123",
    country: "UK",
    address: "10 Downing St, London",
    conferenceName: "International Gynecology Meet",
    registration: [
      { type: "Speaker Registration - 1 Days Entry Ticket", tier: "Early Bird", price: 240.71, quantity: 1 },
      { type: "Poster Registration", tier: "Mid Term", price: 390.23, quantity: 1 }
    ],
    accommodation: {
      occupancy: "Single ($120)",
      period: "Two Nights",
      room: "Two",
      accommodationCost: 480.00
    },
    summary: {
      ticketPrice: 630.94,
      accommodationCost: 480.00,
      netTotal: 1110.94
    }
  },
  {
    fullName: "Emma Brown",
    email: "emma.brown@example.com",
    contactNumber: "+61 401 234 567",
    country: "Australia",
    address: "250 George St, Sydney",
    conferenceName: "Healthcare Innovations Expo",
    registration: [
      { type: "Webinar/Virtual Conference Registration ", tier: "Mid Term", price: 390.23, quantity: 1 }
    ],
    accommodation: {
      occupancy: "Single ($120)",
      period: "One Night",
      room: "One",
      accommodationCost: 120.00
    },
    summary: {
      ticketPrice: 390.23,
      accommodationCost: 120.00,
      netTotal: 510.23
    }
  },
  {
    fullName: "Carlos Gomez",
    email: "carlos.gomez@example.mx",
    contactNumber: "+52 55 1234 5678",
    country: "Mexico",
    address: "Avenida Reforma 101, CDMX",
    conferenceName: "Cancer Research Conference",
    registration: [
      { type: "Speaker Registration - 2 Days Entry Ticket", tier: "Final Call", price: 399.74, quantity: 2 },
      { type: "Video Presentation", tier: "Final Call", price: 399.74, quantity: 1 }
    ],
    accommodation: {
      occupancy: "Single ($120)",
      period: "Two Nights",
      room: "Two",
      accommodationCost: 480.00
    },
    summary: {
      ticketPrice: 1199.22,
      accommodationCost: 480.00,
      netTotal: 1679.22
    }
  }
];


export default function RegistrationTabelAdmin({
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
        header: "View Register Details",
        content: <View data={data} />,
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
            <td className="p-2 table-heading">Full Name</td>
            <td className="p-2 table-heading">Email</td>
            <td className="p-2 table-heading">Contact Number</td>
            <td className="p-2 table-heading">Country</td>
            <td className="p-2 table-heading">Confernce Name</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {registerDetails.map((element, i) => (
            <tr key={i}>
              <td className="p-3 table-data">{element.fullName}</td>
              <td className="p-3 table-data">{element.email}</td>
              <td className="p-3 table-data">{element.contactNumber}</td>
              <td className="p-3 table-data">{element.country}</td>
              <td className="p-3 table-data">{element.conferenceName}</td>

              <td className="p-3 table-data">
                <div className="d-flex gap-1 justify-content-center flex-nowrap">
                  {/* <button
                    name="edit"
                    className="btn btn-outline-secondary rounded"
                    onClick={(e) => handleModel(e.target.name, element)}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button> */}
                  {/* <button
                    className="btn btn-outline-secondary rounded"
                    onClick={confirmDelete}
                  >
                    <i className="bx bx-trash-alt"></i>
                  </button> */}
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

    </div>
  );
}

function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <div className="row">
        <div className="col-6">
          <label className="form-label mb-2">Full Name</label>
          <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
            {data.fullName}
          </p>
        </div>
        <div className="col-6">
          <label className="form-label mb-2">Email</label>
          <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
            {data.email}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <label className="form-label mb-2">Contact Number</label>
          <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
            {data.contactNumber}
          </p>
        </div>
        <div className="col-6">
          <label className="form-label mb-2">Country</label>
          <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
            {data.country}
          </p>
        </div>
      </div>

      <div>
        <label className="form-label mb-2">Conference Name</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.conferenceName}
        </p>
      </div>

      <div>
        <label className="form-label mb-2">Address</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.address}
        </p>
      </div>

      {/* Registration Details */}
{data.registration?.length > 0 && (
  <div>
    <label className="form-label mb-2 ">Registration Details</label>

    {/* Header row */}
    <div className="row fw-bold text-secondary border-bottom pb-2 mb-2 mt-2">
      <div className="col-5">Type</div>
      <div className="col-3">Tier</div>
      <div className="col-2">Price ($)</div>
      <div className="col-2">Qty</div>
    </div>

    {/* Data rows */}
    {data.registration.map((item, index) => (
      <div
        key={index}
        className="row align-items-center bg-light rounded-2 p-2 mb-2 shadow-sm"
      >
        <div className="col-5">{item.type || '—'}</div>
        <div className="col-3">{item.tier || '—'}</div>
        <div className="col-2">${item.price?.toFixed(2) || '0.00'}</div>
        <div className="col-2">{item.quantity || '0'}</div>
      </div>
    ))}
  </div>
)}




      {/* Accommodation */}
      {data.accommodation && (
        <div>
          <label className="form-label mb-2">Accommodation Details</label>
          <div className="bg-secondary bg-opacity-10 rounded-2 p-2">
            <p className="mb-1"><strong>Occupancy:</strong> {data.accommodation.occupancy}</p>
            <p className="mb-1"><strong>Period:</strong> {data.accommodation.period}</p>
            <p className="mb-1"><strong>Room:</strong> {data.accommodation.room}</p>
            <p className="mb-0"><strong>Cost:</strong> ${data.accommodation.accommodationCost.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Summary / Net Total */}
      {data.summary && (
        <div>
          <label className="form-label mb-2">Payment Summary</label>
          <div className="bg-secondary bg-opacity-10 rounded-2 p-2">
            <p className="mb-1"><strong>Ticket Price:</strong> ${data.summary.ticketPrice.toFixed(2)}</p>
            <p className="mb-1"><strong>Accommodation Cost:</strong> ${data.summary.accommodationCost.toFixed(2)}</p>
            <p className="mb-0"><strong>Net Total:</strong> <span className="fw-bold text-primary">${data.summary.netTotal.toFixed(2)}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}


function Delete({ data = null }) {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Coupon</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
