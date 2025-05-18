"use client";
import React, { useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Image from "next/image";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
import Link from "next/link";
const detailedSubmissionData = [
  {
    firstName: "John",
    lastName: "Doe",
    emailId: "john.doe@example.com",
    alternateEmail: "j.doe@altmail.com",
    country: "USA",
    contactNumber: "+1 123-456-7890",
    affiliation: "University of Technology",
    titleOfAbstract: "A Study on AI and Its Future Impact",
    address: "123 Main Street, Springfield, USA",
    addonName: "Emily Doe",
    addonEmail: "emily.doe@example.com",
    addonContactNumber: "+1 321-654-0987",
    submissionDate: "2025-05-13",
    conferenceName: "Global Medical Innovations Summit 2025"
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    emailId: "jane.smith@example.com",
    alternateEmail: "jane.alt@example.com",
    country: "UK",
    contactNumber: "+44 20 7946 0958",
    affiliation: "Imperial College London",
    titleOfAbstract: "Blockchain: The Future of Secure Transactions",
    address: "456 Oak Avenue, London, UK",
    addonName: "Mark Smith",
    addonEmail: "mark.smith@example.com",
    addonContactNumber: "+44 20 7123 4567",
    submissionDate: "2025-05-14",
    conferenceName: "International Conference on Medical Technology 2025"
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    emailId: "alice.johnson@example.com",
    alternateEmail: "alice.j@example.net",
    country: "Canada",
    contactNumber: "+1 416-555-1234",
    affiliation: "University of Toronto",
    titleOfAbstract: "The Role of AI in Healthcare",
    address: "789 Pine Road, Toronto, Canada",
    addonName: "Michael Johnson",
    addonEmail: "michael.j@example.com",
    addonContactNumber: "+1 647-321-4321",
    submissionDate: "2025-05-15",
    conferenceName: "World Congress on Healthcare AI 2025"
  },
  {
    firstName: "Bob",
    lastName: "Williams",
    emailId: "bob.williams@example.com",
    alternateEmail: "bob.w@altmail.org",
    country: "Australia",
    contactNumber: "+61 2 9876 5432",
    affiliation: "University of Sydney",
    titleOfAbstract: "5G Technology and Its Global Impact",
    address: "101 Maple Lane, Sydney, Australia",
    addonName: "Anna Williams",
    addonEmail: "anna.w@example.com",
    addonContactNumber: "+61 2 8765 4321",
    submissionDate: "2025-05-16",
    conferenceName: "Medical Technology and Innovation Forum 2025"
  },
  {
    firstName: "Charlie",
    lastName: "Brown",
    emailId: "charlie.brown@example.com",
    alternateEmail: "c.brown@altmail.com",
    country: "Germany",
    contactNumber: "+49 30 1234 5678",
    affiliation: "Technical University of Munich",
    titleOfAbstract: "Quantum Computing: The Next Big Leap",
    address: "202 Cedar Street, Berlin, Germany",
    addonName: "Lucy Brown",
    addonEmail: "lucy.b@example.com",
    addonContactNumber: "+49 30 8765 4321",
    submissionDate: "2025-05-17",
    conferenceName: "European Medical Science Conference 2025"
  },
];



export default function SubmitAbstractTableAdmin({
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
     <table className="tabel w-100 table-striped-columns">
  <thead>
    <tr>
      <td className="p-2 table-heading text-nowrap">First Name</td>
      <td className="p-2 table-heading text-nowrap">Last Name</td>
      <td className="p-2 table-heading">Email ID</td>
      <td className="p-2 table-heading text-nowrap">Confernce Name</td>
      <td className="p-2 table-heading text-nowrap">Submission Date</td>
      <td className="p-2 table-heading">Download</td>
      <td className="p-2 table-heading">Action</td>
    </tr>
  </thead>
  <tbody>
    {detailedSubmissionData.map((element, i) => (
      <tr key={i}>
        <td className="p-3 table-data">{element.firstName}</td>
        <td className="p-3 table-data">{element.lastName}</td>
        <td className="p-3 table-data">{element.emailId}</td>
        <td className="p-3 table-data">{element.conferenceName}</td>
        <td className="p-3 table-data">{element.submissionDate}</td>
        <td className="p-3 table-data">
          <Link
            href="#"
            className="text-decoration-none btn btn-outline-secondary rounded"
          >
            <i className="bx bxs-download"></i>
          </Link>
        </td>
        <td className="p-3 table-data">
          <div className="d-flex gap-1 justify-content-center flex-nowrap">
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


function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <div className="row">
        <div className="col-md-4">
          <label className="form-label mb-2">First Name</label>
          <p className="text-black rounded-2 p-2">{data.firstName}</p>
        </div>
        <div className="col-md-4">
          <label className="form-label mb-2">Last Name</label>
          <p className="text-black rounded-2 p-2">{data.lastName}</p>
        </div>
        <div className="col-md-4">
          <label className="form-label mb-2">Country</label>
          <p className="text-black rounded-2 p-2">{data.country}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <label className="form-label mb-2">Email ID</label>
          <p className="text-black rounded-2 p-2">{data.emailId}</p>
        </div>
        <div className="col-md-6">
          <label className="form-label mb-2">Alternate Email</label>
          <p className="text-black rounded-2 p-2">{data.alternateEmail}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <label className="form-label mb-2">Contact Number</label>
          <p className="text-black rounded-2 p-2">{data.contactNumber}</p>
        </div>
        <div className="col-md-6">
          <label className="form-label mb-2">Affiliation</label>
          <p className="text-black rounded-2 p-2">{data.affiliation}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <label className="form-label mb-2">Full Address</label>
          <p className="text-black rounded-2 p-2">{data.address}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <label className="form-label mb-2">Title of Abstract</label>
          <p className="text-black rounded-2 p-2">{data.titleOfAbstract}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <label className="form-label mb-2">Addon Name</label>
          <p className="text-black rounded-2 p-2">{data.addonName}</p>
        </div>
        <div className="col-md-4">
          <label className="form-label mb-2">Addon Email</label>
          <p className="text-black rounded-2 p-2">{data.addonEmail}</p>
        </div>
        <div className="col-md-4">
          <label className="form-label mb-2">Addon Contact Number</label>
          <p className="text-black rounded-2 p-2">{data.addonContactNumber}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <label className="form-label mb-2">Submission Date</label>
          <p className="text-black rounded-2 p-2">{data.submissionDate}</p>
        </div>
        <div className="col-md-4">
          <label className="form-label mb-2">Conference Name</label>
          <p className="text-black rounded-2 p-2">{data.conferenceName}</p>
        </div>
      </div>
    </div>
  );
}


function Delete({ data = null }) {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Submit Abstract</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
