"use client";
import React, { useState } from "react";
import AdminsTable from "./AdminsTable/AdminsTable";
import Sidenav from "../Dashboard/Sidenav/Sidenav";
import SettingsComponent from "./SettingsComponent";
import './style.css'

export default function ControlledAccess() {
  const [activeMenu, setActiveMenu] = useState("Admins");
  const [visibleDetails, setVisibleDetails] = useState(false);
  const navItems = [{ item: "Admins" }, { item: "Settings" }];
  const adminsData = [
    {
      id: 1,
      emailId: "admin1@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 10:14am",
      status: "Active",
    },
    {
      id: 2,
      emailId: "admin2@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 10:20am",
      status: "Active",
    },
    {
      id: 3,
      emailId: "admin3@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 10:25am",
      status: "Active",
    },
    {
      id: 4,
      emailId: "admin4@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 10:30am",
      status: "Active",
    },
    {
      id: 5,
      emailId: "admin5@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 10:35am",
      status: "Inactive",
    },
    {
      id: 6,
      emailId: "admin6@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 10:40am",
      status: "Active",
    },
    {
      id: 7,
      emailId: "admin7@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 10:45am",
      status: "Active",
    },
    {
      id: 8,
      emailId: "admin8@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 10:50am",
      status: "Inactive",
    },
    {
      id: 9,
      emailId: "admin9@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 10:55am",
      status: "Active",
    },
    {
      id: 10,
      emailId: "admin10@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 11:00am",
      status: "Active",
    },
    {
      id: 11,
      emailId: "admin11@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 11:05am",
      status: "Active",
    },
    {
      id: 12,
      emailId: "admin12@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 11:10am",
      status: "Inactive",
    },
    {
      id: 13,
      emailId: "admin13@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 11:15am",
      status: "Active",
    },
    {
      id: 14,
      emailId: "admin14@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 11:20am",
      status: "Active",
    },
    {
      id: 15,
      emailId: "admin15@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 11:25am",
      status: "Active",
    },
    {
      id: 16,
      emailId: "admin16@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 11:30am",
      status: "Active",
    },
    {
      id: 17,
      emailId: "admin17@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 11:35am",
      status: "Inactive",
    },
    {
      id: 18,
      emailId: "admin18@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 11:40am",
      status: "Active",
    },
    {
      id: 19,
      emailId: "admin19@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 11:45am",
      status: "Active",
    },
    {
      id: 20,
      emailId: "admin20@gmail.com",
      expiringIn: "One Hour",
      lastLoggedIn: "24 March 2025, 11:50am",
      status: "Active",
    },
  ];
  const componentMap = {
    Admins: <AdminsTable adminsData={adminsData} visibleDetails={visibleDetails}  setVisibleDetails={setVisibleDetails}/>,
    Settings: <SettingsComponent />,
  };


  return (
    <div className="container p-2 ">
      <h5 className="fw-bold">Controlled Access</h5>
      <div className="row gap-2 gap-md-0 p-3">
        <div className="col-12 col-md-3 ">
          <Sidenav
            navItems={navItems}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
        <div className="col-md-9 col-12 p-3 bg-white rounded-2"  >
          <h5>{activeMenu}</h5>
          {activeMenu === "Admins" && (
            <button
              className="btn btn-lg text-white rounded-circle  btn-warning position-absolute"
              style={{ bottom: "50px", right: "50px", zIndex: 1000 }}
              onClick={()=>setVisibleDetails(true)}
            >
              +
            </button>
          )}
          <div className="mt-5  right-panel">
          {componentMap[activeMenu]}
          </div>
        </div>
      </div>
    </div>
  );
}
