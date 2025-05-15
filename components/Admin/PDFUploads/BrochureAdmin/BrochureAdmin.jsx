"use client";
import React, { useState } from "react";
import BrochureTableAdmin from "./BrochureTableAdmin/BrochureTableAdmin";
export default function BrochureAdmin() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>Brochure</h5>
        <button className="btn btn-warning text-white">
           Publish
        </button>
      </div>
      <div className="mt-4 ">
        <BrochureTableAdmin />
      </div>
    </>
  );
}
