"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../LandingPage/RichTextEditor";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { InputSwitch } from "primereact/inputswitch";
import { classNames } from "primereact/utils";
const testimonialData = [
  {
    image: "/icons/DefaultPreviewImage.png", // Optional
    name: "Pam Beesaley",
    designation: "Founder",
    status: false,
    content:
      "Attendees gain insights from industry leaders, network with professionals,",
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Guna",
    designation: "CEO",
    status: false,
    content:
      "Register on our website by clicking the",
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Pam Beesaley",
    designation: "Researcher",
    status: false,
    content:
      "All sessions will be recorded and available",
  },

];

export default function TestimonialAdmin({ visibleDetails, setVisibleDetails }) {
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
        header: "View Testimonial",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Testimonial",
        content: <Edit data={data} />,
      },
      add: {
        header: "Add Testimonial",
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
            {sidebarState.header !== "View Testimonial" && (
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
            <td className="p-2 table-heading">Logo Image</td>
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
                  width={90}
                  alt="TopicImage"
                />{" "}
              </td>
              <td className="p-3 table-data">{element.name}</td>
              <td className="p-3 table-data">{element.designation}</td>
              <td className="p-3  table-data ">{element.content}</td>
              <td className="p-3  table-data ">  <InputSwitch checked={statusChecked} onChange={(e) => setStatusChecked(e.value) }            style={{scale:"0.7"}}/></td>
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
  return (
    <div className="d-flex gap-3 flex-column">
        <FileUpload   title ={ "Logo Image Upload"} showBorder = {true}/>

          <div className=" mb-3">
            <label htmlFor="eventLocation" className="form-label">
            Name
            </label>
            <input
              type="text"
              name="eventLocation"
              value={data.name}
              className="form-control"
              id="eventLocation"
              placeholder="Enter Name"
              onChange={(e)=>console.log(e.target.value)}
              required
            />
          </div>

     
      <RichTextEditor
        labelName={"Designation"}
        height="120px"
        initialValue={data.designation}
        onChange={(content) => console.log("Edited content:", content)}
      />
      <RichTextEditor
        labelName={"Content"}
        initialValue={data.content}
        onChange={(content) => console.log("Edited content:", content)}
      />
    </div>
  );
}
function Add({ data }) {
  return (
    <div className="d-flex gap-3 flex-column">
    <FileUpload   title ={ "Logo Image Upload"} showBorder = {true}/>

      <div className=" mb-3">
        <label htmlFor="eventLocation" className="form-label">
        Name
        </label>
        <input
          type="text"
          name="eventLocation"

          className="form-control"
          id="eventLocation"
          placeholder="Enter Name"

          required
        />
      </div>

 
  <RichTextEditor
    labelName={"Designation"}
    height="120px"
    initialValue={''}
    onChange={(content) => console.log("Edited content:", content)}
  />
  <RichTextEditor
    labelName={"Content"}
    initialValue={''}
    onChange={(content) => console.log("Edited content:", content)}
  />
</div>
  );
}
function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <label className="form-label">Image</label>
      <Image src={data.image} width={120} height={120} alt="DeleteIcon" />
      <div>
        <label className="form-label  mb-2">Name</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.name}
        </p>
      </div>
      <div>
        <label className="form-label  mb-2">Designation</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.name}
        </p>
      </div>
      <div>
        <label className="form-label mb-2">Content</label>
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
