"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { ProgressSpinner } from "primereact/progressspinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadImage, deleteMedia } from "@/service/mediaManagemnt";
import { Button } from "primereact/button";
import {
  saveLandingPageSpeakers,
  UpdateLandingPageSpeakers,
  deleteLandingPageSpeaker,
} from "@/service/AdminConfernecePages/confernce";
import { Paginator } from "primereact/paginator";

export default function LandingPageSpeakers({
  selectedConferenceID,
  LandingPageSpeakers,
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

  const handleDelete = async (id, imageUrl) => {
    try {
      await deleteLandingPageSpeaker({ speakerId: id }, selectedConferenceID);
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Speaker has been deleted.",
        life: 3000,
      });

      try {
        await deleteMedia("image", imageUrl);
      } catch {
        throw new Error("Failed to Delete");
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
  const confirmDelete = (id, imageUrl) => {
    const accept = () => {
      handleDelete(id, imageUrl);
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
        header: "View Speaker",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Speaker",
        content: (
          <Edit
            tableData={data}
            toast={toast}
            setIsVisible={setIsVisible}
            fetchData={fetchConfernceData}
            selectedConferenceID={selectedConferenceID}
          />
        ),
      },
      add: {
        header: "Add Speaker",
        content: (
          <Add
            toast={toast}
            setIsVisible={setIsVisible}
            fetchData={fetchConfernceData}
            selectedConferenceID={selectedConferenceID}
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
    <div className="table-responsive ">
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
      {LandingPageSpeakers.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>No speakers found</h5>
          <p>Try adding a new speaker using the + button.</p>
        </div>
      ) : (
        <div>
          <table className="tabel w-100  table-striped-columns">
            <thead>
              <tr>
                <td className="p-2 table-heading">Speaker Image</td>
                <td className="p-2 table-heading">Name</td>
                <td className="p-2 table-heading">Country</td>
                <td className="p-2 table-heading">Action</td>
              </tr>
            </thead>

            <tbody>
              {LandingPageSpeakers.slice(first, first + rows).map(
                (element, i) => (
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
                    <td className="p-3 table-data">{element.name}</td>
                    <td className="p-3  table-data ">{element.country}</td>
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
                            confirmDelete(element.speakerId, element.imageUrl)
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
                )
              )}
            </tbody>
          </table>
          <Paginator
            first={first}
            rows={rows} // set rows using useState, e.g., 10
            totalRecords={LandingPageSpeakers.length}
            onPageChange={(e) => {
              setFirst(e.first);
            }}
            className="mt-2"
          />
        </div>
      )}

      <button
        name="add"
        className="btn btn-lg text-white rounded-circle btn-warning position-absolute"
        style={{ bottom: "50px", right: "50px", zIndex: 1000 }}
        onClick={(e) => handleSidebar(e.target.name)}
      >
        +
      </button>
    </div>
  );
}

function Edit({
  tableData,
  toast,
  fetchData,
  setIsVisible,
  selectedConferenceID,
}) {
  const [upload, setUpload] = useState({
    file: null,
    imageUrl: tableData.imageUrl || "",
  });
  const [imageError, setImageError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleFileChange = (file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    setUpload({ file, imageUrl: preview });
    setImageError(null);
  };

  const submitSpeaker = async (data) => {
    setButtonLoading(true);
    try {
      // STEP 1: Check if image is present
      let imageUrl = upload.imageUrl;

      if (upload.file) {
        const res = await uploadImage(upload.file);
        if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
          throw new Error("Failed to upload image");
        }
        imageUrl = res.data.detail.message[0].url;
      }

      // STEP 4: Prepare payload and call API
      const payLoad = {
        name: data.name,
        country: data.country,
        imageUrl: imageUrl,
      };

      const response = await UpdateLandingPageSpeakers(
        payLoad,
        selectedConferenceID,
        tableData.speakerId
      );

      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "updated",
          detail: response.data.detail[0].msg || "Speaker Updated successfully",
        });
      if ( upload.file &&tableData.imageUrl && !tableData.imageUrl.startsWith("blob:")) {
          try {
            await deleteMedia("image", tableData.imageUrl);
          } catch {
            throw new Error("Failed to Delete");
          }
        }
        setIsVisible(false);
        fetchData();
      } else {
        setButtonLoading(false);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Speaker Update failed",
        });
      }
    } catch (err) {
      setButtonLoading(false);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: err.message || "Something went wrong!",
      });
    } finally {
      setButtonLoading(false);
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: tableData.name || "",
      country: tableData.country || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: (values) => {
      setImageError(null);
      const finalData = {
        ...values,
        image: upload.file,
      };
      submitSpeaker(finalData);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex gap-3 container flex-column h-100"
    >
      <FileUpload
        title={"Speaker Image Upload*"}
        showBorder={true}
        imageUrl={upload.imageUrl}
        onFileChange={handleFileChange}
        dimensionNote="Recommended dimensions: Width 250px × Height 270px"
      />
      {imageError && <div className="text-danger mt-1">{imageError}</div>}

      <div className=" mb-3">
        <label className="form-label">Name*</label>
        <input
          type="text"
          name="name"
          className={`form-control ${
            formik.touched.name && formik.errors.name ? "is-invalid" : ""
          }`}
          placeholder="Enter Speaker Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-danger">{formik.errors.name}</div>
        )}
      </div>
      <div className=" mb-3">
        <label className="form-label">Country*</label>

        <input
          type="text"
          name="country"
          className={`form-control ${
            formik.touched.country && formik.errors.country ? "is-invalid" : ""
          }`}
          placeholder="Enter Country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.country && formik.errors.country && (
          <div className="text-danger">{formik.errors.country}</div>
        )}
      </div>

      <div
        className="bg-secondary position-absolute z-2 bg-opacity-10 p-2 d-flex justify-content-center align-items-center gap-3 w-100"
        style={{
          bottom: 0,
          left: 0,
          height: "80px",
        }}
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
function Add({ toast, fetchData, setIsVisible, selectedConferenceID }) {
  const [upload, setUpload] = useState({ file: null });
  const [imageError, setImageError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const submitSpeaker = async (data) => {
    setButtonLoading(true);
    try {
      // STEP 1: Check if image is present
      if (!data.image) {
        throw new Error("Image is required");
      }

      // STEP 2: Upload image
      const res = await uploadImage(data.image);

      // STEP 3: Check if upload was successful and get image URL
      if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
        throw new Error("Failed to upload image");
      }

      const imageUrl = res.data.detail.message[0].url;

      // STEP 4: Prepare payload and call API
      const payLoad = {
        imageUrl: imageUrl,
        name: data.name,
        country: data.country,
      };

      const response = await saveLandingPageSpeakers(
        payLoad,
        selectedConferenceID
      );

      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Saved",
          detail: response.data.detail[0].msg || "Speaker created successfully",
        });
        setIsVisible(false);
        fetchData();
      } else {
        setButtonLoading(false);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: response.data.detail[0].msg || "Speaker creation failed",
        });
      }
    } catch (err) {
      setButtonLoading(false);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: err.message || "Something went wrong!",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: (values) => {
      if (!upload.file) {
        setImageError("Speaker image is required");
        return;
      }
      setImageError(null);
      const finalData = {
        ...values,
        image: upload.file,
      };
      submitSpeaker(finalData);
    },
  });

  const handleFileChange = (file) => {
    setUpload({ file });
    setImageError(null);
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex gap-3 container flex-column h-100"
    >
      <FileUpload
        title={"Speaker Image Upload*"}
        showBorder={true}
        onFileChange={handleFileChange}
        dimensionNote="Recommended dimensions: Width 250px × Height 270px"
      />
      {imageError && <div className="text-danger mt-1">{imageError}</div>}

      <div className=" mb-3">
        <label className="form-label">Name*</label>
        <input
          type="text"
          name="name"
          className={`form-control ${
            formik.touched.name && formik.errors.name ? "is-invalid" : ""
          }`}
          placeholder="Enter Speaker Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-danger">{formik.errors.name}</div>
        )}
      </div>
      <div className=" mb-3">
        <label className="form-label">Country*</label>

        <input
          type="text"
          name="country"
          className={`form-control ${
            formik.touched.country && formik.errors.country ? "is-invalid" : ""
          }`}
          placeholder="Enter Country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.country && formik.errors.country && (
          <div className="text-danger">{formik.errors.country}</div>
        )}
      </div>

      <div
        className="bg-secondary position-absolute z-2 bg-opacity-10 p-2 d-flex justify-content-center align-items-center gap-3 w-100"
        style={{
          bottom: 0,
          left: 0,
          height: "80px",
        }}
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
      <label className="form-label fw-bold">Speaker Image</label>
      <Image
        src={data.imageUrl}
        width={120}
        height={120}
        alt="DeleteIcon"
        style={{ objectFit: "cover", borderRadius: "8px" }}
      />
      <div>
        <label className="form-label fw-bold mb-2">Name</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.name}</p>
      </div>
      <div>
        <label className="form-label fw-bold mb-2">Country</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.country}
        </p>
      </div>
    </div>
  );
}

function Delete({ data = null }) {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Speaker</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
