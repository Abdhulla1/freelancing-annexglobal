import React, { useState, useEffect } from "react";
import FileUploadVideo from "@/components/Reusable/Admin/FileUpload/FileUploadVideo";
import RichTextEditor from "../../AdminConferences/AdminConferenceView/ConferencePageAdmin/LandingPage/RichTextEditor";
import { uploadVideo } from "@/service/mediaManagemnt";
import {
  saveVideoSection,
  getSelectedConference,
} from "@/service/adminConference";
import { Button } from "primereact/button";
export default function VideoSection({ selectedConferenceID, toast }) {
  const [video, setVideo] = useState([{ file: null }]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  // Fetch data on component mount or ID change
  useEffect(() => {
    const fetchLandingPageData = async () => {
      try {
        const res = await getSelectedConference(selectedConferenceID);
        const videoSection = res?.conference?.videoSection;
        console.log(videoSection);
        // if (landing) {
        //   setFormData({
        //     title: landing.startDate || "",
        //     content: landing.endDate || "",
        //     location: landing.location || "",
        //     address: landing.address || "",
        //     startTime: landing.startTime || "",
        //     endTime: landing.endTime || "",
        //   });

        //   if (landing.images && landing.images.length > 0) {
        //     setUploads(
        //       landing.images.map((imgUrl) => ({
        //         id: Date.now() + Math.random(),
        //         file: { preview: imgUrl, isUploaded: true }, // Custom format for existing images
        //       }))

        //     );
        //   }
        // }
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Fetch Error",
          detail: "Failed to load existing landing page data.",
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

  const isFormFilled =
    formData.title.trim() !== "" &&
    formData.content.trim() !== "" &&
    video !== null;
  const handleSubmit = async () => {
    if (!video) {
      toast.current.show({
        severity: "error",
        summary: "Video Upload Error",
        detail: "Please upload a video before submitting.",
        life: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const videoResponse = await uploadVideo(video);
      const videoUrl = videoResponse.url;

      const payload = {
        contentType: "Conference",
        title: formData.title,
        description: formData.content,
        videoUrl,
      };
      const response = await saveVideoSection(payload, selectedConferenceID);

      console.log("Payload to submit:", response[0].msg);
      if (response[0].msg === "Video section updated successfully") {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Video section submitted successfully!",
          life: 3000,
        });
        setLoading(false);
      } else {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: response[0].msg || "Something Went Wrong!",
          life: 3000,
        });
        setLoading(false);
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Submission Failed",
        detail: "An error occurred while submitting the video section.",
        life: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <FileUploadVideo onFileChange={setVideo} /> */}
      <div className="mt-4">
        <label htmlFor="title" className="form-label">
          Video Link(Youtube)*
        </label>
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
            placeholder="https://www.youtube.com/watch?v=19eIVnOI9Do"
            required
            autoComplete="off"
          />
        </div>
      </div>
      <div className="mb-4 mt-4">
        <label htmlFor="title" className="form-label">
          Title*
        </label>
        <input
          type="text"
          name="title"
          className="form-control"
          id="title"
          placeholder="Enter Title"
          required
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              [e.target.name]: e.target.value,
            }))
          }
          autoComplete="off"
        />
      </div>

      <RichTextEditor
        labelName={"Content*"}
        initialValue={formData.content}
        onChange={handleChangeContent}
      />

      <div className="bg-secondary bg-opacity-10 mt-4 p-2 d-flex justify-content-end align-items-center gap-2 w-100">
        <button type="button" className="btn px-5 bg-white border">
          Cancel
        </button>
        <Button
          onClick={handleSubmit}
          loading={loading}
          className="btn px-1 px-md-5 btn-warning text-white"
          disabled={!isFormFilled}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
