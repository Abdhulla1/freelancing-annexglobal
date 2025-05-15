"use client";
import React, { useState, useEffect } from "react";
import Sidenav from "../Dashboard/Sidenav/Sidenav";
import SubmitAbstractAdmin from "./BrochureAdmin/SubmitAbstractAdmin";
import BrochureAdmin from "./BrochureAdmin/BrochureAdmin";
import { useRouter } from "next/navigation";

export default function PDFUploads() {
  const [activeMenu, setActiveMenu] = useState("Submit Abstract");
  const router = useRouter();

  const navItems = [{ item: "Submit Abstract" }, { item: "Brochure" }];

  const componentMap = {
    ["Submit Abstract"]: <SubmitAbstractAdmin />,
    Brochure: <BrochureAdmin />,
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
      <h5 className="fw-bold">PDF Uploads</h5>

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
