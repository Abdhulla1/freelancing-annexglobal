"use client";
import React, { useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../AdminConferences/AdminConferenceView/ConferencePageAdmin/LandingPage/RichTextEditor";
import Image from "next/image";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
const contactFormDataArray = [
  {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    event: "Pediatrics Conference",
    message: "I would like to know more details about the Pediatrics Conference schedule and registration process."
  },
  {
    name: "Maria Lopez",
    email: "maria.lopez@example.com",
    event: "Gynecology Conference",
    message: "Is there any early bird discount available for the Gynecology Conference?"
  },
  {
    name: "David Kim",
    email: "david.kim@example.com",
    event: "Cardiology Workshop",
    message: "Please share the list of keynote speakers for the Cardiology Workshop."
  },
  {
    name: "Sara Mehta",
    email: "sara.mehta@example.com",
    event: "Neuroscience Summit",
    message: "I’m interested in volunteering. Whom should I contact?"
  },
  {
    name: "James Wang",
    email: "james.wang@example.com",
    event: "Pediatrics Conference",
    message: "Can I get a participation certificate for attending the Pediatrics Conference?"
  },
  {
    name: "Emma Brown",
    email: "emma.brown@example.com",
    event: "Oncology Symposium",
    message: "Are there any networking sessions at the Oncology Symposium?"
  },
  {
    name: "Liam Garcia",
    email: "liam.garcia@example.com",
    event: "Gynecology Conference",
    message: "Will there be virtual attendance options for this event?"
  },
  {
    name: "Chloe Patel",
    email: "chloe.patel@example.com",
    event: "Neuroscience Summit",
    message: "I have dietary restrictions. Can that be accommodated during the summit?"
  },
  {
    name: "Ethan Rossi",
    email: "ethan.rossi@example.com",
    event: "Cardiology Workshop",
    message: "Is there a deadline for paper submissions?"
  },
  {
    name: "Olivia Smith",
    email: "olivia.smith@example.com",
    event: "Oncology Symposium",
    message: "I'd like to present a case study. How can I apply?"
  }
];

export default function ContactUsTabelAdmin({
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
  const confirmEdit = (data) => {
    const accept = () => {
      console.log("accepted");
    };
    const reject = () => {
      console.log("rejectcted");
    };
    confirmDialog({
      message: <Edit data={data} />,
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
  const confirmView = (data) => {
    const accept = () => {
      console.log("accepted");
    };
    const reject = () => {
      console.log("rejectcted");
    };
    confirmDialog({
      message: <Edit data={data} />,
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

  const handleModel = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Contact Request",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Speaker",
        content: <Edit data={data} />,
      },
      add: {
        header: "Add Speaker",
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
      <Dialog
        header={sidebarState.header}
        visible={isVisible}
        draggable={false}
        onHide={() => {
          if (!isVisible) return;
          setIsVisible(false);
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {/* Content Area */}
        {sidebarState.content}
      </Dialog>
      <ConfirmDialog draggable={false} />
      <table className="tabel w-100  table-striped-columns">
        <thead>
          <tr>
            <td className="p-2 table-heading">Name</td>
            <td className="p-2 table-heading">Email</td>
            <td className="p-2 table-heading">Event</td>
            <td className="p-2 table-heading">message</td>
            <td className="p-2 table-heading">Action</td>

          </tr>
        </thead>
        <tbody>
          {contactFormDataArray.map((element, i) => (
            <tr key={i}>
              
              <td className="p-3 table-data">{element.name}</td>
              <td className="p-3 table-data">{element.email}</td>
              <td className="p-3  table-data ">{element.event}</td>
              <td className="p-3  table-data  ">{element.message}</td>

              <td className="p-3 table-data ">
                <div className="d-flex gap-1  justify-content-center flex-nowrap">
                  {/* <button
                    name="edit"
                    className="btn btn-outline-secondary rounded"
                    onClick={(e) => handleModel(e.target.name, element)}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button> */}
                  <button
                    className="btn btn-outline-secondary rounded"
                    onClick={confirmDelete}
                  >
                    <i className="bx bx-trash-alt"></i>
                  </button>
                  <button
                    name="view"
                    className="btn btn-outline-warning rounded"
                    onClick={(e) => handleModel(e.target.name, element)}
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
        onClick={(e) => handleModel(e.target.name)}
      >
        +
      </button> */}
    </div>
  );
}

function Edit({ data }) {
  return (
    <div className="d-flex gap-3 container flex-column h-100">
      <div className="mb-3">
        <label htmlFor="eventLocation" className="form-label">
          Name*
        </label>
        <input
          type="text"
          name="eventLocation"
          value={data.name}
          className="form-control"
          id="eventLocation"
          placeholder="Enter Name"
          onChange={(e) => console.log(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="eventLocation" className="form-label">
          Title*
        </label>
        <input
          type="text"
          name="eventLocation"
          value={data.title}
          className="form-control"
          id="eventLocation"
          placeholder="Enter Name"
          onChange={(e) => console.log(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputPassword5" className="form-label">
          Author
        </label>
        <select
          id="Author"
          className="form-select no-outline"
          onChange={(e) => console.log(e.target.value)}
        >
          <option value={""}>Select Author</option>
          <option value={"Pediatrics Conference"}>Pediatrics Conference</option>
          <option value={"Gynecology Conference"}>Gynecology Conference</option>
        </select>
      </div>
      <FileUpload title={"Speaker Image Upload*"} showBorder={true} />
   
      <RichTextEditor
        labelName={"Bio-Data*"}
        height="120px"
        initialValue={""}
        onChange={(content) => console.log("Edited content:", content)}
      />
         <RichTextEditor
        labelName={"Company Details*"}
        initialValue={data.company}
        onChange={(content) => console.log("Edited content:", content)}
      />
    </div>
  );
}
function Add({ data }) {
  return (
    <div className="d-flex gap-3 container flex-column h-100">
      <div className=" mb-3">
        <label htmlFor="eventLocation" className="form-label">
          Name*
        </label>
        <input
          type="text"
          name="eventLocation"
          value=""
          className="form-control"
          id="eventLocation"
          placeholder="Enter Name"
          onChange={(e) => console.log(e.target.value)}
          required
        />
      </div>
      <div className=" mb-3">
        <label htmlFor="eventLocation" className="form-label">
          Title*
        </label>
        <input
          type="text"
          name="eventLocation"
          value=""
          className="form-control"
          id="eventLocation"
          placeholder="Enter Name"
          onChange={(e) => console.log(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputPassword5" className="form-label">
          Author*
        </label>
        <select
          id="Author"
          className="form-select no-outline"
          onChange={(e) => console.log(e.target.value)}
        >
          <option value={""}>Select Author</option>
          <option value={"Pediatrics Conference"}>Pediatrics Conference</option>
          <option value={"Gynecology Conference"}>Gynecology Conference</option>
        </select>
      </div>
      <FileUpload title={"Speaker Image Upload*"} showBorder={true} />
      <RichTextEditor
        labelName={"Bio-Data*"}
        height="120px"
        initialValue={""}
        onChange={(content) => console.log("Edited content:", content)}
      />
      <RichTextEditor
        labelName={"Company Details*"}
        initialValue={data.company}
        onChange={(content) => console.log("Edited content:", content)}
      />
    </div>
  );
}

function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <div>
        <label className="form-label  mb-2">Name</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.name}</p>
      </div>
      <div>
        <label className="form-label  mb-2">Email</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.email}</p>
      </div>
      <div>
        <label className="form-label  mb-2">Event</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.event}
        </p>
      </div>


      <div>
        <label className="form-label mb-2">message</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
         {data.message}
        </p>
      </div>
    
    </div>
  );
}

function Delete({ data = null }) {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Contact Request</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
