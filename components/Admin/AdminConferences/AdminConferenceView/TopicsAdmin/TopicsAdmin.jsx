import React, { useState } from "react";
import TopicsTabelAdmin from "./TopicsTabelAdmin/TopicsTabelAdmin";
export default function TopicsAdmin() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>Topics</h5>
        <button className="btn btn-warning text-white">
          <i className="pi pi-eye px-2"></i> Preview
        </button>
      </div>
      <div className="mt-4 ">
        <TopicsTabelAdmin />
      </div>
    </>
  );
}
