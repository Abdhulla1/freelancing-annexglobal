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
  updateConference,
} from "@/service/adminConference";
import { useRouter } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
import SpecialRegistration from "./SpecialRegistration/SpecialRegistration";
import { Toast } from "primereact/toast";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { fetchAdmins } from "@/service/adminService";
import UploadAbstract from "./ConferencePageAdmin/UploadAbstract/UploadAbstract";
import BrochureAdmin from "./BrochureAdmin/BrochureAdmin";
import SubmitAbstractAdmin from "./BrochureAdmin/SubmitAbstractAdmin";
import WebinarProgramAdmin from "./WebinarPageAdmin/WebinarProgramAdmin/WebinarProgramAdmin";
import ScientificProgramAdmin from "./ConferencePageAdmin/ScientificProgramAdmin/ScientificProgramAdmin";
import FAQPageAdmin from "./FAQPageAdmin/FAQPageAdmin";
import PastConferenceAdmin from "./PastConferenceAdmin/PastConferenceAdmin";
import { uploadImage } from "@/service/mediaManagemnt";
export default function AdminConferenceView({ conference }) {
  const [activeMenu, setActiveMenu] = useState("Conference");
  const [selectedConference, setSelectedConference] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newConferenceData, setNewConferenceData] = useState({
    name: "",
    file: null,
    conferenceBg: null,
    assignedUser: "",
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
    { item: "Brochure" },
    { item: "Abstract" },
    { item: "Scientific Program" },
    { item: "Webinar Program" },
    { item: "Topics" },
    { item: "Venue" },
    { item: "Registration" },
    { item: "Special Registration" },
    { item: "Past Conference" },
  ];

  const componentMap = {
    Conference: selectedConference ? (
      <ConferencePageAdmin selectedConferenceID={selectedConference._id} />
    ) : null,
    Webinar: <WebinarPageAdmin />,
    Speakers: <SpeakerAdmin />,
    OCM: <OCMAdmin />,
    FAQ: <FAQPageAdmin />,
    Brochure: <BrochureAdmin />,
    Abstract: <SubmitAbstractAdmin />,
    "Webinar Program": <WebinarProgramAdmin />,
    Topics: <TopicsAdmin />,
    Venue: <VenuePageAdmin />,
    Registration: <RegistrationAdmin />,
    "Past Conference": <PastConferenceAdmin />,
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
    setNewConferenceData({
      name: selectedConference.name,
      logoUrl: selectedConference.logoUrl,
      cardBgImage: selectedConference.cardBgImage,
      assignedUser: selectedConference.user,
      file: null, // let user re-upload if needed
      conferenceBg: null,
    });
    setShowAddDialog(true);
  };
  const handleUpdateConference = async () => {
    try {
      let imageUrl = newConferenceData.logoUrl || "";
      let bgUrl = newConferenceData.cardBgImage || "";

      // Upload logo image only if new file is selected
      if (newConferenceData.file) {
        try {
          const imageUploadResponse = await uploadImage(newConferenceData.file);
          imageUrl = imageUploadResponse.data?.detail?.message?.[0]?.url|| "";
          if (!imageUrl) throw new Error("Empty logo URL");
        } catch (imageError) {
          toast.current.show({
            severity: "error",
            summary: "Image Upload Error",
            detail: "Failed to upload conference logo. Please try again.",
            life: 3000,
          });
          return;
        }
      }

      // Upload background image only if new file is selected
      if (newConferenceData.conferenceBg) {
        try {
          const bgUploadResponse = await uploadImage(
            newConferenceData.conferenceBg
          );
          bgUrl = bgUploadResponse.data?.detail?.message?.[0]?.url || "";
          if (!bgUrl) throw new Error("Empty background URL");
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

      // Validate required fields
      if (!newConferenceData.name.trim() || !newConferenceData.assignedUser) {
        toast.current.show({
          severity: "warn",
          summary: "Validation Error",
          detail: "Name and assigned user are required.",
          life: 3000,
        });
        return;
      }

      const payload = {
        name: newConferenceData.name,
        user: newConferenceData.assignedUser,
        logoUrl: imageUrl,
        cardBgImage: bgUrl,
      };

      const response = await updateConference(selectedConference._id, payload);
      if (response.status === 200) {
          // Update local state to reflect changes in UI
      setSelectedConference((prev) => ({
        ...prev,
        name: newConferenceData.name,
        logoUrl: imageUrl,
        cardBgImage: bgUrl,
        user: newConferenceData.assignedUser,
      }));
        setShowAddDialog(false);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Conference updated  successfully!",
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Update Failed",
          detail: response.data?.detail[0]?.msg || "Unexpected response from server.",
          life: 3000,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error|| "Something went wrong during update.",
        life: 3000,
      });
    }
  };
const hasChanges = () => {
  const nameChanged = newConferenceData.name.trim() !== selectedConference.name;
  const userChanged = newConferenceData.assignedUser !== selectedConference.user;
  const logoChanged = !!newConferenceData.file;
  const bgChanged = !!newConferenceData.conferenceBg;

  return nameChanged || userChanged || logoChanged || bgChanged;
};
  return (
    <div className="container p-2">
      <Toast ref={toast} />

      <ConfirmDialog
        visible={showAddDialog}
        onHide={handleCancel}
        draggable={false}
        message={
          <AddUpdateConference
            data={newConferenceData}
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
              onClick={handleUpdateConference}
              disabled={
                !newConferenceData.name.trim() ||
                !newConferenceData.assignedUser||
                !hasChanges()
              }
            >
              Update
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
        <button name="edit" className="btn " onClick={handleAddConference}>
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
export function AddUpdateConference({ data, setData, userList }) {
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
    setData((prev) => ({ ...prev, assignedUser: e.target.value }));
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
          value={data.assignedUser || ""}
        >
          <option value="" disabled>
            Select a user
          </option>
          {userList.map((user, i) => (
            <option key={i} value={user.email}>
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
        imageUrl={data.cardBgImage}
      />
    </>
  );
}
