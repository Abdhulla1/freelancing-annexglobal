"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../ConferencePageAdmin/LandingPage/RichTextEditor";
import Image from "next/image";
const faqData = [
  {
    title: "What are the benefits of attending our conference?",
    content:
      "Attendees gain insights from industry leaders, network with professionals, and get access to exclusive content and resources.",
  },
  {
    title: "How can I register for the conference?",
    content:
      "You can register by visiting our official website and clicking on the 'Register Now' button. Early bird discounts are also available.",
  },
  {
    title: "Will the sessions be recorded?",
    content:
      "Yes, all sessions will be recorded and made available to registered participants within a week after the event.",
  },
  {
    title: "Can I get a certificate for attending?",
    content:
      "Yes, certificates of participation will be emailed to all attendees after the event concludes.",
  },
  {
    title: "Will the sessions be recorded?",
    content:
      "Yes, all sessions will be recorded and made available to registered participants within a week after the event.",
  },
  {
    title: "Can I get a certificate for attending?",
    content:
      "Yes, certificates of participation will be emailed to all attendees after the event concludes.",
  },
];

export default function RegisterationInfo({
  visibleDetails,
  setVisibleDetails,
}) {
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
      message: <Delete />,
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
        header: "View Registeration Info",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Registeration Info",
        content: <Edit data={data} />,
      },
      add: {
        header: "Add New FAQ",
        content: <Add />,
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
                <button className="btn px-5 btn-warning text-white">
                  Save
                </button>
              </div>
            )}
          </div>
        </>
      </Sidebar>
      <ConfirmDialog draggable={false} />
      <table className="tabel w-100  table-striped-columns">
        <thead>
          <tr>
            <td className="p-2 table-heading">Title</td>
            <td className="p-2 table-heading">Content</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {faqData.map((element, i) => (
            <tr key={i}>
              <td className="p-3 table-data">{element.title}</td>
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

function Edit({ data }) {
  return (
    <div className="d-flex gap-3 flex-column">
      {/* <RichTextEditor
        labelName={"Question"}
        height="120px"
        initialValue={data.title}
        onChange={(content) => console.log("Edited content:", content)}
      /> */}
      <div className=" mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={data.title}
          onChange={(e) => console.log("Edited content:", e.value)}
          placeholder="2nd International Conference On"
          required
        />
      </div>
      <RichTextEditor
        labelName={"Answer"}
        initialValue={data.content}
        onChange={(content) => console.log("Edited content:", content)}
      />
    </div>
  );
}
function Add({ data }) {
  return (
    <div className="d-flex gap-3 flex-column">
      <RichTextEditor labelName={"Question"} height="120px" initialValue={""} />
      <RichTextEditor labelName={"Answer"} initialValue={""} />
    </div>
  );
}
function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <div>
        <label className="form-label fw-bold mb-2">Title</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.title}</p>
      </div>
      <div>
        <label className="form-label fw-bold mb-2">Content</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.content}
        </p>
      </div>
    </div>
  );
}

function Delete({ data = null }) {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Frequently asked question</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
