import React, { useState } from "react";

export default function SettingsComponent() {
  const [selectedRole, setSelectedRole] = useState("");

  return (
    <div
      className="d-flex flex-column justify-content-between k h-100"
    >
      {/* Content Area */}
      <div className="p-4">
        <div className="mt-1 col-12 col-md-8">
          <label htmlFor="inputPassword5" className="form-label">
            After Login Redirect User To
          </label>
          <select
            id="expiring"
            className="form-select no-outline"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value={""}>Select Expiring</option>
            <option value={"1hr"}>One hour</option>
            <option value={"2hr"}>Two hour</option>
            <option value={"3hr"}>Three hour</option>
            <option value={"4hr"}>Four hour</option>
          </select>
          <div id="passwordHelpBlock" className="form-text">
            If the selected page were inaccessible, the user will be redirected
            to the first accessible page.
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="allow" className="form-label">
            Allow Login by Password
          </label>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="allow" />
            <label className="form-check-label text-black" htmlFor="allow">
              Allow
            </label>
          </div>
          <div className="form-text mb-5">
            Enabling this option will allow restricted admins to login using a
            password.
          </div>
        </div>
      </div>

      {/* Sticky Button Area */}
      <div className="bg-secondary bg-opacity-10 p-2 d-flex justify-content-end align-items-center gap-2 w-100">
        <button className="btn px-5 bg-white border">Cancel</button>
        <button className="btn px-1 px-md-5 btn-warning text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}
