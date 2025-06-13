"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../ConferencePageAdmin/LandingPage/RichTextEditor";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { Paginator } from "primereact/paginator";
import {
  deleteEssentialInnovation,
  patchEssentialInnovation,
} from "@/service/AdminConfernecePages/confernce";
import { uploadImage, deleteMedia } from "@/service/mediaManagemnt";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import * as Yup from "yup";
export default function EssentialInnovationTable({
  selectedConferenceID,
  essentialInnovation,
  fetchConfernceData,
  toast,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });
  const [first, setFirst] = useState(0); // starting index
  const [rows, setRows] = useState(10); // rows per page
  const handleDelete = async (topicId, imageUrl) => {
    try {
      const payload = {
        topicId: topicId,
      };
      const response = await deleteEssentialInnovation(
        selectedConferenceID,
        payload
      );
      if (response.status !== 200) {
        throw new Error(
          response.data.detail[0].msg || "Failed to delete topic"
        );
      }
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: response.data.detail[0].msg || "Topic has been deleted.",
        life: 3000,
      });
      try {
        await deleteMedia("image", imageUrl);
      } catch {
        console.error("Failed to Delete");
      }
      fetchConfernceData();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Failed to delete. Please try again.",
        life: 3000,
      });
    }
  };
  const confirmDelete = (topicId, imageUrl) => {
    const accept = () => {
      handleDelete(topicId, imageUrl);
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
  const handleSidebar = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Essential Innovation",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Essential Innovation",
        content: (
          <Edit
            data={data}
            selectedConferenceID={selectedConferenceID}
            toast={toast}
            setIsVisible={setIsVisible}
            fetchData={fetchConfernceData}
          />
        ),
      },
      add: {
        header: "Add Essential Innovation",
        content: (
          <Add
            selectedConferenceID={selectedConferenceID}
            toast={toast}
            setIsVisible={setIsVisible}
            fetchData={fetchConfernceData}
          />
        ),
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
      {essentialInnovation.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>No Essential Innovation found</h5>
          <p>Try adding a new topic using the + button.</p>
        </div>
      ) : (
        <>
          <table className="tabel w-100  table-striped-columns">
            <thead>
              <tr>
                <td className="p-2 table-heading">Image</td>
                <td className="p-2 table-heading">Topic Name</td>
                <td className="p-2 table-heading">Content</td>
                <td className="p-2 table-heading">Action</td>
              </tr>
            </thead>
            <tbody>
              {essentialInnovation
                .slice(first, first + rows)
                .map((element, i) => (
                  <tr key={i}>
                    <td className="p-3 table-data">
                      <Image
                        src={element.imageUrl}
                        height={80}
                        width={80}
                        alt="TopicImage"
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                      />{" "}
                    </td>
                    <td className="p-3 table-data">{element.topic}</td>
                    <td
                      className="p-3  table-data text-truncate"
                      style={{ maxWidth: "200px" }}
                    >
                      {element.content}
                    </td>
                    <td className="p-3 table-data ">
                      <div className="d-flex gap-1  justify-content-center flex-nowrap">
                        <button
                          name="edit"
                          className="btn btn-outline-secondary rounded"
                          onClick={(e) =>
                            handleSidebar(e.currentTarget.name, element)
                          }
                        >
                          <i className="bx bx-edit-alt"></i>
                        </button>
                        <button
                          className="btn btn-outline-secondary rounded"
                          onClick={() =>
                            confirmDelete(element.topicId, element.imageUrl)
                          }
                        >
                          <i className="bx bx-trash-alt"></i>
                        </button>
                        <button
                          name="view"
                          className="btn btn-outline-warning rounded"
                          onClick={(e) =>
                            handleSidebar(e.currentTarget.name, element)
                          }
                        >
                          <i className="bx bx-chevron-right"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Paginator
            first={first}
            rows={rows} // set rows using useState, e.g., 10
            totalRecords={essentialInnovation.length}
            onPageChange={(e) => {
              setFirst(e.first);
            }}
            className="mt-4"
          />
        </>
      )}
      <button
        name="add"
        className="btn btn-lg text-white rounded-circle  btn-warning position-absolute"
        style={{ bottom: "50px", right: "50px", zIndex: 1000 }}
        onClick={(e) => handleSidebar(e.target.name)}
      >
        +
      </button>
    </div>
  );
}

function Edit({ data, selectedConferenceID, setIsVisible, toast, fetchData }) {
  const [upload, setUpload] = useState({ file: null, imageUrl: data.imageUrl });
  const [buttonLoading, setButtonLoading] = useState(false);
  const handleFileChange = (file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    setUpload({ file, imageUrl: preview });
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      topic: data.topic || "",
      content: data.content || "",
    },
    validationSchema: Yup.object({
      topic: Yup.string().required("Topic is required"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      try {
        let imageUrl = upload.imageUrl;

        if (upload.file) {
          const res = await uploadImage(upload.file);
          if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
            throw new Error("Failed to upload image");
          }
          imageUrl = res.data.detail.message[0].url;
        }
        setButtonLoading(true);

        const payload = {
          contentType: "Conference",
          ...values,
          imageUrl: imageUrl,
        };

        const response = await patchEssentialInnovation(
          selectedConferenceID,
          payload,
          data.topicId
        );

        if (response.status === 200) {
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: response.data.detail[0].msg || "Submitted successfully",
          });
          if (
            upload.file &&
            data.imageUrl &&
            !data.imageUrl.startsWith("blob:")
          ) {
            try {
              await deleteMedia("image", data.imageUrl);
            } catch {
              throw new Error("Failed to Delete");
            }
          }
          setIsVisible(false);
          fetchData();
        } else {
          throw new Error(response.data.detail[0].msg || "Submission failed");
        }
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.message || "Something went wrong!",
        });
      } finally {
        setButtonLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
      <FileUpload
        title="Upload Image*"
        showBorder={true}
        imageUrl={upload.imageUrl}
        dimensionNote="Recommended dimensions: Width 250px × Height 170px"
        onFileChange={handleFileChange}
      />

      <div className="mb-2">
        <label className="form-label">Topic*</label>
        <input
          type="text"
          name="topic"
          className={`form-control ${
            formik.touched.topic && formik.errors.topic ? "is-invalid" : ""
          }`}
          placeholder="Enter Topic"
          value={formik.values.topic}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.topic && formik.errors.topic && (
          <div className="text-danger">{formik.errors.topic}</div>
        )}
      </div>

      <div className="mb-2">
        <RichTextEditor
          labelName="Content*"
          height="120px"
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
          className="btn px-5 bg-white border"
          onClick={() => setIsVisible(false)}
          type="button"
        >
          Close
        </button>
        <Button
          label="Update"
          type="submit"
          className="btn px-5 btn-warning text-white"
          loading={buttonLoading}
          style={{ outline: "none", boxShadow: "none" }}
        />
      </div>
    </form>
  );
}
function Add({ selectedConferenceID, setIsVisible, toast, fetchData }) {
  const [upload, setUpload] = useState({ file: null });
  const [imageError, setImageError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleFileChange = (file) => {
    setUpload({ file });
    setImageError(null);
  };

  const formik = useFormik({
    initialValues: {
      topic: "",
      content: "",
    },
    validationSchema: Yup.object({
      topic: Yup.string().required("Topic is required"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      if (!upload.file) {
        setImageError("Image is required");
        return;
      }

      try {
        setButtonLoading(true);

        const res = await uploadImage(upload.file);
        if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
          throw new Error("Image upload failed");
        }

        const imageUrl = res.data.detail.message[0].url;

        const payload = {
          contentType: "Conference",
          ...values,
          imageUrl: imageUrl,
        };

        // Replace this with your actual API call
        const response = await patchEssentialInnovation(
          selectedConferenceID,
          payload
        );

        if (response.status === 200) {
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: response.data.detail[0].msg || "Submitted successfully",
          });
          setIsVisible(false);
          fetchData();
        } else {
          throw new Error(response.data.detail[0].msg || "Submission failed");
        }
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.message || "Something went wrong!",
        });
      } finally {
        setButtonLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
      <FileUpload
        title="Upload Image*"
        showBorder={true}
        onFileChange={handleFileChange}
        dimensionNote="Recommended dimensions: Width 250px × Height 170px"
      />
      {imageError && <div className="text-danger">{imageError}</div>}

      <div className="mb-2">
        <label className="form-label">Topic*</label>
        <input
          type="text"
          name="topic"
          className={`form-control ${
            formik.touched.topic && formik.errors.topic ? "is-invalid" : ""
          }`}
          placeholder="Enter Topic"
          value={formik.values.topic}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.topic && formik.errors.topic && (
          <div className="text-danger">{formik.errors.topic}</div>
        )}
      </div>

      <div className="mb-2">
        <RichTextEditor
          labelName="Content*"
          height="120px"
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
          className="btn px-5 bg-white border"
          onClick={() => setIsVisible(false)}
          type="button"
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
      <label className="form-label fw-bold">Image</label>
      <Image
        src={data.imageUrl}
        width={120}
        height={120}
        alt="image"
        style={{ objectFit: "cover", borderRadius: "8px" }}
      />
      <div>
        <label className="form-label fw-bold mb-2">Topic</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.topic}</p>
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

function Delete({ data = null }) {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Essential Innovation</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
