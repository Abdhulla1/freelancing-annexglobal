import React from "react";
import FooterTabelAdmin from "./FooterTabelAdmin/FooterTabelAdmin";
export default function Footer() {
  return (
    <div className=" p-2">
      <div className="d-flex col-12 justify-content-between align-items-start flex-wrap gap-2 mb-4">
        {/* Title */}
        <h5 className="fw-bold m-0">Media Links</h5>

        {/* Add New Conference Button */}
        <button className="btn btn-warning text-white col-12 col-md-1">
          Publish
        </button>
      </div>

      <div className="row p-1 justify-content-center">
        <div className="col-11 p-2 rounded-2">
          <FooterTabelAdmin/>
        </div>
      </div>
    </div>
  );
}
