"use client";
import React, { useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../AdminConferences/AdminConferenceView/ConferencePageAdmin/LandingPage/RichTextEditor";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
const speakerData = [
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Pam Beesaley",
    title: "Associate Professor",
    author: "Pediatrics Conference",
    company: "Faculty of Law, National Autonomous University",
    status: false,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Michael Scott",
    title: "Senior Legal Advisor",
    author: "Gynecology Conference",
    company: "Scranton Law College",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Angela Martin",
    title: "Legal Consultant",
    author: "Pediatrics Conference",
    company: "Global Legal Solutions Ltd.",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Jim Halpert",
    title: "Corporate Law Specialist",
    author: "Pediatrics Conference",
    company: "Dunder Legal Group",
    status: false,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Dwight Schrute",
    title: "Compliance Officer",
    author: "Gynecology Conference",
    company: "BeetTech Legal Advisory",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Oscar Martinez",
    title: "Tax Law Analyst",
    author: "Pediatrics Conference",
    company: "GreenLedger Consultancy",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Phyllis Vance",
    title: "Human Rights Lawyer",
    author: "Pediatrics Conference",
    company: "Equality Now Foundation",
    status: false,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Stanley Hudson",
    title: "Labor Law Specialist",
    author: "Pediatrics Conference",
    company: "Hudson Employment Law Center",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Ryan Howard",
    title: "Legal Tech Consultant",
    author: "Pediatrics Conference",
    company: "Incubator Legal Labs",
    status: false,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Kelly Kapoor",
    title: "International Law Expert",
    author: "Pediatrics Conference",
    company: "Global Voices Legal Network",
    status: true,
  },
];

export default function SpeakersTabelAdmin({
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
        header: "View Speaker",
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
            <td className="p-2 table-heading">Speaker Image</td>
            <td className="p-2 table-heading">Name</td>
            <td className="p-2 table-heading">Title</td>
            <td className="p-2 table-heading">Company</td>
            <td className="p-2 table-heading">Author</td>
            <td className="p-2 table-heading">Status</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {speakerData.map((element, i) => (
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
              <td className="p-3 table-data">{element.title}</td>
              <td className="p-3  table-data ">{element.company}</td>
              <td className="p-3  table-data text-nowrap ">{element.author}</td>
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
                    onClick={(e) => handleModel(e.target.name, element)}
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
      <button
        name="add"
        className="btn btn-lg text-white rounded-circle  btn-warning position-absolute"
        style={{ bottom: "50px", right: "50px", zIndex: 1000 }}
        onClick={(e) => handleModel(e.target.name)}
      >
        +
      </button>
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
        <label className="form-label  mb-2">title</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.title}</p>
      </div>
      <div>
        <label className="form-label  mb-2">Author</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.author}
        </p>
      </div>
      <label className="form-label">Speaker Image</label>
      <Image src={data.image} width={100} height={100} alt="image" />

      <div>
        <label className="form-label mb-2">Bio-Data</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          Dubai, a charming city in the United Arab Emirates, skillfully
          combines contemporary and heritage. Recognized for the 
          world’s tallest structure, the Burj Khalifa, Dubai offers contemporary
          architecture,
        </p>
      </div>
      <div>
        <label className="form-label mb-2">Company</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.company}
        </p>
      </div>
    </div>
  );
}

function Delete({ data = null }) {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Speaker</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
