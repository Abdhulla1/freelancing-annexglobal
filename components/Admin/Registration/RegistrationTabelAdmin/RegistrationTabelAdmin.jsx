"use client";
import React, { useState, useEffect, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Image from "next/image";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { getAllRegisters } from "@/service/registration";
import { Paginator } from "primereact/paginator";
import { ProgressSpinner } from "primereact/progressspinner";

const currencySymbols = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CNY: "¥",
};
export default function RegistrationTabelAdmin({userData}) {
  const [isVisible, setIsVisible] = useState(false);
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Fixed rows per page
  const [totalRecords, setTotalRecords] = useState(0);
  const [registersTableData, setRegistersTableData] = useState([]);

  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });
  const getSymbol = (currency) => {
    return currencySymbols[currency] || "";
  };
  const fetchData = async (page = 1, limit = rowsPerPage) => {
    setLoading(true);
    try {
      const data = await getAllRegisters(page, limit,userData.conferenceName);
      setRegistersTableData(data.data?.detail.data || []);

      setTotalRecords(data.data?.detail.total || 0);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Failed to Load Registers",
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

  const handleModel = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Register Details",
        content: <View data={data} getSymbol={getSymbol} />,
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
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="5"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : Array.isArray(registersTableData) &&
        registersTableData.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>No Payment Registers Found</h5>
          <p>
            There are no records to show at the moment. Please check back later.
          </p>
        </div>
      ) : Array.isArray(registersTableData) ? (
        <>
          <table className="tabel w-100 table-striped-columns">
            <thead>
              <tr>
                <td className="p-2 table-heading">Name</td>
                <td className="p-2 table-heading">Email</td>
                <td className="p-2 table-heading">Contact Number</td>
                <td className="p-2 table-heading">Country</td>
                <td className="p-2 table-heading">Conference Name</td>
                <td className="p-2 table-heading">Action</td>
              </tr>
            </thead>
            <tbody>
              {registersTableData.map((element, i) => (
                <tr key={i}>
                  <td className="p-3 table-data">
                    {element?.personalDetails?.firstName || "—"}
                  </td>
                  <td className="p-3 table-data">
                    {element?.personalDetails?.email || "—"}
                  </td>
                  <td className="p-3 table-data">
                    {element?.personalDetails?.mobileNumber || "—"}
                  </td>
                  <td className="p-3 table-data">
                    {element?.personalDetails?.country || "—"}
                  </td>
                  <td className="p-3 table-data">
                    {element?.conferenceName || "—"}
                  </td>
                  <td className="p-3 table-data">
                    <div className="d-flex gap-1 justify-content-center flex-nowrap">
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
            onPageChange={(e) =>
              setCurrentPage(Math.floor(e.first / e.rows) + 1)
            }
            className="mt-4"
          />
        </>
      ) : (
        <div className="text-center text-danger py-5">
          <h5>Error displaying payment registers.</h5>
          <p>Please try refreshing the page.</p>
        </div>
      )}
    </div>
  );
}

function View({ data, getSymbol }) {
  const selectedCurrency = getSymbol(data.personalDetails.currency);
  console.log(data.pricing.registration);

  return (
    <div className="d-flex gap-4 flex-column">
      <div className="row">
        <div className="col-6">
          <label className="form-label mb-2">Full Name</label>
          <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
            {data.personalDetails.firstName +
              " " +
              data.personalDetails.lastName}
          </p>
        </div>
        <div className="col-6">
          <label className="form-label mb-2">Email</label>
          <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
            {data.personalDetails.email}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <label className="form-label mb-2">Contact Number</label>
          <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
            {data.personalDetails.mobileNumber}
          </p>
        </div>
        <div className="col-6">
          <label className="form-label mb-2">Country</label>
          <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
            {data.personalDetails.country}
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
          {data.personalDetails.address}
        </p>
      </div>

      {/* Registration Details */}
      {data?.pricing?.registration &&
      typeof data.pricing.registration === "object" &&
      Object.keys(data.pricing.registration).length > 0 ? (
        <>
          <label className="form-label mb-2">Registration Details</label>

          {/* Header row */}
          <div className="row fw-bold text-secondary border-bottom pb-2 mb-2 mt-2">
            <div className="col-5">Type</div>
            <div className="col-3">Tier</div>
            <div className="col-2">Price ({selectedCurrency})</div>
            <div className="col-2">Qty</div>
          </div>

          {/* Data rows */}
          {Object.entries(data.pricing.registration).map(
            ([type, details], index) => (
              <div
                key={index}
                className="row align-items-center bg-light rounded-2 p-2 mb-2 shadow-sm"
              >
                <div className="col-5">{type}</div>
                <div className="col-3">{details?.category || "—"}</div>
                <div className="col-2">
                  {selectedCurrency}
                  {typeof details?.price === "number"
                    ? details.price.toFixed(2)
                    : "0.00"}
                </div>
                <div className="col-2">{details?.quantity || "0"}</div>
              </div>
            )
          )}
        </>
      ) : (
        <div className="bg-light rounded-2 p-3 text-muted">
          No registration details available.
        </div>
      )}

      {/* Accommodation */}
      {data.pricing && (
        <div>
          <label className="form-label mb-2">Accommodation Details</label>
          <div className="bg-secondary bg-opacity-10 rounded-2 p-2">
            <p className="mb-1">
              <strong>Occupancy:</strong> {data.pricing?.occupancy}
            </p>
            <p className="mb-1">
              <strong>Period:</strong> {data.pricing?.period}
            </p>
            <p className="mb-1">
              <strong>Room:</strong> {data.pricing?.room}
            </p>
            <p className="mb-0">
              <strong>Cost:</strong> {selectedCurrency}
              {data.pricing?.accommodationCost.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* Summary / Net Total */}
      {data.pricing && (
        <div>
          <label className="form-label mb-2">Payment Summary</label>
          <div className="bg-secondary bg-opacity-10 rounded-2 p-2">
            <p className={`mb-1 `}>
              <strong>Payment Status:</strong>{" "}
              <span
                className={`fw-bold ${
                  data.paymentStatus === "Completed" ? "text-success" : ""
                }`}
              >
                {" "}
                {data.paymentStatus}
              </span>
            </p>
            <p className="mb-1">
              <strong>Ticket Price:</strong> {selectedCurrency}
              {data.pricing.ticketPrice.toFixed(2)}
            </p>
            <p className="mb-1">
              <strong>Accommodation Cost:</strong> {selectedCurrency}
              {data.pricing.accommodationCost.toFixed(2)}
            </p>
            <p className="mb-0">
              <strong>Net Total:</strong>{" "}
              <span className="fw-bold text-primary">
                {selectedCurrency}
                {data.pricing.total.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
