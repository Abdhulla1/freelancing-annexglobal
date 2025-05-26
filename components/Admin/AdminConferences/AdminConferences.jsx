"use client";
import React, { useState, useEffect, useRef } from "react";
import { getAllConference, saveConference } from "@/service/adminConference";
import Image from "next/image";
import styles from "./AdminConferences.module.css";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import Link from "next/link";
import { uploadImage } from "@/service/mediaManagemnt";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { fetchAdmins } from "@/service/adminService";
import { Paginator } from "primereact/paginator";
import { set } from "nprogress";
import { Button } from 'primereact/button';

export default function AdminConferences() {
  const [query, setQuery] = useState("");
  const [filterBy, setFilterBy] = useState("title");
  const [showDropdown, setShowDropdown] = useState(false);
  const [conferenceData, setConferenceData] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newConferenceData, setNewConferenceData] = useState({
    name: "",
    file: null,
    conferenceBg: null,
    assignedUser: "",
  });
  const [adminsData, setAdminsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9); // Cards per page
  const [totalRecords, setTotalRecords] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);

  const fetchData = async (page = 1, limit = rowsPerPage) => {
    setLoading(true);
    try {
      const [data, userList] = await Promise.all([
        getAllConference(page, limit),
        fetchAdmins(),
      ]);
      setAdminsData(userList);
      setConferenceData(data.data?.detail.data || []); // Assuming data has { results, total }
      setTotalRecords(data.data?.detail.total || 0); // Set total items
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Failed to Load Conferences",
        detail: "Failed to Load Conferences. Please try again.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // Handle search query
  const handleSearch = (e) => setQuery(e.target.value.toLowerCase());

  // Handle filter change
  const handleFilterChange = (value) => setFilterBy(value);

  // Handle adding new conference
  const handleAddConference = () => {
    setShowAddDialog(true);
  };

  // Handle saving new conference
  const handleSaveConference = async () => {
    setButtonLoading(true)
    try {
      let imageUrl = "";
      let bgUrl = "";

      // Check if both files are present
      if (!newConferenceData.file) {
        toast.current.show({
          severity: "warn",
          summary: "Missing Logo",
          detail: "Please upload the conference logo.",
          life: 3000,
        });
        return; // stop if logo missing
      }

      if (!newConferenceData.conferenceBg) {
        toast.current.show({
          severity: "warn",
          summary: "Missing Background Image",
          detail: "Please upload the background image.",
          life: 3000,
        });
        return; // stop if background missing
      }

      // Upload logo image
      try {
        const imageUploadResponse = await uploadImage(newConferenceData.file);
        imageUrl = imageUploadResponse.data?.detail?.message?.[0]?.url || "";
        if (!imageUrl) throw new Error("Empty logo URL");
      } catch (imageError) {
        toast.current.show({
          severity: "error",
          summary: "Image Upload Error",
          detail: "Failed to upload conference logo. Please try again.",
          life: 3000,
        });
        return;
      }

      // Upload background image
      try {
        const bgUploadResponse = await uploadImage(
          newConferenceData.conferenceBg
        );
        bgUrl = bgUploadResponse.data?.detail?.message?.[0]?.url || "";
        if (!bgUrl) throw new Error("Empty background URL");
      } catch (bgError) {
        toast.current.show({
          severity: "error",
          summary: "Background Upload Error",
          detail: "Failed to upload background image. Please try again.",
          life: 3000,
        });
        return;
      }

      // Now, only if both URLs exist, save the conference
      if (!imageUrl || !bgUrl) {
        toast.current.show({
          severity: "warn",
          summary: "Upload Error",
          detail: "Both images must be uploaded successfully.",
          life: 3000,
        });
        return;
      }

      const payload = {
        name: newConferenceData.name,
        user: newConferenceData.assignedUser,
        logoUrl: imageUrl,
        cardBgImage: bgUrl,
      };
      const response = await saveConference(payload);
      if (
        response.status === 201 ||
        response.data?.detail[0]?.msg === "Conference created successfully"
      ) {
        fetchData(currentPage);
        setShowAddDialog(false);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Conference saved successfully!",
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Update Failed",
          detail:
            response.data?.detail[0]?.msg || "Unexpected response from server.",
          life: 3000,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Conference Save Error",
        detail: error || "Failed to save conference. Please try again.",
        life: 3000,
      });
    }finally{
      setButtonLoading(false)
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setShowAddDialog(false);
  };

  // Filter data based on query and selected filter (title or date)
  const filteredData = conferenceData.filter((item) => {
    const searchQuery = query.toLowerCase();

    if (filterBy === "title") {
      return item.name.toLowerCase().includes(searchQuery);
    } else if (filterBy === "date") {
      return item.date && item.date.toLowerCase().includes(searchQuery);
    }
    return true;
  });
  return (
    <div className="container p-2">
      <ConfirmDialog
        visible={showAddDialog}
        onHide={handleCancel}
        draggable={false}
        message={
          <AddNewConference
            data={newConferenceData}
            setData={setNewConferenceData}
            userList={adminsData}
          />
        }
        header="Add New Conference"
        footer={
          <div className="d-flex justify-content-end">
            <button
              className="btn px-5 bg-white fw-normal border me-3 shadow-none"
              onClick={handleCancel}
            >
              Cancel
            </button>
                         <Button label="Upload" onClick={handleSaveConference} className="btn px-5 btn-warning fw-normal text-white shadow-none"  loading={buttonLoading}      disabled={
                !newConferenceData.name.trim() ||
                !newConferenceData.file ||
                !newConferenceData.conferenceBg ||
                !newConferenceData.assignedUser
              } style={{ outline: 'none', boxShadow: 'none' }}/>            
          </div>
        }
        className="custom-confirm-dialog"
      />

      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4">
        <Toast ref={toast} />
        {/* Title */}
        <h5 className="fw-bold m-0">Conference</h5>

        {/* Search & Filter */}
        <div className="d-flex col-12 col-md-7 align-items-start flex-wrap flex-md-nowrap gap-2 ">
          {/* Search Bar */}
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bx bx-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder={`Search by ${
                filterBy === "title"
                  ? "conference name"
                  : "date (e.g., 17 Mar 2026)"
              }`}
              value={query}
              onChange={handleSearch}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="position-relative">
            <button
              className="btn btn-outline-secondary d-flex align-items-center gap-1"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <i className="bx bx-filter-alt"></i> Filters
            </button>
            {showDropdown && (
              <div
                className="position-absolute bg-white border rounded shadow-sm mt-1 p-2"
                style={{ zIndex: 1000 }}
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filter"
                    value="title"
                    id="filterTitle"
                    checked={filterBy === "title"}
                    onChange={() => handleFilterChange("title")}
                  />
                  <label className="form-check-label" htmlFor="filterTitle">
                    Name
                  </label>
                </div>
                <div className="form-check mt-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filter"
                    value="date"
                    id="filterDate"
                    checked={filterBy === "date"}
                    onChange={() => handleFilterChange("date")}
                  />
                  <label className="form-check-label" htmlFor="filterDate">
                    Date
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Add New Conference Button */}
          <button
            className="btn btn-warning text-white col-12 col-md-7 col-lg-5 col-xl-4"
            onClick={handleAddConference}
          >
            + Add New Conference
          </button>
        </div>
      </div>

      <div className="row p-1">
        <div className="col-12 p-2 rounded-2">
          <h6 className="fw-bold mb-5">All Conference</h6>
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px" }}
            >
              <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="5"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            </div>
          ) : conferenceData.length === 0 ? (
            <div className="text-center w-100 py-5">
              <h5>No conferences found</h5>
              <p>Try adding a new conference using the button above.</p>
            </div>
          ) : (
            <div className="row gx-4 gy-4" >
              {filteredData.map((item, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-6 col-xl-4 ">
                  <div
                    className={`p-3 rounded d-flex align-items-center justify-content-between ${styles["conference-card"]}`}
                  >
                    {/* Left Image */}
                    <Image
                      src={item.logoUrl}
                      alt="conference Logo"
                      width={80}
                      height={80}
                      className="rounded-circle"
                      unoptimized
                    />

                    {/* Title */}
                    <div className="mx-2 flex-grow-1 ">{item.name}</div>
                    {/* Button */}
                    <Link
                      className="btn btn-warning text-white"
                      href={`/admin-annex-global-conferences/dashboard/conference/${item._id}`}
                    >
                      <i className="bx bx-right-arrow-alt"></i>
                    </Link>
                  </div>
                </div>
              ))}
                <Paginator
        first={(currentPage - 1) * rowsPerPage}
        rows={rowsPerPage}
        totalRecords={totalRecords}
        onPageChange={(e) => setCurrentPage(Math.floor(e.first / e.rows) + 1)}
        className="mt-5"
      />
            </div>
          )}
          
        </div>
        
      </div>
    
    </div>
  );
}

export function AddNewConference({ data, setData, userList }) {
  const handleNameChange = (e) => {
    setData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleFileChange = (file) => {
    setData((prev) => ({ ...prev, file }));
  };
  const handleConferenceBgChange = (conferenceBg) => {
    setData((prev) => ({ ...prev, conferenceBg }));
  };
  const handleUserSelect = (e) => {
    setData((prev) => ({ ...prev, assignedUser: e.target.value }));
  };
  return (
    <>
      <div className="mb-4 mt-4">
        <label htmlFor="conferenceName" className="form-label">
          Conference Name*
        </label>
        <input
          type="text"
          name="conferenceName"
          className={`form-control `}
          id="conferenceName"
          placeholder="Enter Conference Name"
          required
          onChange={handleNameChange}
          autoComplete="off"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="assignUser" className="form-label">
          Assign to User*
        </label>
        <select
          className="form-control"
          id="assignUser"
          onChange={handleUserSelect}
          required
          value={data.assignedUser || ""}
        >
          <option value="" disabled>
            Select a user
          </option>
          {userList.map((user, i) => (
            <option key={i} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>
      </div>
      <FileUpload
        title={"Add Conference Logo *"}
        onFileChange={handleFileChange}
      />
      <FileUpload
        title={"Add Conference Card Background *"}
        onFileChange={handleConferenceBgChange}
      />
    </>
  );
}
