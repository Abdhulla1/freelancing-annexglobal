"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../ConferencePageAdmin/LandingPage/RichTextEditor";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";

const attendeesData = [
  {
    fullName: "Dr. Emily Carter",
    affiliation: "Princeton University",
    country: "USA",
  },
  {
    fullName: "Prof. Rajesh Kumar",
    affiliation: "Indian Institute of Science",
    country: "India",
  },
  {
    fullName: "Dr. Aiko Tanaka",
    affiliation: "University of Tokyo",
    country: "Japan",
  },
  {
    fullName: "Dr. Marcus Müller",
    affiliation: "Max Planck Institute",
    country: "Germany",
  },
  {
    fullName: "Prof. Laura Bianchi",
    affiliation: "University of Milan",
    country: "Italy",
  },
  {
    fullName: "Dr. Ahmed El-Sayed",
    affiliation: "Cairo University",
    country: "Egypt",
  },
  {
    fullName: "Dr. Olivia Smith",
    affiliation: "University of Melbourne",
    country: "Australia",
  },
  {
    fullName: "Prof. Chen Wei",
    affiliation: "Tsinghua University",
    country: "China",
  },
  {
    fullName: "Dr. Isabella García",
    affiliation: "University of Buenos Aires",
    country: "Argentina",
  },
  {
    fullName: "Dr. Jean Dupont",
    affiliation: "Sorbonne University",
    country: "France",
  }
];



export default function ConferenceAttendees({
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
  const handleSidebar = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Conference Attendee",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Conference Attendee",
        content: <Edit data={data} />,
      },
      add: {
        header: "Add Conference Attendee",
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
      <Sidebar
        visible={isVisible}
        header={<h5 className="text-black">{sidebarState.header}</h5>}
        position="right"
        dismissable={false}
        onHide={() => setIsVisible(false)}
        className="custom-sidebar"
      >
        <>
          <div className="d-flex flex-column justify-content-between k h-100">
            {/* Content Area */}

            {sidebarState.content}

            {/* Sticky Button Area */}
            {sidebarState.header !== "View Testimonial" && (
              <div className="bg-secondary bg-opacity-10 p-2 d-flex justify-content-center align-items-center gap-3 w-100">
                <button
                  className="btn px-5 bg-white border"
                  onClick={() => setIsVisible(false)}
                >
                  Close
                </button>
                <button className="btn px-5 btn-warning text-white">
                  Save
                </button>
              </div>
            )}
          </div>
        </>
      </Sidebar>
      <ConfirmDialog draggable={false} />
      <table className="tabel w-100  table-striped-columns" >
        <thead>
          <tr>
            <td className="p-2 table-heading">#</td>
            <td className="p-2 table-heading">Full Name</td>
            <td className="p-2 table-heading">Affiliation</td>
            <td className="p-2 table-heading">Country</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {attendeesData.map((element, i) => (
            <tr key={i}>

            <td className="p-3 table-data">{i+1}</td>
            <td className="p-3 table-data">{element.fullName}</td>
<td className="p-3 table-data">{element.affiliation}</td>
<td className="p-3 table-data">{element.country}</td>

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
                    onClick={confirmDelete}
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

function Edit({ data }) {

  return (
<div className="d-flex gap-3 flex-column">
{/* Full Name */}
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">
          Full Name*
        </label>
        <input
          type="text"
          name="fullName"
          value={data.fullName}
          className="form-control"
          id="fullName"
          placeholder="Enter Full Name"
          onChange={(e) => console.log(e.target.value)}
          required
        />
      </div>

      {/* Affiliation */}
      <div className="mb-3">
        <label htmlFor="affiliation" className="form-label">
          Affiliation*
        </label>
        <input
          type="text"
          name="affiliation"
          value={data.affiliation}
          className="form-control"
          id="affiliation"
          placeholder="Enter Affiliation"
          onChange={(e) => console.log(e.target.value)}
          required
        />
      </div>

      {/* Country */}
      <div className="mb-3">
        <label htmlFor="country" className="form-label">
          Country*
        </label>
        <input
          type="text"
          name="country"
          value={data.country}
          className="form-control"
          id="country"
          placeholder="Enter Country"
          onChange={(e) => console.log(e.target.value)}
          required
        />
      </div>

</div>

  );
}
function Add({ data }) {

  return (
    <div className="d-flex gap-3 flex-column">

      {/* Full Name */}
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">
          Full Name*
        </label>
        <input
          type="text"
          name="fullName"
          className="form-control"
          id="fullName"
          placeholder="Enter Full Name"
          required
        />
      </div>

      {/* Affiliation */}
      <div className="mb-3">
        <label htmlFor="affiliation" className="form-label">
          Affiliation*
        </label>
        <input
          type="text"
          name="affiliation"
          className="form-control"
          id="affiliation"
          placeholder="Enter Affiliation"
          required
        />
      </div>

      {/* Country */}
      <div className="mb-3">
        <label htmlFor="country" className="form-label">
          Country*
        </label>
        <input
          type="text"
          name="country"
          className="form-control"
          id="country"
          placeholder="Enter Country"
          required
        />
      </div>
    </div>
  );
}
function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <div>
        <label className="form-label mb-2">Full Name</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.fullName}</p>
      </div>
      <div>
        <label className="form-label mb-2">Affiliation</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.affiliation}</p>
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
