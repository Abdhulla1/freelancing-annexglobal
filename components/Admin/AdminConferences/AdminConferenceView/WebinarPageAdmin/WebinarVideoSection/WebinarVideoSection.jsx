"use client";
import React, { useState } from "react";
import RichTextEditor from "../../ConferencePageAdmin/LandingPage/RichTextEditor";
import { Sidebar } from "primereact/sidebar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveVideoSection } from "@/service/AdminConfernecePages/confernce";

export default function WebinarVideoSection({
  selectedConferenceID,
  toast,
  WebinarVideoSectionData,
  fetchConfernceData,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });
  const webinarData = (() => {
    const defaultEntry = {
      videoUrl: "Change the Video Link",
      title: "Change Title",
      content: "Change Content",
    };

    const actualData = WebinarVideoSectionData || [];

    // Always show at least 3 rows — fill remaining with defaults
    const filledData = [...actualData];
    while (filledData.length < 3) {
      filledData.push(defaultEntry);
    }

    return filledData;
  })();

  const handleSidebar = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Video Section",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Video Section",
        content: <Edit data={data} toast={toast} setIsVisible={setIsVisible} fetchConfernceData={fetchConfernceData} selectedConferenceID={selectedConferenceID}  />,
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
          </div>
        </>
      </Sidebar>
      <ConfirmDialog draggable={false} />
      <table className="tabel w-100  table-striped-columns">
        <thead>
          <tr>
            <td className="p-2 table-heading">Video Link</td>
            <td className="p-2 table-heading">Title</td>
            <td className="p-2 table-heading">Content</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {webinarData.map((element, i) => (
            <tr key={i}>
              <td
                className="p-3 table-data text-truncate"
                style={{ maxWidth: "200px" }}
              >
                {element.videoUrl}
              </td>
              <td className="p-3  table-data ">{element.title}</td>
              <td className="p-3  table-data text-truncate"
                      style={{ maxWidth: "200px" }}>{element.content}</td>
              <td className="p-3 table-data ">
                <div className="d-flex gap-1  justify-content-center flex-nowrap">
                  <button
                    name="edit"
                    className="btn btn-outline-secondary rounded"
                    onClick={(e) => handleSidebar(e.target.name, element)}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button>
                  {/* <button className="btn btn-outline-secondary rounded"    onClick={confirmDelete}>
                    <i className="bx bx-trash-alt"></i>
                  </button> */}
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
    </div>
  );
}

function Edit({
  data,
  toast,
  setIsVisible,
  fetchConfernceData,
  selectedConferenceID,
}) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data.title || "",
      videoUrl: data.videoUrl || "",
      content: data.content || "",
    },
    validationSchema: Yup.object({
      videoUrl: Yup.string()
        .url("Must be a valid URL")
        .required("Video link is required"),
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = {
          contentType: "Webinar",
          ...values,
        };
        const response = await saveVideoSection(payload, selectedConferenceID);
        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail: response.data?.detail?.[0]?.msg || "Video section updated",
            life: 3000,
          });
          fetchConfernceData();
          
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Warning!",
            detail:
              response.data?.detail?.[0]?.msg || "Unexpected server response",
            life: 3000,
          });
        }
      } catch (err) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to update video section. Please try again.",
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const valuesChanged =
    formik.values.videoUrl !== data.videoUrl ||
    formik.values.content !== data.content ||
    formik.values.title !== data.title;

  return (
    <form onSubmit={formik.handleSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Enter Title"
          {...formik.getFieldProps("title")}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-danger">{formik.errors.title}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="videoUrl" className="form-label">
          Video Link (YouTube)*
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
            type="url"
            name="videoUrl"
            className="form-control border border-0"
            placeholder="https://www.youtube.com/watch?v=..."
            {...formik.getFieldProps("videoUrl")}
            autoComplete="off"
          />
        </div>
        {formik.touched.videoUrl && formik.errors.videoUrl && (
          <div className="text-danger mt-1">{formik.errors.videoUrl}</div>
        )}
      </div>
      <RichTextEditor
        labelName="Content*"
        initialValue={formik.values.content}
        onChange={(value) => formik.setFieldValue("content", value)}
        height="120px"
      />
      {formik.touched.content && formik.errors.content && (
        <div className="text-danger mt-2">{formik.errors.content}</div>
      )}

      <div
        className="bg-secondary position-absolute z-2 bg-opacity-10 p-2 d-flex justify-content-center align-items-center gap-3 w-100"
        style={{ bottom: 0, left: 0, height: "80px" }}
      >
        <button
          type="button"
          className="btn px-5 bg-white border"
          onClick={() => setIsVisible(false)}
        >
          Close
        </button>
        <Button
          label="Save"
          type="submit"
          className="btn px-5 btn-warning text-white"
          loading={loading}
          style={{ outline: "none", boxShadow: "none" }}
        />
      </div>
    </form>
  );
}
function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <div>
        <label className="form-label fw-bold mb-2">Video Link</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.videoUrl}
        </p>
      </div>
      <div>
        <label className="form-label fw-bold mb-2">Title</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.title}</p>
      </div>
      <div>
        <label className="form-label fw-bold mb-2">Content</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.content}
        </p>
      </div>
    </div>
  );
}
