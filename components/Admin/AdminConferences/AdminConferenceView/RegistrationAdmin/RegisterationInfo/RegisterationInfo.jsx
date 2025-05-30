"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../ConferencePageAdmin/LandingPage/RichTextEditor";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateRegistrationInfo } from "@/service/AdminConfernecePages/confernce"; // adjust import
import { Button } from "primereact/button";

export default function  RegisterationInfo({   selectedConferenceID,
  toast,
  registrationInfo,
  fetchConfernceData}) {
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });
  const journalData = (() => {
  const defaultEntry = {
    title: "Change Title",
    content: "Change Content",
  };

  const actualData = registrationInfo || [];

  // Always show at least 6 rows — fill remaining with defaults
  const filledData = [...actualData];
  while (filledData.length < 6) {
    filledData.push(defaultEntry);
  }

  return filledData;
})();

  const handleSidebar = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Registeration Info",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Registeration Info",
        content: <Edit data={data} toast={toast} setIsVisible={setIsVisible} fetchConfernceData={fetchConfernceData} selectedConferenceID={selectedConferenceID} />,
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
            <td className="p-2 table-heading">Title</td>
            <td className="p-2 table-heading">Content</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {journalData.map((element, i) => (
            <tr key={i}>
              <td className="p-3 table-data">{element.title}</td>
              <td className="p-3  table-data  text-truncate"
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

 function Edit({ data, toast, setIsVisible, fetchConfernceData, selectedConferenceID }) {

  const [buttonLoading, setButtonLoading] = useState(false);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data.title || "",
      content: data.content || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string()
        .test(
          "content-not-empty",
          "Content is required",
          (value) => value && value.replace(/<(.|\n)*?>/g, "").trim().length > 0
        )
        .required("Content is required"),
    }),
    onSubmit: async (values) => {
      setButtonLoading(true);

      try {
  
        const payload = {
          title: values.title,
          content: values.content,
        };

        const response = await updateRegistrationInfo( selectedConferenceID,payload, data.infoId);

        if (response.status === 200) {
          toast.current?.show({
            severity: "success",
            summary: "Updated",
            detail: response.data?.detail?.[0]?.msg || "Registration Info updated successfully",
          });
          fetchConfernceData();
          setIsVisible(false);
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Update failed",
            detail: "Something went wrong",
          });
        }
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.message || "Something went wrong",
        });
      } finally {
        setButtonLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column h-100">
      <div className="mb-3">
        <label className="form-label">Title*</label>
        <input
          type="text"
          name="title"
          className={`form-control ${formik.touched.title && formik.errors.title ? "is-invalid" : ""}`}
          placeholder="2nd International Conference On"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.topic && formik.errors.title && (
          <div className="text-danger">{formik.errors.title}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Content*</label>
        <RichTextEditor
          labelName=""
          initialValue={formik.values.content}
          onChange={(value) => formik.setFieldValue("content", value)}
        />
        {formik.touched.content && formik.errors.content && (
          <div className="text-danger">{formik.errors.content}</div>
        )}
      </div>

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
          loading={buttonLoading}
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

