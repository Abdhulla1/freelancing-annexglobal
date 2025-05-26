"use client";
import React, { useState, useEffect, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Image from "next/image";
import { Dialog } from "primereact/dialog";
import { Paginator } from "primereact/paginator";
import { getAllContactUS, deleteContactUS } from "@/service/cantactUs";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";

export default function ContactUsTabelAdmin() {
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({ header: null, content: null });
  const toast = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Fixed rows per page
  const [totalRecords, setTotalRecords] = useState(0);
  const [ContactUsTabelData, setContactUsTabelData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page = 1, limit = rowsPerPage) => {
    setLoading(true);
    try {
      const data = await getAllContactUS(page, limit);
      setContactUsTabelData(data.data?.detail.data || []);
      setTotalRecords(data.data?.detail.total || 0);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Failed to Load Contact Requests",
        detail: error.message || "Please try again.",
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
      await deleteContactUS(id);
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Contact request has been deleted.",
        life: 3000,
      });
      fetchData(currentPage); 
      // Estimate how many items will remain after deletion
      const remainingItems = ContactUsTabelData.length - 1;

      // If current page has no items left AND it's not the first page, go to previous page
      if (remainingItems === 0 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchData(currentPage); // refresh current page
      }// Refresh after deletion
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Failed to delete. Please try again.",
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
      defaultFocus: "accept",
      accept: () => handleDelete(id),
      reject: () => {},
      className: "custom-confirm-dialog",
    });
  };

  const handleModel = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Contact Request",
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
      ) : ContactUsTabelData.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>No contact requests found</h5>
          <p>Try adding a new contact using the form or wait for new submissions.</p>
        </div>
      ) : (
        <>
          <table className="tabel w-100 table-striped-columns">
            <thead>
              <tr>
                <td className="p-2 table-heading">Name</td>
                <td className="p-2 table-heading">Organization</td>
                <td className="p-2 table-heading">Email</td>
                <td className="p-2 table-heading">Conference</td>
                <td className="p-2 table-heading">Message</td>
                <td className="p-2 table-heading">Action</td>
              </tr>
            </thead>
            <tbody>
              {ContactUsTabelData.map((element, i) => (
                <tr key={element.id || i}>
                  <td className="p-3 table-data">{element.name}</td>
                  <td className="p-3 table-data">{element.organization}</td>
                  <td className="p-3 table-data">{element.email}</td>
                  <td className="p-3 table-data">{element.conference}</td>
                  <td className="p-3 table-data">{element.message}</td>
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
      <div>
        <label className="form-label mb-2">Name</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.name}</p>
      </div>
      <div>
        <label className="form-label mb-2">Organization Name</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.organization}</p>
      </div>
      <div>
        <label className="form-label mb-2">Email</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.email}</p>
      </div>
      <div>
        <label className="form-label mb-2">Contact Number</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.mobileNumber}</p>
      </div>
      <div>
        <label className="form-label mb-2">Conference Name</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.conference}</p>
      </div>
      <div>
        <label className="form-label mb-2">Message</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.message}</p>
      </div>
    </div>
  );
}

function Delete() {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Contact Request</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this contact request? This action cannot be undone.
      </p>
    </div>
  );
}
