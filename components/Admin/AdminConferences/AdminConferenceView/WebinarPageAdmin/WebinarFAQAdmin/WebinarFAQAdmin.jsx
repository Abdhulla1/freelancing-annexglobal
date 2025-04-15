"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../ConferencePageAdmin/LandingPage/RichTextEditor";
import Image from "next/image";
const faqData = [
  {
    question: "What are the benefits of attending our conference?",
    answer:
      "Attendees gain insights from industry leaders, network with professionals, and get access to exclusive content and resources.",
  },
  {
    question: "How can I register for the conference?",
    answer:
      "You can register by visiting our official website and clicking on the 'Register Now' button. Early bird discounts are also available.",
  },
  {
    question: "Will the sessions be recorded?",
    answer:
      "Yes, all sessions will be recorded and made available to registered participants within a week after the event.",
  },
  {
    question: "Can I get a certificate for attending?",
    answer:
      "Yes, certificates of participation will be emailed to all attendees after the event concludes.",
  },
  {
    question: "Are there any group discounts available?",
    answer:
      "Yes, we offer discounts for groups of 5 or more. Please contact our support team for details.",
  },
  {
    question: "Is the event open to international participants?",
    answer:
      "Absolutely. Our event is open to participants from all over the world. We also provide translation support in select languages.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "Full refunds are available if canceled at least 7 days before the event. No refunds will be issued after that.",
  },
  {
    question: "How do I become a speaker at the event?",
    answer:
      "You can submit your speaker application through the 'Call for Speakers' section on our website.",
  },
  {
    question: "Are meals provided during the conference?",
    answer:
      "Yes, lunch and light refreshments will be provided on all days of the conference.",
  },
  {
    question: "Is there accommodation provided?",
    answer:
      "Accommodation is not included, but we have partnered with nearby hotels to offer discounted rates for attendees.",
  },
];

export default function WebinarFAQAdmin({ visibleDetails, setVisibleDetails }) {
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
        header: "View Frequently asked questions",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Frequently asked questions",
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
            <td className="p-2 table-heading">Question</td>
            <td className="p-2 table-heading">Answer</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {faqData.map((element, i) => (
            <tr key={i}>
              <td className="p-3 table-data">{element.question}</td>
              <td className="p-3  table-data ">{element.answer}</td>
              <td className="p-3 table-data ">
                <div className="d-flex gap-1  justify-content-center flex-nowrap">
                  <button
                    name="edit"
                    className="btn btn-outline-secondary rounded"
                    onClick={(e) => handleSidebar(e.target.name, element)}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button>
                  <button className="btn btn-outline-secondary rounded"    onClick={confirmDelete}>
                    <i className="bx bx-trash-alt"></i>
                  </button>
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
      <button
      name="add"
              className="btn btn-lg text-white rounded-circle  btn-warning position-absolute"
              style={{ bottom: "50px", right: "50px", zIndex: 1000 }}
              onClick={(e) => handleSidebar(e.target.name)}
            >
              +
            </button>
    </div>
  );
}

function Edit({ data }) {
  return (
    <div className="d-flex gap-3 flex-column">
      <RichTextEditor
        labelName={"Question"}
        height="120px"
        initialValue={data.question}
        onChange={(content) => console.log("Edited content:", content)}
      />
      <RichTextEditor
        labelName={"Answer"}
        initialValue={data.answer}
        onChange={(content) => console.log("Edited content:", content)}
      />
    </div>
  );
}
function Add({ data }) {
  return (
    <div className="d-flex gap-3 flex-column">
      <RichTextEditor
        labelName={"Question"}
        height="120px"
        initialValue={''}
   
      />
      <RichTextEditor
        labelName={"Answer"}
        initialValue={''}
      />
    </div>
  );
}
function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <div>
        <label className="form-label fw-bold mb-2">Question</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.question}</p>
      </div>
      <div>
        <label className="form-label fw-bold mb-2">Answer</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.answer}</p>
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
        Are you sure you want to delete this Program File? This action cannot be undone.
      </p>
    </div>
  );
}
