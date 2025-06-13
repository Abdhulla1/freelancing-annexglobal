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
  conferenceStatusToggle,
  savePermalink,deleteConference,
} from "@/service/adminConference";
import { useRouter } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
import SpecialRegistration from "./SpecialRegistration/SpecialRegistration";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { fetchUsers } from "@/service/adminService";
import UploadAbstract from "./ConferencePageAdmin/UploadAbstract/UploadAbstract";
import BrochureAdmin from "./BrochureAdmin/BrochureAdmin";
import SubmitAbstractAdmin from "./BrochureAdmin/SubmitAbstractAdmin";
import WebinarProgramAdmin from "./WebinarPageAdmin/WebinarProgramAdmin/WebinarProgramAdmin";
import ScientificProgramAdmin from "./ConferencePageAdmin/ScientificProgramAdmin/ScientificProgramAdmin";
import FAQPageAdmin from "./FAQPageAdmin/FAQPageAdmin";
import PastConferenceAdmin from "./PastConferenceAdmin/PastConferenceAdmin";
import { uploadImage } from "@/service/mediaManagemnt";
import { Toast } from "primereact/toast";
import Image from "next/image";
export default function AdminConferenceView({ conference, userData }) {
  const [activeMenu, setActiveMenu] = useState("Conference");
  const [selectedConference, setSelectedConference] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [nextStatusAction, setNextStatusAction] = useState(""); // "Publish" or "Draft"
  const [statusAction, setStatusAction] = useState("Draft");
  const [permalink, setPermalink] = useState("");
  const handleEditClick = (e) => {
    setIsDisabled((prev) => !prev);
  };
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
  const fetchConfernceData = async () => {
    try {
      const response = await getSelectedConference(conference);
      if (response.status === 404) {
        router.push("/notFound");
      } else {
        setSelectedConference(response);
      }
    } catch (error) {
      router.push("/notFound");
    }
  };
  const componentMap = {
    Conference: selectedConference ? (
      <ConferencePageAdmin
        selectedConferenceID={selectedConference._id}
        conference={selectedConference.conference}
        conferencevideoSection={selectedConference.conferencevideoSection}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
    Webinar: selectedConference ? (
      <WebinarPageAdmin
        selectedConferenceID={selectedConference._id}
        webinar={selectedConference.webinar}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
    Speakers: selectedConference ? (
      <SpeakerAdmin
        selectedConferenceID={selectedConference._id}
        speakers={selectedConference.speakers}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
    OCM: selectedConference ? (
      <OCMAdmin
        selectedConferenceID={selectedConference._id}
        ocm={selectedConference.ocm}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
    FAQ: selectedConference ? (
      <FAQPageAdmin
        selectedConferenceID={selectedConference._id}
        faq={selectedConference.faq}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
    Brochure: selectedConference ? (
      <BrochureAdmin
        selectedConferenceID={selectedConference._id}
        brochure={selectedConference.brochure}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
    Abstract: selectedConference ? (
      <SubmitAbstractAdmin
        selectedConferenceID={selectedConference._id}
        abstract={selectedConference.abstract}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
    "Webinar Program": selectedConference ? (
      <WebinarProgramAdmin
        selectedConferenceID={selectedConference._id}
        webinarProgram={selectedConference.webinarProgram}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
    Topics: selectedConference ? (
      <TopicsAdmin
        selectedConferenceID={selectedConference._id}
        topics={selectedConference.topics}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
    Venue: selectedConference ? (
      <VenuePageAdmin
        selectedConferenceID={selectedConference._id}
        venuePage={selectedConference.venue}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
    Registration: selectedConference ? (
      <RegistrationAdmin
        selectedConferenceID={selectedConference._id}
        registration={selectedConference.registration}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
    "Past Conference": selectedConference ? (
      <PastConferenceAdmin
        selectedConferenceID={selectedConference._id}
        pastConference={selectedConference.pastConference}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
    "Special Registration": selectedConference ? (
      <SpecialRegistration
        selectedConferenceID={selectedConference._id}
        specialRegistration={selectedConference.specialRegistration}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
    "Scientific Program": selectedConference ? (
      <ScientificProgramAdmin
        selectedConferenceID={selectedConference._id}
        scientificProgram={selectedConference.scientificProgram}
        fetchConfernceData={fetchConfernceData}
      />
    ) : null,
  };
  const fetchData = async () => {
    try {
      const response = await getSelectedConference(conference);
      const userList = await fetchUsers();
      setAdminsData(userList);
      if (response.status === 404) {
        router.push("/notFound");
      } else {
        setSelectedConference(response);
      }
    } catch (error) {
      router.push("/notFound");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (selectedConference?.action) {
      setStatusAction(selectedConference.action);
    }
    if (selectedConference?.permalink) {
      setPermalink(selectedConference.permalink);
    }
  }, [selectedConference]);
  const handleConfirmStatusToggle = async () => {
    // const nextAction = statusAction === "Publish" ? "Draft" : "Publish";
    const payload = {
      action: nextStatusAction,
    };
    try {
      const response = await conferenceStatusToggle(
        selectedConference._id,
        payload
      );
      if (response.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: `Conference marked as ${nextStatusAction}`,
          life: 3000,
        });
        setStatusAction(nextStatusAction); // Update local state
        fetchData(); // refresh data if needed
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Failed",
          detail: response.data?.detail?.[0]?.msg || "Unable to toggle status",
          life: 3000,
        });
      }
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to toggle status",
        life: 3000,
      });
    } finally {
      setShowStatusConfirm(false); // Hide dialog
    }
  };
  const handlePermalinkToggle = async (e) => {
    e.preventDefault();

    // If input is currently editable, attempt to save it
    if (!isDisabled) {
      try {
        const response = await savePermalink(selectedConference._id, {
          permalink: permalink.trim(),
        });

        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Permalink Updated",
            detail: "Permalink saved successfully.",
            life: 3000,
          });
          setIsDisabled(true); // Disable only if save is successful
          fetchData(); // Optional: refresh from backend
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Error",
            detail:
              response.data?.detail?.[0]?.msg || "Failed to save permalink.",
            life: 3000,
          });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail:
            error.message || "Something went wrong while saving permalink.",
          life: 3000,
        });
      }
    } else {
      // Enable edit mode if currently disabled
      setIsDisabled(false);
    }
  };

  const handleBack = () => {
    router.push("/admin-annex-global-conferences/dashboard/conference");
  };
  const handleDelete = async (conferenceID) => {
    try {
      const response = await deleteConference(conferenceID);
      if (response.status !== 200) {
        throw new Error(
          response.data.detail[0].msg || "Failed to delete testimonial"
        );
      }
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Conference has been deleted.",
        life: 3000,
      });
      handleBack();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Failed to delete. Please try again.",
        life: 3000,
      });
    }
  };
  const confirmDelete = (conferenceID) => {
    const accept = () => {
      handleDelete(conferenceID);
    };
    confirmDialog({
      message: <Delete />,
      acceptLabel: "OK",
      rejectLabel: "Cancel",
      acceptClassName: "btn px-5 btn-warning text-white shadow-none",
      rejectClassName: "btn px-5 bg-white border me-3 shadow-none",
      defaultFocus: "accept",
      accept,
      className: "custom-confirm-dialog",
    });
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
          imageUrl = imageUploadResponse.data?.detail?.message?.[0]?.url || "";
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
          detail:
            response.data?.detail[0]?.msg || "Unexpected response from server.",
          life: 3000,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error || "Something went wrong during update.",
        life: 3000,
      });
    }
  };
  const hasChanges = () => {
    const nameChanged =
      newConferenceData.name.trim() !== selectedConference.name;
    const userChanged =
      newConferenceData.assignedUser !== selectedConference.user;
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
        header="Update Conference"
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
                !newConferenceData.assignedUser ||
                !hasChanges()
              }
            >
              Update
            </button>
          </div>
        }
        className="custom-confirm-dialog"
      />
<ConfirmDialog
  visible={showDeleteConfirm}
  onHide={() => setShowDeleteConfirm(false)}
  draggable={false}
  message={<Delete />}
  header="Confirm Delete"
  footer={
    <div className="d-flex justify-content-end">
      <button
        className="btn bg-white border me-3 shadow-none"
        onClick={() => setShowDeleteConfirm(false)}
      >
        Cancel
      </button>
      <button
        className="btn btn-danger text-white shadow-none"
        onClick={() => {
          handleDelete(selectedConference._id);
          setShowDeleteConfirm(false);
        }}
      >
        Yes, Delete
      </button>
    </div>
  }
/>

      <ConfirmDialog
        visible={showStatusConfirm}
        onHide={() => setShowStatusConfirm(false)}
        draggable={false}
        message={<ConfirmPublishDraft action={nextStatusAction} />}
        header={`Confirm ${nextStatusAction}`}
        footer={
          <div className="d-flex justify-content-end">
            <button
              className="btn bg-white border me-3 shadow-none"
              onClick={() => setShowStatusConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-warning text-white shadow-none"
              onClick={handleConfirmStatusToggle}
            >
              Yes, {nextStatusAction}
            </button>
          </div>
        }
      />

      <div className="d-flex justify-content-between">
        <h5 className="fw-bold">
          {userData.isRoleUser ? (
            ""
          ) : (
            <i
              className="bx bx-chevron-left text-center cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={handleBack}
            ></i>
          )}

          {selectedConference.name}
          <button name="edit" className="btn " onClick={handleAddConference}>
            <i className="bx bx-edit-alt"></i>
          </button>
        </h5>
        <div>
          <div className="d-flex gap-2 align-items-center">
            <label className="d-inline">Permalink</label>
            <input
              type="text"
              name="permalink"
              className="form-control"
              placeholder="Enter Permalink Name"
              value={permalink}
              onChange={(e) => setPermalink(e.target.value)}
              required
              disabled={isDisabled}
            />
            <button
              name="edit"
              className="btn btn-outline-secondary rounded"
              onClick={handlePermalinkToggle}
            >
              <i className="bx bx-edit-alt"></i>
            </button>
            <button
              className={`btn ${
                statusAction === "Publish" ? "btn-secondary" : "btn-success"
              } text-white`}
              onClick={(e) => {
                e.preventDefault();
                const next = statusAction === "Publish" ? "Draft" : "Publish";
                setNextStatusAction(next);
                setShowStatusConfirm(true);
              }}
            >
              {statusAction === "Publish" ? " Draft" : "Publish"}
            </button>
            <button
              className={`btn btn-danger text-white`}
              disabled={statusAction === "Publish" ? true : false}
              onClick={() => setShowDeleteConfirm(true)}

            >
              Delete
            </button>
          </div>
        </div>
      </div>

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
  const [newUser, setNewUser] = useState("");
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
    setNewUser(e.target.value);
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
        {userList.length === 0 ? (
          <div className="alert alert-warning p-2 mt-2" role="alert">
            No users found. Please add users first.
          </div>
        ) : (
          <select
            className="form-control"
            id="assignUser"
            onChange={handleUserSelect}
            required
            value={newUser || ""}
          >
            <option value="" disabled>
              Select a user
            </option>
            {userList.map((user, i) => (
              <option key={i} value={user}>
                {user}
              </option>
            ))}
          </select>
        )}
      </div>

      <FileUpload
        title={"Add Conference Logo *"}
        onFileChange={handleFileChange}
        imageUrl={data.logoUrl}
        dimensionNote="Recommended dimensions: Width 230x × Height 230px"
      />
      <FileUpload
        title={"Add Conference Card Background *"}
        onFileChange={handleConferenceBgChange}
        imageUrl={data.cardBgImage}
        dimensionNote="Recommended dimensions: Width 530px × Height 380px"
      />
    </>
  );
}
function ConfirmPublishDraft({ action }) {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <span className="fs-1">⚠️</span>
      <h5 className="mt-3">{action} Conference</h5>
      <p className="mb-0 col-md-10">
        Are you sure you want to{" "}
        {action === "Publish"
          ? "make this conference live"
          : "move this conference back to draft mode"}
        ?
      </p>
      <p className="mt-3 mb-0 col-md-10 text-secondary">
        Please make sure all important details are complete and accurate before
        proceeding. Once confirmed, this action will update how the conference
        is displayed.
      </p>
    </div>
  );
}
function Delete() {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Conference</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Conference? This action cannot be
        undone.
      </p>
    </div>
  );
}
