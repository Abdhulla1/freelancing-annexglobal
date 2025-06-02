"use client";
import React, { useState, useEffect } from "react";
import Sidenav from "../Dashboard/Sidenav/Sidenav";
import RegistrationTabelAdmin from "./RegistrationTabelAdmin/RegistrationTabelAdmin";
import { useRouter } from "next/navigation";
import CouponTable from "./CouponTable/CouponTable";
export default function Registration({userData}) {
  const [activeMenu, setActiveMenu] = useState("Register Details");
  const router = useRouter();

  const navItems = [{ item: "Register Details" }, ];//{ item: "Coupons" }

  const componentMap = {
    ["Register Details"]: <RegistrationTabelAdmin userData={userData} />,
    // ["Coupons"]: <CouponTable />,
  };

  return (
    <div className=" p-2">
       <div className="d-flex justify-content-between">
        <h5 className="fw-bold">Registration</h5>
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
