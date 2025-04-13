import React, { useState } from "react";
import RegistrationTabelAdmin from "./RegistrationTabelAdmin/RegistrationTabelAdmin";
export default function RegistrationAdmin() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>Registration</h5>
        <button className="btn btn-warning text-white">
          <i className="pi pi-eye px-2"></i> Preview
        </button>
      </div>
      <div className="mt-4 ">
        <RegistrationTabelAdmin />
      </div>
    </>
  );
}
