"use client";
import React, { useState } from "react";
import BrochureTableAdmin from "./BrochureTableAdmin/BrochureTableAdmin";
export default function BrochureAdmin({userData}) {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>Brochure</h5>
      </div>
      <div className="mt-4 ">
        <BrochureTableAdmin userData={userData}/>
      </div>
    </>
  );
}
