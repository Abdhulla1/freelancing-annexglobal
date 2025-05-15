"use client";
import React, { useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../AdminConferences/AdminConferenceView/ConferencePageAdmin/LandingPage/RichTextEditor";
import Image from "next/image";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";

const mediaLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/johndoe",
    isEnable: true,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/johndoe",
    isEnable: false,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/johndoe",
    isEnable: true,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/johndoe",
    isEnable: false,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UC123456",
    isEnable: true,
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/1234567890",
    isEnable: true,
  },
 
];

export default function FooterTabelAdmin({
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


  const handleModel = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Media Link",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Media Link",
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
            <td className="p-2 table-heading">#</td>
            <td className="p-2 table-heading">Name</td>
            <td className="p-2 table-heading">Url</td>
            <td className="p-2 table-heading">Enable/Disable</td>
            <td className="p-2 table-heading text-center">Action</td>

          </tr>
        </thead>
        <tbody>
          {mediaLinks.map((element, i) => (
            <tr key={i}>
              
              <td className="p-3 table-data">{i+1}</td>
              <td className="p-3 table-data">{element.name}</td>
              <td className="p-3  table-data ">{element.url}</td>
          
 <td className="p-3  table-data ">
                {" "}
                <InputSwitch
                  checked={element.isEnable}
                  onChange={(e) => console.log(e.value)}
                  style={{ scale: "0.7" }}
                />
              </td>
              <td className="p-3 table-data ">
                <div className="d-flex gap-1  justify-content-center flex-nowrap">
                  <button
                    name="edit"
                    className="btn btn-outline-secondary rounded"
                    onClick={(e) => handleModel(e.target.name, element)}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button>
                  {/* <button
                    className="btn btn-outline-secondary rounded"
                    onClick={confirmDelete}
                  >
                    <i className="bx bx-trash-alt"></i>
                  </button> */}
                  {/* <button
                    name="view"
                    className="btn btn-outline-warning rounded"
                    onClick={(e) => handleModel(e.target.name, element)}
                  >
                    <i className="bx bx-chevron-right"></i>
                  </button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
}

function Edit({ data }) {
  return (
    <div className="d-flex gap-3 container flex-column h-100">
        <div className="mt-2">
        <label htmlFor="title" className="form-label">
        {data.name} 
         </label>
         <div className='input-group border rounded p-1'>
         <span className="btn rounded-2 text-white me-1" id="basic-addon1" style={{backgroundColor:"#111880"}}><i className='bx bx-link-alt'></i></span>
         <input
          type="link"
          name="mapLink"
          value={data.url}
          className={`form-control border border-0`}
          id="link"
          placeholder="Enter Map Link"
          required
          autoComplete="off"
          onChange={(e)=>console.log(e.target.value)}
        />
         </div>
        
      </div>
  
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
