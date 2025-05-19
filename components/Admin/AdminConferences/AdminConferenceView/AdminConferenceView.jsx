"use client";
import React, { useState, useEffect, useRef } from "react";
import Sidenav from "../../Dashboard/Sidenav/Sidenav";
import ConferencePageAdmin from "./ConferencePageAdmin/ConferencePageAdmin";
import WebinarPageAdmin from "./WebinarPageAdmin/WebinarPageAdmin";
import SpeakerAdmin from "./SpeakerAdmin/SpeakerAdmin";
import OCMAdmin from "./OCMAdmin/OCMAdmin";
import TopicsAdmin from "./TopicsAdmin/TopicsAdmin";
import VenuePageAdmin from "./VenuePageAdmin/VenuePageAdmin";
import RegistrationAdmin from "./RegistrationAdmin/RegistrationAdmin";
import {
  getSelectedConference,
  saveConference,
} from "@/service/adminConference";
import { useRouter } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
import SpecialRegistration from "./SpecialRegistration/SpecialRegistration";
import { Toast } from "primereact/toast";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import {fetchAdmins} from "@/service/adminService";
import UploadAbstract from "./ConferencePageAdmin/UploadAbstract/UploadAbstract";
import BrochureAdmin from "./BrochureAdmin/BrochureAdmin";
import SubmitAbstractAdmin from "./BrochureAdmin/SubmitAbstractAdmin";
import WebinarProgramAdmin from "./WebinarPageAdmin/WebinarProgramAdmin/WebinarProgramAdmin";
import ScientificProgramAdmin from "./ConferencePageAdmin/ScientificProgramAdmin/ScientificProgramAdmin";
import FAQPageAdmin from "./FAQPageAdmin/FAQPageAdmin";
export default function AdminConferenceView({ conference }) {
  const [activeMenu, setActiveMenu] = useState("Conference");
  const [selectedConference, setSelectedConference] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newConferenceData, setNewConferenceData] = useState({
    name: "",
    file: null,
    conferenceBg: null,
    assignedUserId: "",
  });
  const [adminsData, setAdminsData] = useState([]);
  const toast = useRef(null);

  const router = useRouter();

  const navItems = [
    { item: "Conference" },
    { item: "Webinar" },
    { item: "Speakers" },
    { item: "OCM" },
    { item: "FAQ" },
    { item: "Brochure"},
    { item: "Abstract" },
    { item: "Scientific Program" },
    { item: "Webinar Program" },
    { item: "Topics" },
    { item: "Venue" },
    { item: "Registration" },
    { item: "Special Registration" },
  ];

  const componentMap = {
    Conference: selectedConference ? (
      <ConferencePageAdmin selectedConferenceID={selectedConference._id} />
    ) : null,
    Webinar: <WebinarPageAdmin />,
    Speakers: <SpeakerAdmin />,
    OCM: <OCMAdmin />,
    FAQ: <FAQPageAdmin />,
    "Brochure": <BrochureAdmin />,
    "Abstract": <SubmitAbstractAdmin />,
    "Webinar Program": <WebinarProgramAdmin/> ,
    Topics: <TopicsAdmin />,
    Venue: <VenuePageAdmin />,
    Registration: <RegistrationAdmin />,

    "Special Registration": <SpecialRegistration />,
       "Scientific Program": <ScientificProgramAdmin />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSelectedConference(conference);
        const userList = await fetchAdmins();
        setAdminsData(userList);
        if (response.status === 404) {
          router.push("/notFound");
        } else {
          setSelectedConference(response);
        }
      } catch (error) {
        console.error("Failed to fetch conference data", error);
      }
    };
    fetchData();
  }, []);

  const handleBack = () => {
    router.push("/admin-annex-global-conferences/dashboard/conference");
  };

  if (selectedConference === null) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="5"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      </div>
    );
  }
  const handleCancel = () => {
    setShowAddDialog(false);
  };
    const handleAddConference = () => {
    setShowAddDialog(true);
  };
  const handleSaveConference = async () => {
    try {
      let imageUrl = "";

      // Step 1: Upload image if file is present
      if (newConferenceData.file) {
        try {
          const imageUploadResponse = await uploadImage(newConferenceData.file);
          imageUrl = imageUploadResponse.url || "";
        } catch (imageError) {
          toast.current.show({
            severity: "error",
            summary: "Image Upload Error",
            detail: "Failed to upload conference logo. Please try again.",
            life: 3000, // Toast duration
          });
          return;
        }
      }
      // Step 1 (additional): Upload background image if bgFile is present
      if (newConferenceData.bgFile) {
        try {
          const bgUploadResponse = await uploadImage(
            newConferenceData.conferenceBg
          );
          bgUrl = bgUploadResponse.url || "";
        } catch (bgError) {
          toast.current.show({
            severity: "error",
            summary: "Background Upload Error",
            detail: "Failed to upload background image. Please try again.",
            life: 3000,
          });
          return;
        }
      }
      // Step 2: Save the conference data
      const payload = {
        name: newConferenceData.name,
        logoUrl: imageUrl,
        conferenceBgUrl: bgUrl,
        assignedUserId: newConferenceData.assignedUserId,
      };

      const response = await saveConference(payload);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Conference Save Error",
        detail: "Failed to save conference. Please try again.",
        life: 3000, // Toast duration
      });
    }
  };
  return (
    <div className="container p-2">
              <Toast ref={toast} />
      
      <ConfirmDialog
        visible={showAddDialog}
        onHide={handleCancel}
        message={
          <AddNewConference
            data={selectedConference}
            setData={setNewConferenceData}
            userList={adminsData}
          />
        }
        header="Add New Conference"
        footer={
          <div className="d-flex justify-content-end">
            <button
              className="btn px-5 bg-white fw-normal border me-3 shadow-none"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="btn px-5 btn-warning fw-normal text-white shadow-none"
              onClick={handleSaveConference}
              disabled={
                !newConferenceData.name.trim() ||
                !newConferenceData.file ||
                !newConferenceData.conferenceBg ||
                !newConferenceData.assignedUserId
              }
            >
              Upload
            </button>
          </div>
        }
        className="custom-confirm-dialog"
      />
      <h5 className="fw-bold">
        <i
          className="bx bx-chevron-left text-center cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={handleBack}
        ></i>
        {selectedConference.name}
        <button name="edit" className="btn "  onClick={handleAddConference}>
          <i className="bx bx-edit-alt"></i>
        </button>
      </h5>

      <div className="row gap-2 gap-md-0 p-3">
        <div className="col-12 col-md-3">
          <Sidenav
            navItems={navItems}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
        <div className="col-md-9 col-12 p-3 bg-white rounded-2">
          {componentMap[activeMenu]}
        </div>
      </div>
    </div>
  );
}
export function AddNewConference({ data, setData, userList }) {
  console.log(data)
  const handleNameChange = (e) => {
    setData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleFileChange = (file) => {
    setData((prev) => ({ ...prev, file }));
  };
  const handleConferenceBgChange = (conferenceBg) => {
    setData((prev) => ({ ...prev, conferenceBg }));
  };
  const handleUserSelect = (e) => {
    setData((prev) => ({ ...prev, assignedUserId: e.target.value }));
  };
  return (
    <>
      <div className="mb-4 mt-4">
        <label htmlFor="conferenceName" className="form-label">
          Conference Name*
        </label>
        <input
          type="text"
          name="conferenceName"
          className={`form-control `}
          id="conferenceName"
          placeholder="Enter Conference Name"
          required
          value={data.name}
          onChange={handleNameChange}
          autoComplete="off"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="assignUser" className="form-label">
          Assign to User*
        </label>
        <select
          className="form-control"
          id="assignUser"
          onChange={handleUserSelect}
          required
          value={data.assignedUserId || ""}
        >
          <option value="" disabled>
            Select a user
          </option>
          {userList.map((user, i) => (
            <option key={i} value={user._id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>
      <FileUpload
        title={"Add Conference Logo *"}
        onFileChange={handleFileChange}
        imageUrl={data.logoUrl}
      />
      <FileUpload
        title={"Add Conference Card Background *"}
        onFileChange={handleConferenceBgChange}
      />
    </>
  );
}
