import React from "react";
import OCMTabelAdmin from "./OCMTabelAdmin/OCMTabelAdmin";
export default function AdminAdminOrganizingCommitteeMembersConferences() {
  return (
    <div className=" p-2">
      <div className="d-flex col-12 justify-content-between align-items-start flex-wrap gap-2 mb-4">
        {/* Title */}
        <h5 className="fw-bold m-0">All Organizing Committee Members</h5>

        {/* Add New Conference Button */}
        <button className="btn btn-warning text-white col-12 col-md-1">
          Publish
        </button>
      </div>

      <div className="row p-1 justify-content-center">
        <div className="col-10 p-2 rounded-2">
          <OCMTabelAdmin/>
        </div>
      </div>
    </div>
  );
}
