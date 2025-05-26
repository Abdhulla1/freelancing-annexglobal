"use client";
import React, { useState, useEffect, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Paginator } from "primereact/paginator";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { getAllSubmittedAbstracts, deleteSubmittedAbstract } from "@/service/pdfUploads";
import Image from "next/image";
import Link from "next/link";

export default function SubmitAbstractTableAdmin() {
  const [abstractData, setAbstractData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({ header: null, content: null });
  const toast = useRef(null);

  const fetchData = async (page = 1, limit = rowsPerPage) => {
    setLoading(true);
    try {
      const res = await getAllSubmittedAbstracts(page, limit);
      setAbstractData(res.data?.detail?.data || []);
      setTotalRecords(res.data?.detail?.total || 0);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Failed to load data.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await deleteSubmittedAbstract(id);
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Abstract deleted successfully.",
        life: 3000,
      });

      const remaining = abstractData.length - 1;
      if (remaining === 0 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchData(currentPage);
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Delete Failed",
        detail: error.message || "Could not delete. Try again.",
        life: 3000,
      });
    }
  };

  const confirmDelete = (id) => {
    confirmDialog({
      message: <Delete />,
      acceptLabel: "OK",
      rejectLabel: "Cancel",
      acceptClassName: "btn px-5 btn-warning text-white shadow-none",
      rejectClassName: "btn px-5 bg-white border me-3 shadow-none",
      accept: () => handleDelete(id),
      reject: () => {},
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
      <Toast ref={toast} />
      <Dialog
        header={sidebarState.header}
        visible={isVisible}
        draggable={false}
        onHide={() => setIsVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {sidebarState.content}
      </Dialog>
      <ConfirmDialog draggable={false} />

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="5"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : abstractData.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>No abstract submissions found</h5>
          <p>Waiting for submissions...</p>
        </div>
      ) : (
        <>
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
              {abstractData.map((element, i) => (
                <tr key={element._id || i}>
                  <td className="p-3 table-data">{element.firstName}</td>
                  <td className="p-3 table-data">{element.lastName}</td>
                  <td className="p-3 table-data">{element.email}</td>
                  <td className="p-3 table-data">{element.conferenceName}</td>
                  <td className="p-3 table-data">{element.submissionDate}</td>
                  <td className="p-3 table-data">
                    <Link href={element.attachFiles} className="text-decoration-none btn btn-outline-secondary rounded">
                      <i className="bx bxs-download"></i>
                    </Link>
                  </td>
                  <td className="p-3 table-data">
                    <div className="d-flex gap-1 justify-content-center flex-nowrap">
                      <button
                        className="btn btn-outline-secondary rounded"
                        onClick={() => confirmDelete(element._id)}
                      >
                        <i className="bx bx-trash-alt"></i>
                      </button>
                      <button
                        name="view"
                        className="btn btn-outline-warning rounded"
                        onClick={() => handleModel("view", element)}
                      >
                        <i className="bx bx-chevron-right"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Paginator
            first={(currentPage - 1) * rowsPerPage}
            rows={rowsPerPage}
            totalRecords={totalRecords}
            onPageChange={(e) => setCurrentPage(Math.floor(e.first / e.rows) + 1)}
            className="mt-4"
          />
        </>
      )}
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
          <p className="text-black rounded-2 p-2">{data.email}</p>
        </div>
        <div className="col-md-6">
          <label className="form-label mb-2">Alternate Email</label>
          <p className="text-black rounded-2 p-2">{data.alternateEmail}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <label className="form-label mb-2">Contact Number</label>
          <p className="text-black rounded-2 p-2">{data.mobileNumber}</p>
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
          <p className="text-black rounded-2 p-2">{data.title}</p>
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
          <p className="text-black rounded-2 p-2">{data.addonMobileNumber}</p>
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
