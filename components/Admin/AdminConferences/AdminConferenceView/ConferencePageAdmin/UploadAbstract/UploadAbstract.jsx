import React, { useState, useEffect } from "react";
import DropZoneFile from "@/components/Reusable/DropeZone/DropZoneFile";
import {
  saveWelcomeContent,
  getSelectedConference,
} from "@/service/adminConference";
export default function UploadAbstract({ selectedConferenceID, toast }) {
  const [formData, setFormData] = useState({
    contentType: "Conference",
    title: "",
    content: "",
  });

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

  return (
    <div className="mt-5 ">
      <div className="d-flex justify-content-between">
        {/* <h5>Abstract</h5> */}
        {/* <button className="btn btn-warning text-white">
                       Publish
                    </button> */}
      </div>
      <div>
        <div>
          <label className="form-label">Upload Abstract</label>
          <DropZoneFile />
        </div>
      </div>
    </div>
  );
}
