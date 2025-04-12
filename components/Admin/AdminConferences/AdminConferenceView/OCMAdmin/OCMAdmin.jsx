"use client";
import React, { useState } from "react";
import OCMTabelAdmin from "./OCMTabelAdmin/OCMTabelAdmin";
export default function OCMAdmin() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>Speakers</h5>
        <button className="btn btn-warning text-white">
          <i className="pi pi-eye px-2"></i> Preview
        </button>
      </div>
      <div className="mt-4 ">
        <OCMTabelAdmin/>
      </div>
    </>
  );
}
