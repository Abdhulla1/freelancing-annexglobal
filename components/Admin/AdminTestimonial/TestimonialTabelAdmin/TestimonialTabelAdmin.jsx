"use client";
import React, { useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../AdminConferences/AdminConferenceView/ConferencePageAdmin/LandingPage/RichTextEditor";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
import { Sidebar } from "primereact/sidebar";

const testimonialData = [
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Pam Beesaley",
    designation: "Associate Professor",
    content:
      "The conference was well-organized and incredibly insightful. I look forward to participating again.",
    status: false,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Michael Scott",
    designation: "Senior Legal Advisor",
    content:
      "A brilliant opportunity to share and learn from global legal minds. Great experience!",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Angela Martin",
    designation: "Legal Consultant",
    content:
      "Insightful sessions and meaningful discussions. A must-attend for legal professionals.",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Jim Halpert",
    designation: "Corporate Law Specialist",
    content:
      "The networking and panel discussions were top-notch. Highly recommended.",
    status: false,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Dwight Schrute",
    designation: "Compliance Officer",
    content:
      "Excellent topics and expert speakers. I gained a lot of practical knowledge.",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Oscar Martinez",
    designation: "Tax Law Analyst",
    content:
      "A well-structured event that tackled critical topics in tax and finance law.",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Phyllis Vance",
    designation: "Human Rights Lawyer",
    content:
      "The event brought diverse perspectives on human rights advocacy and reform.",
    status: false,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Stanley Hudson",
    designation: "Labor Law Specialist",
    content:
      "A very informative conference with actionable takeaways for labor law practice.",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Ryan Howard",
    designation: "Legal Tech Consultant",
    content:
      "Innovative discussions on the future of legal technology. Impressive!",
    status: false,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Kelly Kapoor",
    designation: "International Law Expert",
    content: "Fantastic global engagement and high-level legal discussions.",
    status: true,
  },
];

export default function TestimonialTabelAdmin({
  visibleDetails,
  setVisibleDetails,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });

  const [statusChecked, setStatusChecked] = useState(false);
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
        header: "View Topic",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Topic",
        content: <Edit data={data} />,
      },
      add: {
        header: "Add Topic",
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
          <div className="d-flex flex-column justify-content-between h-100">
            {/* Content Area */}

            {sidebarState.content}

            {/* Sticky Button Area */}
            {sidebarState.header !== "View Topic" && (
              <div className="bg-secondary bg-opacity-10 p-2 d-flex justify-content-center align-items-center mt-auto  gap-3 w-100">
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
            <td className="p-2 table-heading">Testimonial Image</td>
            <td className="p-2 table-heading">Name</td>
            <td className="p-2 table-heading">Designation</td>
            <td className="p-2 table-heading">Content</td>
            <td className="p-2 table-heading">Status</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {testimonialData.map((element, i) => (
            <tr key={i}>
              <td className="p-3 table-data">
                <Image
                  src={element.image}
                  height={90}
                  width={110}
                  alt="TopicImage"
                />{" "}
              </td>
              <td className="p-3 table-data">{element.name}</td>
              <td className="p-3 table-data">{element.designation}</td>
              <td className="p-3  table-data ">{element.content}</td>
              <td className="p-3  table-data ">
                {" "}
                <InputSwitch
                  checked={statusChecked}
                  onChange={(e) => setStatusChecked(e.value)}
                  style={{ scale: "0.7" }}
                />
              </td>
              <td className="p-3 table-data ">
                <div className="d-flex gap-1  justify-content-center flex-nowrap">
                  <button
                    name="edit"
                    className="btn btn-outline-secondary rounded"
                    onClick={(e) => handleSidebar(e.target.name, element)}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded"
                    onClick={confirmDelete}
                  >
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
    const [statusChecked, setStatusChecked] = useState(false);

  return (
    <div className="d-flex gap-3 container flex-column ">
      <FileUpload title={"Image Upload*"} showBorder={true} />
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label htmlFor="title" className="form-label">
            Upload Video Link
          </label>
          <InputSwitch
            checked={statusChecked}
            onChange={(e) => setStatusChecked(e.value)}
            style={{ scale: "0.7" }}
          />
        </div>

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
            className={`form-control border border-0`}
            id="link"
            placeholder="Enter Video Link"
            required
            autoComplete="off"
          />
        </div>
      </div>
      
      <RichTextEditor
        labelName={"Designation*"}
        height="100px"
        initialValue={data.designation}
        onChange={(content) => console.log("Edited content:", content)}
      />
      <RichTextEditor
        labelName={"Content*"}
        height="100px"
        initialValue={data.content}
        onChange={(content) => console.log("Edited content:", content)}
      />
    </div>
  );
}
function Add({ data }) {
  const [statusChecked, setStatusChecked] = useState(false);

  return (
    <div className="d-flex gap-3 container flex-column">
      <FileUpload title={"Image Upload*"} showBorder={true} />
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label htmlFor="title" className="form-label">
            Upload Video Link
          </label>
          <InputSwitch
            checked={statusChecked}
            onChange={(e) => setStatusChecked(e.value)}
            style={{ scale: "0.7" }}
          />
        </div>

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
            className={`form-control border border-0`}
            id="link"
            placeholder="Enter Video Link"
            required
            autoComplete="off"
          />
        </div>
      </div>
      
      <RichTextEditor
        labelName={"Designation*"}
        height="100px"
        initialValue={""}
        onChange={(content) => console.log("Edited content:", content)}
      />
      <RichTextEditor
        labelName={"Content*"}
        height="100px"
        initialValue={""}
        onChange={(content) => console.log("Edited content:", content)}
      />
    </div>
  );
}

function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <label className="form-label"> Image</label>
      <Image src={data.image} width={100} height={100} alt="image" />
      <div>
        <label className="form-label  mb-2">Video Link</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.name}</p>
      </div>
      <div>
        <label className="form-label  mb-2">Name</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.name}</p>
      </div>
      <div>
        <label className="form-label  mb-2">Designation</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.designation}</p>
      </div>
      <div>
        <label className="form-label  mb-2">Content</label>
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
      <h5 className="mt-3">Delete Testimonial</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
