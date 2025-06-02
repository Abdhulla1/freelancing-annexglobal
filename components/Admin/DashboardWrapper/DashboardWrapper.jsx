
import React from "react";
import DashboardNavbar from "@/components/Static/DashboardLayout/DashboardNavbar";
import SideMenu from "@/components/Static/DashboardLayout/SideMenu";
import styles from "./DashboardWrapper.module.css";

export default function DashboardWrapper({children,userData}) {

  return (
    <div className={styles.layoutContainer}>
      <DashboardNavbar />
      <div className={styles.contentWrapper}>
        <SideMenu userData={userData}/>
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}
