import React, { useState, useEffect } from "react";
import RichTextEditor from "../../ConferencePageAdmin/LandingPage/RichTextEditor";
import {
  saveWelcomeContent,
  getSelectedConference,
} from "@/service/adminConference";
export default function ConferenceReport({ selectedConferenceID,toast}) {

  const [formData, setFormData] = useState({
    contentType: "Conference",
    title: "",
    content: "",
  });
 const [selectedConference, setSelectedConference] = useState("");
  useEffect(() => {
    const fetchLandingPageData = async () => {
      try {
        const res = await getSelectedConference(selectedConferenceID);
        const welcomeContent = res?.conference?.welcomeContent;

        if (welcomeContent) {
          setFormData({
            contentType: "Conference",
            title: welcomeContent.title || "",
            content: welcomeContent.content || "",
          });
        }

      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Fetch Error",
          detail: "Failed to load existing welcome content data.",
          life: 3000,
        });
      }
    };

    fetchLandingPageData();
  }, [selectedConferenceID]);

  const handleChangeContent = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };
  const isFormFilled = formData.title && formData.content;
  const handleSubmit = () => {
    const submitWelcomeContent = async () => {
      try {
        const response = await saveWelcomeContent(
          formData,
          selectedConferenceID
        );
        if (response[0].msg === "No modifications found") {
          toast.current.show({
            severity: "warn",
            summary: "Warning",
            detail: "No modifications found",
            life: 3000,
          });
        }
        if (response[0].msg === "Welcome content updated successfully") {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail: "Welcome content updated successfully",
            life: 3000,
          });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Submission failed",
          detail: "Failed to submit Welcome Content. Please try again.",
          life: 3000,
        });
      }
    };
    if (isFormFilled) {
      submitWelcomeContent();
    }
  };
 const conferenceTitles = [
  "Annual Congress on gynecology, obstetrics & women’s health",
  "Primary Healthcare, Pain Management & Functional Structure",
  "International Conference on global healthcare",
  "International webinar on global healthcare",
  "International webinar on oncology & cancer research",
  "International Webinar on Gynaecology, Obstetrics and Women’s Healthcare",
];

  return (
    <div className="mt-5 ">
  <div className="mb-4">
    <label htmlFor="assignUser" className="form-label">
      Map Conference*
    </label>
    <select
      className="form-control"
      id="assignUser"
      required
      value={selectedConference}
      onChange={(e) => setSelectedConference(e.target.value)}
    >
      <option value="" disabled>
        Select a Conference
      </option>
      {conferenceTitles.map((conference, i) => (
        <option key={i} value={conference}>
          {conference}
        </option>
      ))}
    </select>
  </div>
      <div className="mb-4">
        <label htmlFor="title" className="form-label">
          Title*
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          className={`form-control `}
          id="title"
          placeholder="Enter Title"
          required
          autoComplete="off"
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              title: e.target.value,
            }))
          }
        />
      </div>
      <RichTextEditor
        labelName={"Content*"}
        initialValue={formData.content}
        height="150px"
        onChange={handleChangeContent}
      />

      <div className="bg-secondary bg-opacity-10 mt-4 p-2 d-flex justify-content-end align-items-center gap-2 w-100">
        <button
          type="button"
          className="btn px-5 bg-white border"
          disabled={!isFormFilled}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="btn px-1 px-md-5 btn-warning text-white"
          disabled={!isFormFilled}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
