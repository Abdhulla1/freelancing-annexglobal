"use client";
import React, { useState } from "react";
import FileUploadVideo from '@/components/Reusable/Admin/FileUpload/FileUploadVideo'
import RichTextEditor from '../../ConferencePageAdmin/LandingPage/RichTextEditor'
import { Sidebar } from "primereact/sidebar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const webinarData = [
  {
    youtubeLink: "https://www.youtube.com/watch?v=19eIVnOI9Do",
    title: "Introduction to React",
    content: "Welcome to the React webinar! We'll cover the basics and advanced topics.",
  },
  {
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Advanced JavaScript Techniques",
    content: "Deep dive into closures, prototypes, and async programming in JavaScript.",
  },
  {
    youtubeLink: "https://www.youtube.com/watch?v=3fumBcKC6RE",
    title: "Getting Started with Node.js",
    content: "Learn how to build backend apps with Node.js and Express.",
  },
];


export default function WebinarVideoSection({ visibleDetails, setVisibleDetails }) {
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });
  const confirmDelete = () => {
    const accept = () => {
      console.log("accepted");
    };
    const reject = () => {
      console.log("rejectcted");
    };
    confirmDialog({
      message:
        <Delete/>,
      acceptLabel: "OK",
      rejectLabel: "Cancel",
      acceptClassName: "btn px-5 btn-warning text-white shadow-none",
      rejectClassName: "btn px-5 bg-white border me-3 shadow-none",
      defaultFocus: "accept",
      accept,
      reject,
      className: "custom-confirm-dialog",
    });
  };
  const handleSidebar = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Video Section",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Video Section",
        content: <Edit data={data} />,
      },
    };

    const selected = componentsMap[type];
    if (selected) {
      setSidebarState(selected);
      setIsVisible(true);
    }
  };

  return (
    <div className="table-responsive">
      <Sidebar
        visible={isVisible}
        header={<h5 className="text-black">{sidebarState.header}</h5>}
        position="right"
        dismissable={false}
        onHide={() => setIsVisible(false)}
        className="custom-sidebar"
      >
        <>
          <div className="d-flex flex-column justify-content-between k h-100">
            {/* Content Area */}

            {sidebarState.content}

            {/* Sticky Button Area */}
            {sidebarState.header !== "View Frequently asked questions" && (
      <div className="bg-secondary bg-opacity-10 p-2 d-flex justify-content-center align-items-center gap-3 w-100">
        <button
          className="btn px-5 bg-white border"
          onClick={() => setIsVisible(false)}
        >
          Close
        </button>
        <button className="btn px-5 btn-warning text-white">Save</button>
      </div>
    )}
          </div>
        </>
      </Sidebar>
            <ConfirmDialog draggable={false} />
      <table className="tabel w-100  table-striped-columns">
        <thead>
          <tr>
            <td className="p-2 table-heading">Video Link</td>
            <td className="p-2 table-heading">Title</td>
            <td className="p-2 table-heading">Content</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {webinarData.map((element, i) => (
            <tr key={i}>
              <td className="p-3 table-data">{element.youtubeLink}</td>
              <td className="p-3  table-data ">{element.title}</td>
              <td className="p-3  table-data ">{element.content}</td>
              <td className="p-3 table-data ">
                <div className="d-flex gap-1  justify-content-center flex-nowrap">
                  <button
                    name="edit"
                    className="btn btn-outline-secondary rounded"
                    onClick={(e) => handleSidebar(e.target.name, element)}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button>
                  {/* <button className="btn btn-outline-secondary rounded"    onClick={confirmDelete}>
                    <i className="bx bx-trash-alt"></i>
                  </button> */}
                  <button
                    name="view"
                    className="btn btn-outline-warning rounded"
                    onClick={(e) => handleSidebar(e.target.name, element)}
                  >
                    <i className="bx bx-chevron-right"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button
      name="add"
              className="btn btn-lg text-white rounded-circle  btn-warning position-absolute"
              style={{ bottom: "50px", right: "50px", zIndex: 1000 }}
              onClick={(e) => handleSidebar(e.target.name)}
            >
              +
            </button> */}
    </div>
  );
}

function Edit({ data })  {
  return (
    <div>
       {/* <FileUploadVideo/> */}
             <div className="mt-4">
        <label htmlFor="title" className="form-label">
          Video Link(Youtube)*
        </label>
        <div className="input-group border rounded p-1">
          <span
            className="btn rounded-2 text-white me-1"
            id="basic-addon1"
            style={{ backgroundColor: "#111880" }}
          >
            <i className="bx bx-link-alt"></i>
          </span>
          <input
            type="link"
            name="mapLink"
            value={data.youtubeLink}
            className={`form-control border border-0`}
            id="link"
            placeholder="https://www.youtube.com/watch?v=19eIVnOI9Do"
            required
            onChange={(e)=>console.log(e.value)}
            autoComplete="off"
          />
        </div>
      </div>
       <div className="mb-4 mt-4">
        <label htmlFor="title" className="form-label">
        Title 
         </label>
        <input
          type="email"
          name="title"
          className={`form-control `}
          id="title"
          value={data.title}
          placeholder="Enter Title"
          required
                      onChange={(e)=>console.log(e.value)}

          autoComplete="off"
        />
      </div>
      <RichTextEditor initialValue={data.content} labelName={"Content"}/> 
    </div>
  )
}
function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <div>
        <label className="form-label fw-bold mb-2">Video Link</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.youtubeLink}</p>
      </div>
      <div>
        <label className="form-label fw-bold mb-2">Title</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.title}</p>
      </div>
      <div>
        <label className="form-label fw-bold mb-2">Content</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.content}</p>
      </div>
    </div>
  );
}
