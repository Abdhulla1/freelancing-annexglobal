"use client";
import React, { useState, useEffect } from "react";
import { getAllConference } from "@/service/adminConference";
import Image from "next/image";
import styles from "./AdminConferences.module.css";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import Link from "next/link";
import { uploadImage } from "@/service/mediaManagemnt";
export default function AdminConferences() {
  const [query, setQuery] = useState("");
  const [filterBy, setFilterBy] = useState("title");
  const [showDropdown, setShowDropdown] = useState(false);
  const [conferenceData, setConferenceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllConference();
        setConferenceData(data);
      } catch (error) {
        console.error("Failed to fetch conference data", error);
      }
    };
    fetchData();
  }, []);
    const handleSearch = (e) => setQuery(e.target.value.toLowerCase());

  const addNewConference = () => {
    const accept = () => {
      console.log("Added");
    };
    const reject = () => {
      console.log("Closed");
    };
    confirmDialog({
      message: <AddNewConference/>,
      acceptLabel: "Upload",
      rejectLabel: "Cancel",
      header: "Add New Conference",
      acceptClassName: "btn px-5 btn-warning fw-normal text-white shadow-none",
      rejectClassName: "btn px-5 bg-white fw-normal border me-3 shadow-none",
      defaultFocus: "accept",
      accept,
      reject,
      className: "custom-confirm-dialog",
    });
  };
  const filteredData = conferenceData.filter((item) => {
    if (filterBy === "title") {
      return item.name.toLowerCase().includes(query);
    } else if (filterBy === "date") {
      return item.date.toLowerCase().includes(query);
    }
    return true;
  });
  return (
    <div className="container p-2">

          <ConfirmDialog draggable={false} />
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4">
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
                        onChange={() => setFilterBy("title")}
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
                        onChange={() => setFilterBy("date")}
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
                onClick={addNewConference}
              >
                + Add New Conference
              </button>
            </div>
          </div>

          <div className="row p-1">
            <div className="col-12 p-2 rounded-2">
              <h6 className="fw-bold mb-5">All Conference</h6>
              <div className="row gx-4 gy-4">
                {filteredData.map((item, index) => (
                  <div key={index} className="col-12 col-md-4">
                    <div
                      className={`p-3 rounded d-flex align-items-center justify-content-between ${styles["conference-card"]}`}
                    >
                      {/* Left Image */}
                      <Image
                        src={'https://139.59.15.8:8003/api/v1/media/click/image?image=healthcarewebinar-bba266d1-8601-4e09-96aa-59a7d1fcb258.png'}
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
            </div>
          </div>
    
      
    </div>
  );
}

function AddNewConference() {


  const [file, setFile] = useState(null);
  const [conferenceName, setConferenceName] = useState('');
  const handleFileChange = (file) => {
    setFile(file);
  };
  const handleNameChange = (e) => {
    setConferenceName(e.target.value);
  };
  return (
    <>
      <FileUpload title={"Add Conference Logo"}   onFileChange={handleFileChange}/>
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
