"use client";
import React, { useState, useEffect, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Paginator } from "primereact/paginator";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import Image from "next/image";
import { getAllNewsLetters, deleteNewsLetter } from "@/service/newsletter";

export default function NewsLetterTable() {
  const toast = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });

  const [newsLetterData, setNewsLetterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchData = async (page = 1, limit = rowsPerPage) => {
    setLoading(true);
    try {
      const res = await getAllNewsLetters(page, limit);
      setNewsLetterData(res.data?.detail?.data || []);
      setTotalRecords(res.data?.detail?.total || 0);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Failed to load newsletter data.",
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
      await deleteNewsLetter(id);
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Newsletter record deleted successfully.",
        life: 3000,
      });
      // Estimate how many items will remain after deletion
      const remainingItems = newsLetterData.length - 1;

      // If current page has no items left AND it's not the first page, go to previous page
      if (remainingItems === 0 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchData(currentPage); // refresh current page
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Delete Failed",
        detail: error.message || "Failed to delete. Try again.",
        life: 3000,
      });
    }
  };

  const confirmDelete = (id) => {
    confirmDialog({
      message: <Delete />,
      acceptLabel: "Delete",
      rejectLabel: "Cancel",
      acceptClassName: "btn px-5 btn-danger text-white shadow-none",
      rejectClassName: "btn px-5 bg-white border me-3 shadow-none",
      accept: () => handleDelete(id),
      reject: () => {},
      className: "custom-confirm-dialog",
    });
  };

  const confirmView = (data) => {
    confirmDialog({
      message: <View data={data} />,
      header: "Subscriber Details",
      acceptLabel: "Close",
      rejectLabel: "Cancel",
      acceptClassName: "btn px-5 btn-secondary text-white shadow-none",
      rejectClassName: "btn px-5 bg-white border me-3 shadow-none",
      accept: () => {},
      reject: () => {},
      className: "custom-confirm-dialog",
    });
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
      ) : newsLetterData.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>No subscribers found</h5>
          <p>Try collecting new subscriptions through the site form.</p>
        </div>
      ) : (
        <>
          <table className="tabel w-100  table-striped-columns">
            <thead>
              <tr>
                <td className="p-2 table-heading">Name</td>
                <td className="p-2 table-heading">Email</td>
                <td className="p-2 table-heading">Conference Name</td>
                <td className="p-2 table-heading">Message</td>
                <td className="p-2 table-heading">Subscriber</td>
                <td className="p-2 table-heading">Action</td>
              </tr>
            </thead>
            <tbody>
              {newsLetterData.map((element, i) => (
                <tr key={i}>
                  <td className="p-3 table-data">{element.name}</td>
                  <td className="p-3 table-data">{element.email}</td>
                  <td className="p-3 table-data">{element.conference}</td>
                  <td className="p-3  table-data text-truncate" style={{maxWidth:'200px'}}>{element.comment}</td>
                  <td className="p-3  table-data  ">
                    {" "}
                    <button
                      className="btn text-danger"
                      onClick={() => confirmDelete(element._id)}
                    >
                      Remove
                    </button>
                  </td>

                  <td className="p-3 table-data ">
                    <div className="d-flex gap-1  justify-content-center flex-nowrap">
                      <button
                        name="view"
                        className="btn btn-outline-warning rounded"
                        onClick={(e) => confirmView(element)}
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
            onPageChange={(e) =>
              setCurrentPage(Math.floor(e.first / e.rows) + 1)
            }
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
        <label className="form-label mb-2">Email</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.email}</p>
      </div>
      <div>
        <label className="form-label mb-2">Conference</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.conference}
        </p>
      </div>
      <div>
        <label className="form-label mb-2">Message</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.comment}
        </p>
      </div>
    </div>
  );
}

function Delete() {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Newsletter Entry</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this newsletter subscription? This
        action cannot be undone.
      </p>
    </div>
  );
}
