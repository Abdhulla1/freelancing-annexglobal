
import React from "react";
import DashboardNavbar from "@/components/Static/DashboardLayout/DashboardNavbar";
import SideMenu from "@/components/Static/DashboardLayout/SideMenu";
import styles from "./DashboardWrapper.module.css";

export default function DashboardWrapper({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <DashboardNavbar />
      <div className={styles.contentWrapper}>
        <SideMenu />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}
