"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../ConferencePageAdmin/LandingPage/RichTextEditor";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { patchQueriesAns } from "@/service/AdminConfernecePages/confernce";
export default function WebinarFAQAdmin({   selectedConferenceID,
  toast,
  FaQData,
  fetchConfernceData}) {
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });
  const faqData = (() => {
  const defaultEntry = {
    question: "Change Question",
    answer: "Change Answer",
  };

  const actualData = FaQData || [];
  // Always show at least 4 rows — fill remaining with defaults
  const filledData = [...actualData];
  while (filledData.length < 4) {
    filledData.push(defaultEntry);
  }

  return filledData;
})();
  const handleSidebar = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Queries Answered",
        content: <View data={data}/>,
      },
      edit: {
        header: "Edit Queries Answered",
        content: <Edit  data={data} toast={toast} setIsVisible={setIsVisible} fetchConfernceData={fetchConfernceData} selectedConferenceID={selectedConferenceID}  />,
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
            <td className="p-2 table-heading">Question</td>
            <td className="p-2 table-heading">Answer</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {faqData.map((element, i) => (
            <tr key={i}>
              <td className="p-3 table-data">{element.question}</td>
              <td className="p-3  table-data table-data text-truncate"
                      style={{ maxWidth: "200px" }}
                    >{element.answer}</td>
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
      question: data.question || "",
      answer: data.answer || "",
    },
    validationSchema: Yup.object({
      question: Yup.string().required("Question is required"),
      answer: Yup.string()
        .test(
          "content-not-empty",
          "Answer is required",
          (value) => value && value.replace(/<(.|\n)*?>/g, "").trim().length > 0
        )
        .required("Answer is required"),
    }),
    onSubmit: async (values) => {
      setButtonLoading(true);
      try {
        const payload = {
          question: values.question,
          answer: values.answer,
        };

        const res = await patchQueriesAns(selectedConferenceID,payload, data.qusId );

        if (res.status === 200) {
          toast.current?.show({
            severity: "success",
            summary: "Updated",
            detail: "FAQ updated successfully",
          });
          fetchConfernceData();
          setIsVisible(false);
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Failed",
            detail: response.data?.detail?.[0]?.msg ||"Something went wrong",
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
        <label className="form-label">Question*</label>
        <input
          type="text"
          name="question"
          className={`form-control ${formik.touched.question && formik.errors.question ? "is-invalid" : ""}`}
          value={formik.values.question}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter the question"
        />
        {formik.touched.question && formik.errors.question && (
          <div className="text-danger">{formik.errors.question}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Answer*</label>
        <RichTextEditor
          labelName=""
          initialValue={formik.values.answer}
          onChange={(value) => formik.setFieldValue("answer", value)}
        />
        {formik.touched.answer && formik.errors.answer && (
          <div className="text-danger">{formik.errors.answer}</div>
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
        />
      </div>
    </form>
  );
}

function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <div>
        <label className="form-label fw-bold mb-2">Question</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.question}</p>
      </div>
      <div>
        <label className="form-label fw-bold mb-2">Answer</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.answer}</p>
      </div>
    </div>
  );
}
