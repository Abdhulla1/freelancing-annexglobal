import React, { useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Image from "next/image";
import DropZoneFile from "@/components/Reusable/DropeZone/DropZoneFile";
const scientificProgramData = [
  {
    programName:
      "Annual Congress On Gynecology, Obstetrics, And Women’s Health",
    programDate: "15 Mar 2025",
    brochureFile: "brochure.pdf",
  },
  {
    programName: "Global Summit on Women’s Reproductive Health",
    programDate: "22 Apr 2025",
    brochureFile: "reproductive_health.pdf",
  },
  {
    programName: "International Conference on Midwifery and Neonatal Care",
    programDate: "10 May 2025",
    brochureFile: "midwifery_care.pdf",
  },
  {
    programName: "World Congress on Women’s Wellness and Fertility",
    programDate: "5 Jun 2025",
    brochureFile: "womens_wellness.pdf",
  },
  {
    programName: "Symposium on Advances in Obstetrics and Gynecologic Surgery",
    programDate: "18 Jul 2025",
    brochureFile: "gynecologic_surgery.pdf",
  },
  {
    programName: "European Meet on Maternal-Fetal Medicine",
    programDate: "2 Aug 2025",
    brochureFile: "maternal_fetal.pdf",
  },
  {
    programName: "Conference on Endometriosis and Pelvic Pain Management",
    programDate: "25 Sep 2025",
    brochureFile: "endometriosis_pain.pdf",
  },
  {
    programName: "Summit on Breast Cancer Awareness and Women’s Oncology",
    programDate: "12 Oct 2025",
    brochureFile: "oncology_awareness.pdf",
  },
  {
    programName: "Workshop on PCOS, Infertility, and Hormonal Disorders",
    programDate: "6 Nov 2025",
    brochureFile: "pcos_workshop.pdf",
  },
  {
    programName: "Congress on Pregnancy, Birth, and Beyond",
    programDate: "1 Dec 2025",
    brochureFile: "pregnancy_congress.pdf",
  },
  {
    programName: "International Forum on Women’s Health Innovation",
    programDate: "20 Jan 2026",
    brochureFile: "health_innovation.pdf",
  },
];

export default function ScientificProgramAdmin({
  visibleDetails,
  setVisibleDetails,
}) {
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
  const confirmEdit = (data) => {
    const accept = () => {
      console.log("accepted");
    };
    const reject = () => {
      console.log("rejectcted");
    };
    confirmDialog({
      message: <Edit data={data} />,
      header: "Edit Scientific Program",
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
  const confirmAdd = (data) => {
    const accept = () => {
      console.log("accepted");
    };
    const reject = () => {
      console.log("rejectcted");
    };
    confirmDialog({
      message: <Add data={data} />,
      header: "Add Scientific Program",
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



  return (
    <div className="table-responsive">

      <ConfirmDialog draggable={false} />
      <table className="tabel w-100  table-striped-columns">
        <thead>
          <tr>
            <td className="p-2 table-heading">Program Name</td>
            <td className="p-2 table-heading">Program Date</td>
            <td className="p-2 table-heading">Brochure File</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {scientificProgramData.map((element, i) => (
            <tr key={i}>
              <td className="p-3 table-data ">{element.programName}</td>
              <td className="p-3  table-data  text-nowrap">
                {element.programDate}
              </td>
              <td className="p-3 table-data text-nowrap">
                <i className="pi pi-file-pdf"></i>&nbsp;{element.brochureFile}
              </td>
              <td className="p-3 table-data ">
                <div className="d-flex gap-1  justify-content-center flex-nowrap">
                  <button
                    name="edit"
                    className="btn btn-outline-secondary rounded"
                    onClick={confirmEdit}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded"
                    onClick={confirmDelete}
                  >
                    <i className="bx bx-trash-alt"></i>
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
        onClick={confirmAdd}
      >
        +
      </button>
    </div>
  );
}

function Edit({ data }) {
  return (
    <div className="container-fluid px-3">
      <div
        className="d-flex flex-column gap-3 mx-auto"
        style={{
          width: '100%',
          maxWidth: '550px', 
        }}
      >
        <div>
          <label htmlFor="title" className="form-label">
            Program Title*
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            placeholder="Enter Program Title"
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Program Date*
          </label>
          <input
            type="text"
            name="date"
            className="form-control"
            id="date"
            placeholder="Enter Program Date"
            required
            autoComplete="off"
          />
        </div>

        <div>
          <label className="form-label">Upload Program</label>
          <DropZoneFile />
        </div>
      </div>
    </div>
  );
}
function Add({ data }) {
  return (
    <div className="container-fluid px-3">
      <div
        className="d-flex flex-column gap-3 mx-auto"
        style={{
          width: '100%',
          maxWidth: '550px', 
        }}
      >
        <div>
          <label htmlFor="title" className="form-label">
            Program Title*
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            placeholder="Enter Program Title"
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Program Date*
          </label>
          <input
            type="text"
            name="date"
            className="form-control"
            id="date"
            placeholder="Enter Program Date"
            required
            autoComplete="off"
          />
        </div>

        <div>
          <label className="form-label">Upload Program</label>
          <DropZoneFile />
        </div>
      </div>
    </div>
  );
}


function Delete({ data = null }) {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Scientific Program</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
