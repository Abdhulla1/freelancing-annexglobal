'use client'
import React, { useState } from "react";
import OCMTabelAdmin from "./OCMTabelAdmin/OCMTabelAdmin";
import Sidenav from "../Dashboard/Sidenav/Sidenav";
import OCMBackgroundSelector from "./OCMBackgroundSelector";
export default function AdminAdminOrganizingCommitteeMembersConferences() {
  const [activeMenu, setActiveMenu] = useState("OCM");

  const navItems = [{ item: "OCM" }, { item: "OCM Background" }];

  const componentMap = {
    OCM: <OCMTabelAdmin />,
    "OCM Background": <OCMBackgroundSelector />,
  };

  return (
    <div className=" p-2">
      <div className="d-flex col-12 justify-content-between align-items-start flex-wrap gap-2 mb-4">
        {/* Title */}
        <h5 className="fw-bold m-0">All Organizing Committee Members</h5>

       
      </div>

      <div className="row gap-2 gap-md-0 p-3">
        <div className="col-12 col-md-3">
          <Sidenav
            navItems={navItems}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
        <div className="col-md-9 col-12 p-3 bg-white rounded-2">
          {componentMap[activeMenu]}
        </div>
      </div>
    </div>
  );
}
