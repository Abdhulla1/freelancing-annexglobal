import React from "react";
import NewsLetterTable from "./NewsLetterTable/NewsLetterTable";
export default function NewsLetter({userData}) {
  return (
    <div className=" p-2">
      <div className="d-flex col-12 justify-content-between align-items-start flex-wrap gap-2 mb-4">
        {/* Title */}
        <h5 className="fw-bold m-0">News Letters</h5>


      </div>

      <div className="row p-1 justify-content-center">
        <div className="col-11 p-2 rounded-2">
          <NewsLetterTable userData={userData}/>
        </div>
      </div>
    </div>
  );
}
