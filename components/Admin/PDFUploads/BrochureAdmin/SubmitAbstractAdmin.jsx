"use client";
import React, { useState } from "react";
import SubmitAbstractTableAdmin from "./SubmitAbstractTableAdmin/SubmitAbstractTableAdmin";
export default function SubmitAbstractAdmin() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>Submit Abstract</h5>
        <button className="btn btn-warning text-white">
           Publish
        </button>
      </div>
      <div className="mt-4 ">
        <SubmitAbstractTableAdmin />
      </div>
    </>
  );
}
