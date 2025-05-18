"use client";
import React, { useState, useEffect } from "react";
import Sidenav from "../Dashboard/Sidenav/Sidenav";
import RegistrationTabelAdmin from "./RegistrationTabelAdmin/RegistrationTabelAdmin";
import { useRouter } from "next/navigation";
import CouponTable from "./CouponTable/CouponTable";
export default function Registration() {
  const [activeMenu, setActiveMenu] = useState("Register Details");
  const router = useRouter();

  const navItems = [{ item: "Register Details" }, ];//{ item: "Coupons" }

  const componentMap = {
    ["Register Details"]: <RegistrationTabelAdmin />,
    // ["Coupons"]: <CouponTable />,
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getSelectedConference(conference);
  //       if(response.status===404){
  //         router.push("/notFound");

  //       }else{
  //         setSelectedConference(response);
  //       }

  //     } catch (error) {
  //       console.error("Failed to fetch conference data", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // if (selectedConference === null) {
  //   return (
  //     <div
  //       className="container d-flex justify-content-center align-items-center"
  //       style={{ height: "70vh" }}
  //     >
  //       <ProgressSpinner
  //         style={{ width: "50px", height: "50px" }}
  //         strokeWidth="5"
  //         fill="var(--surface-ground)"
  //         animationDuration=".5s"
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className=" p-2">
       <div className="d-flex justify-content-between">
        <h5 className="fw-bold">Registration</h5>
        <button className="btn btn-warning text-white">
           Publish
        </button>
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
