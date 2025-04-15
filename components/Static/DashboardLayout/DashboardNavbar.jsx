'use client';
import React, { useState, useRef, useEffect } from "react";
import styles from "./DashboardNavbar.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const router=useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      // Redirect to login after logout
      router.push("/admin-annex-global-conferences");
    } catch (error) {
      console.error("Logout failed", error);
    }
    localStorage.removeItem("token")
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`navbar navbar-expand-md ${styles["navbar-wrapper"]}`}>
      <div className="container-fluid ">
        <Link
          href="#"
          className="d-flex align-items-center text-decoration-none text-white"
        >
          <Image
            src="/icons/annex-global-logo.png"
            height={30}
            width={30}
            quality={100}
            alt="annex logo"
            className="me-2"
          />
          <span className={`fw-bold ${styles["logo-text"]}`}>
            Annex Global Conferences
          </span>
        </Link>

        <div className="d-flex align-items-center gap-3 gap-md-5 flex-grow-1 justify-content-end ">
          {/* <div className={`input-group ${styles.searchBar}`}>
            <input
              type="text"
              className="form-control border-0 shadow-none"
              placeholder="Search"
              aria-label="Search"
            />
            <span className="input-group-text bg-transparent border-0">
              <i className="pi pi-search text-muted"></i>
            </span>
          </div> */}

          <div className={styles.bell}>
            <i className="bx bxs-bell bx-sm" title="Notifications"></i>
          </div>

          {/* Custom Dropdown */}
          <div className="position-relative" ref={dropdownRef}>
            <div
              className={styles["rounded-avatar"]}
              onClick={() => setOpen(!open)}
              style={{ cursor: "pointer" }}
            >
              <Image
                height={36}
                width={36}
                src="/icons/avatar.jpg"
                alt="profile"
              />
            </div>

            {open && (
              <div className={styles["dropdown-menu-custom"] + " shadow p-3"}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <div className={styles["rounded-avatar"]}>
                    <Image
                      height={36}
                      width={36}
                      src="/icons/avatar.jpg"
                      alt="profile"
                    />
                  </div>
                  <div className="fw-semibold">Annexglobalconference</div>
                </div>
                <hr className="my-2" />
                <div
                  className={styles["dropdown-item-custom"]}
                  onClick={() => console.log("Change Password")}
                >
                  <i className="bx bx-cog me-2" />
                  Change Password
                </div>
                <hr className="my-2" />
                <div
                  className={styles["dropdown-item-custom"]}
                  onClick={handleLogout}
                >
                  <i className="bx bx-log-out me-2" />
                  Log Out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
