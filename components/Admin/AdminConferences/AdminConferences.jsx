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

export default function AdminConferences() {
  const [query, setQuery] = useState("");
  const [filterBy, setFilterBy] = useState("title");
  const [showDropdown, setShowDropdown] = useState(false);
  const [conferenceData, setConferenceData] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newConferenceData, setNewConferenceData] = useState({name: "",file: null,});
  const [loading, setLoading] = useState(false); 
  const toast = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllConference();
        setConferenceData(data);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Failed to Load Conferences",
          detail: "Failed to Load Conferences. Please try again.",
          life: 3000, // Toast duration
        });
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

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
    try {
      let imageUrl = "";

      // Step 1: Upload image if file is present
      if (newConferenceData.file) {
        try {
          const imageUploadResponse = await uploadImage(newConferenceData.file);
          imageUrl = imageUploadResponse.url || "";
        } catch (imageError) {
          toast.current.show({
            severity: "error",
            summary: "Image Upload Error",
            detail: "Failed to upload conference logo. Please try again.",
            life: 3000, // Toast duration
          });
          return;
        }
      }

      // Step 2: Save the conference data
      const payload = {
        name: newConferenceData.name,
        logoUrl: imageUrl,
      };

      const response = await saveConference(payload);

      if (response[0].msg === "Conference created successfully") {
        // Step 3: Update the conference data list
        const data = await getAllConference();
        setConferenceData(data); 
        setShowAddDialog(false);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Conference saved successfully!",
          life: 3000, // Toast duration
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Conference Save Error",
        detail: "Failed to save conference. Please try again.",
        life: 3000, // Toast duration
      });
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
        message={
          <AddNewConference
            data={newConferenceData}
            setData={setNewConferenceData}
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
            <button
              className="btn px-5 btn-warning fw-normal text-white shadow-none"
              onClick={handleSaveConference}
              disabled={
                !newConferenceData.name.trim() || !newConferenceData.file
              }
            >
              Upload
            </button>
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
            className="btn btn-warning text-white col-12 col-md-4"
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
          ) : (
            <div className="row gx-4 gy-4">
              {filteredData.map((item, index) => (
                <div key={index} className="col-12 col-md-4">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function AddNewConference({ data, setData }) {
  const handleNameChange = (e) => {
    setData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleFileChange = (file) => {
    setData((prev) => ({ ...prev, file }));
  };

  return (
    <>
      <FileUpload
        title={"Add Conference Logo"}
        onFileChange={handleFileChange}
      />
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
    </>
  );
}
