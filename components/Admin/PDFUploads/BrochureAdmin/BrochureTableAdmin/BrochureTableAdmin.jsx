"use client";
import React, { useState, useEffect, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Paginator } from "primereact/paginator";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { getAllBrochures, deleteBrochure } from "@/service/pdfUploads";
import Image from "next/image";

export default function BrochureTableAdmin({ visibleDetails, setVisibleDetails }) {
  const [brochureData, setBrochureData] = useState([]);
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
      const res = await getAllBrochures(page, limit);
      setBrochureData(res.data?.detail?.data || []);
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
      await deleteBrochure(id);
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Brochure deleted successfully.",
        life: 3000,
      });

      const remaining = brochureData.length - 1;
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
        header: "View Brochure Form",
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
      ) : brochureData.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>No brochure requests found</h5>
          <p>Waiting for new brochure submissions.</p>
        </div>
      ) : (
        <>
          <table className="tabel w-100 table-striped-columns">
            <thead>
              <tr>
                <td className="p-2 table-heading text-nowrap">First Name</td>
                <td className="p-2 table-heading text-nowrap">Last Name</td>
                <td className="p-2 table-heading">Email ID</td>
                <td className="p-2 table-heading text-nowrap">Phone Number</td>
                <td className="p-2 table-heading">Conference Name</td>
                <td className="p-2 table-heading text-nowrap">Submission Date</td>
                <td className="p-2 table-heading">Action</td>
              </tr>
            </thead>
            <tbody>
              {brochureData.map((element, i) => (
                <tr key={element._id || i}>
                  <td className="p-3 table-data">{element.firstName}</td>
                  <td className="p-3 table-data">{element.lastName}</td>
                  <td className="p-3 table-data">{element.email}</td>
                  <td className="p-3 table-data text-nowrap">{element.phoneNumber}</td>
                  <td className="p-3 table-data">{element.conferenceName}</td>
                  <td className="p-3 table-data">{element.submissionDate}</td>
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
            {data.contry}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-7">
          <label className="form-label  mb-2">Email ID</label>
          <p className="text-black rounded-2 p-2">
            {data.email}
          </p>
        </div>
  
        <div className="col-4">
          <label className="form-label col-3 mb-2">Contact</label>
          <p className="text-black rounded-2 p-2">
            {data.phoneNumber}
          </p>
        </div>
      
      </div>
      <div className="row">
  <div className="col-7">
          <label className="form-label col-3 mb-2">Full Address</label>
          <p className="text-black rounded-2 p-2">
            {data.address}
          </p>
        </div>
          <div className="col-4">
          <label className="form-label  mb-2">Conference Name</label>
          <p className="text-black rounded-2 p-2">
            {data.conferenceName}
          </p>
        </div>
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
