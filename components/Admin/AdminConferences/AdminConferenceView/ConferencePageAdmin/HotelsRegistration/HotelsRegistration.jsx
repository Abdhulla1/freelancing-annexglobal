import React from "react";
import RichTextEditor from "../LandingPage/RichTextEditor";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";

export default function HotelsRegistration() {
  return (
    <div className="mt-5 ">
      <div className="mb-4">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="email"
          name="title"
          className={`form-control `}
          id="title"
          placeholder="Enter Title"
          required
          autoComplete="off"
        />
      </div>
      <RichTextEditor labelName={"Content"} />

      <div className="mt-3 pb-4 border-bottom">
        <div className="col-md-6 mb-3 ">
          <label htmlFor="eventLocation" className="form-label">
          Title
          </label>
          <input
            type="text"
            name="eventLocation"
            className="form-control"
            id="eventLocation"
            placeholder="Enter Title"
            required
          />
        </div>
        <div className="flex-grow-1 w-100">
          <FileUpload title={"Upload Landing page images"} showDelete={true} />
        </div>
      </div>
      <div className="mt-3 pb-4 border-bottom">
        <div className="col-md-6 mb-3 ">
          <label htmlFor="eventLocation" className="form-label">
          Title
          </label>
          <input
            type="text"
            name="eventLocation"
            className="form-control"
            id="eventLocation"
            placeholder="Enter Title"
            required
          />
        </div>
        <div className="flex-grow-1 w-100">
          <FileUpload title={"Upload Landing page images"} showDelete={true} />
        </div>
      </div>
      <div className=" mt-3 pb-4 border-bottom">
        <div className="col-md-6 mb-3 ">
          <label htmlFor="eventLocation" className="form-label">
          Title
          </label>
          <input
            type="text"
            name="eventLocation"
            className="form-control"
            id="eventLocation"
            placeholder="Enter Title"
            required
          />
        </div>
        <div className="flex-grow-1 w-100">
          <FileUpload title={"Upload Landing page images"} showDelete={true} />
        </div>
      </div>
    </div>
  );
}
