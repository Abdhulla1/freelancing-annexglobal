"use client";
import React, { useState, useEffect } from "react";
import RegistrationTabelAdmin from "./RegistrationTabelAdmin/RegistrationTabelAdmin";
import { useRouter } from "next/navigation";

export default function Registration() {


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
      <div className="mt-4">
    <RegistrationTabelAdmin/>
      </div>
    </div>
  );
}
