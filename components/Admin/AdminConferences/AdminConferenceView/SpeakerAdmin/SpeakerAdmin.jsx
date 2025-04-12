"use client";
import React, { useState } from "react";
import SpeakerTabelAdmin from "./SpeakerTabelAdmin/SpeakerTabelAdmin";
export default function SpeakerAdmin() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>Speakers</h5>
        <button className="btn btn-warning text-white">
          <i className="pi pi-eye px-2"></i> Preview
        </button>
      </div>
      <div className="mt-4 ">
        <SpeakerTabelAdmin />
      </div>
    </>
  );
}
