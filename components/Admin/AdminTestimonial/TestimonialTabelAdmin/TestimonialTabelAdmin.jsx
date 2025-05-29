"use client";
import React, { useState, useRef, useEffect } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../AdminConferences/AdminConferenceView/ConferencePageAdmin/LandingPage/RichTextEditor";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { Paginator } from "primereact/paginator";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
import { Sidebar } from "primereact/sidebar";
import { Rating } from "primereact/rating";
import { useFormik } from "formik";
import { uploadImage } from "@/service/mediaManagemnt";
import * as Yup from "yup";
import {
  saveTestiMonial,
  getTestiMonialTableResponse,
  getTestiMonialPageResponse,
  deleteTestiMonial,
  updateTestiMonialStatus,updateTestimonial
} from "@/service/testimonialService";
import { Button } from "primereact/button";

export default function TestimonialTabelAdmin() {
  const toast = useRef(null);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });
  const [loading, setLoading] = useState(true);
  const [testimonialData, setTestimonialData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const fetchData = async (page = 1, limit = rowsPerPage) => {
    setLoading(true);
    try {
      const res = await getTestiMonialTableResponse(page, limit);
      if (res.status === 200) {
        setTestimonialData(res.data?.detail.data || []);
        setTotalRecords(res.data?.detail.total || 0);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Failed to Load  TestiMonial Table",
          detail: res.data?.detail?.[0]?.msg || "Please try again.",
          life: 3000,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Failed to Load TestiMonial Table",
        detail: error.message || "Please try again.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const [statusChecked, setStatusChecked] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteTestiMonial(id);
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "TestiMonial has been deleted.",
        life: 3000,
      });
      fetchData(currentPage);
      // Estimate how many items will remain after deletion
      const remainingItems = testimonialData.length - 1;

      // If current page has no items left AND it's not the first page, go to previous page
      if (remainingItems === 0 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchData(currentPage); // refresh current page
      } // Refresh after deletion
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Failed to delete. Please try again.",
        life: 3000,
      });
    }
  };
  const handleStatusChange = async (newStatus, id) => {
    try {
      const response = await updateTestiMonialStatus(id, newStatus);

      if (response.status === 200) {
        // Update local state
        const updatedTable = testimonialData.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        );
        setTestimonialData(updatedTable); // see note below

        toast.current?.show({
          severity: "success",
          summary: "Updated",
          detail: response.data.detail[0].msg || "Status updated successfully",
        });
      } else {
        console.log(response.response.data.detail[0].msg);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail:
            response.response.data.detail[0].msg || "Status update failed",
        });
      }
    } catch (err) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Status update failed",
      });
    }
  };
  const confirmDelete = (id) => {
    const accept = () => {
      handleDelete(id);
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
        header: "View Testimonial",
        content: <View tableData={data} toast={toast} />,
      },
      edit: {
        header: "Edit Testimonial",
        content: (
          <Edit tabledata={data} toast={toast}  fetchData={fetchData} setIsVisible={setIsVisible} />
        ),
      },
      add: {
        header: "Add Testimonial",
        content: (
          <Add
            toast={toast}
            setIsVisible={setIsVisible}
            fetchData={fetchData}
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
      <Toast ref={toast} />

      <Sidebar
        visible={isVisible}
        header={<h5 className="text-black">{sidebarState.header}</h5>}
        position="right"
        dismissable={false}
        onHide={() => setIsVisible(false)}
        className="custom-sidebar"
      >
        <>
          <div className="d-flex flex-column justify-content-between h-100">
            {/* Content Area */}

            {sidebarState.content}
          </div>
        </>
      </Sidebar>
      <ConfirmDialog draggable={false} />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="5"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : testimonialData.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>No testimonials found</h5>
          <p>Try adding a new testimonial using the + button.</p>
        </div>
      ) : (
        <>
          <table className="tabel w-100  table-striped-columns">
            <thead>
              <tr>
                <td className="p-2 table-heading">Testimonial Image</td>
                <td className="p-2 table-heading">Name</td>
                <td className="p-2 table-heading">Designation</td>
                <td className="p-2 table-heading">Content</td>
                <td className="p-2 table-heading">Status</td>
                <td className="p-2 table-heading">Action</td>
              </tr>
            </thead>
            <tbody>
              {testimonialData.map((element, i) => (
                  <tr key={i}>
                    <td className="p-3 table-data">
                      <Image
                        src={
                          element.imageUrl || "/icons/DefaultPreviewImage.png"
                        }
                        height={90}
                        width={110}
                        alt="Testimonial Image"
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                      />
                    </td>
                    <td className="p-3 table-data">{element.name}</td>
                    <td className="p-3 table-data">{element.designation}</td>
                    <td
                      className="p-3  table-data text-truncate"
                      style={{ maxWidth: "200px" }}
                    >
                      {element.content}
                    </td>
                    <td className="p-3  table-data ">
                      {" "}
                      <InputSwitch
                        checked={element.status}
                        onChange={(e) =>
                          handleStatusChange(e.value, element._id)
                        }
                        style={{ scale: "0.7" }}
                      />
                    </td>
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
                          className="btn btn-outline-secondary rounded"
                          onClick={() => confirmDelete(element._id)}
                        >
                          <i className="bx bx-trash-alt"></i>
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
          <Paginator
            first={(currentPage - 1) * rowsPerPage}
            rows={rowsPerPage}
            totalRecords={totalRecords}
            onPageChange={(e) =>
              setCurrentPage(Math.floor(e.first / e.rows) + 1)
            }
            className="mt-5"
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
function Edit({ tabledata, setIsVisible, toast, fetchData }) {
  const [data, setData] = useState({});
  const [isvideoLinkEnable, setIsvideoLinkEnable] = useState(false);
  const [ratings, setRatings] = useState(null);
  const [upload, setUpload] = useState({ file: null, imageUrl: "" });
  const [imageError, setImageError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonial = async () => {
      setLoading(true);
      try {
        const res = await getTestiMonialPageResponse(tabledata._id);
        if (res.status === 200) {
          const result = res.data?.detail || {};
          setData(result);
          setIsvideoLinkEnable(!!result.videoUrl);
          setRatings(result.ratings || null);
          setUpload({ file: null, imageUrl: result.imageUrl });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Failed to Load Testimonial",
            detail: res.data?.detail?.[0]?.msg || "Please try again.",
            life: 3000,
          });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Failed to Load Testimonial",
          detail: error.message || "Please try again.",
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonial();
  }, [tabledata._id, toast]);

  const handleFileChange = (file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    setUpload({ file, imageUrl: preview });
    setImageError(null);
  };

  const submitTestimonial = async (values) => {
    setButtonLoading(true);
    try {
      let imageUrl = upload.imageUrl;

      if (upload.file) {
        const res = await uploadImage(upload.file);
        if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
          throw new Error("Failed to upload image");
        }
        imageUrl = res.data.detail.message[0].url;
      }

      const payload = {
        name: values.name,
        designation: values.designation,
        content: values.content,
        ratings,
        videoUrl: isvideoLinkEnable ? values.videoUrl : "",
        imageUrl,
      };

      const response = await updateTestimonial(data._id, payload);

      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Updated",
          detail: response.data.detail[0].msg || "Testimonial updated successfully",
        });
        setIsVisible(false);
        fetchData();
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
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
      name: data.name || "",
      designation: data.designation || "",
      videoUrl: data.videoUrl || "",
      content: data.content || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      designation: Yup.string().required("Designation is required"),
      content: Yup.string().required("Content is required"),
      videoUrl: Yup.string().when([], {
        is: () => isvideoLinkEnable,
        then: (schema) =>
          schema
            .required("YouTube link is required")
            .matches(/^https?:\/\/.+/, "Enter a valid URL")
            .url("Enter a valid URL"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: submitTestimonial,
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="5"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="position-relative"
      style={{ height: "100vh" }}
    >
      <div
        className="p-3"
        style={{ overflowY: "auto", height: "calc(100vh - 200px)" }}
      >
        <FileUpload
          title={"Logo Image Upload"}
          showBorder={true}
          onFileChange={handleFileChange}
          imageUrl={upload.imageUrl}
          dimensionNote="Recommended dimensions: Width 300px × Height 300px"
        />
        {imageError && <div className="text-danger mt-2">{imageError}</div>}

        <label htmlFor="ratings" className="form-label d-flex align-items-center">
          Ratings
        </label>
        <Rating value={ratings} onChange={(e) => setRatings(e.value)} />

        <div className="mt-4">
          <label htmlFor="videoLink" className="form-label d-flex align-items-center">
            Video Link (YouTube) &nbsp;
            <InputSwitch
              checked={isvideoLinkEnable}
              onChange={(e) => setIsvideoLinkEnable(e.value)}
              style={{ scale: "0.7" }}
            />
          </label>
          <div className="input-group border rounded p-1">
            <span className="btn rounded-2 text-white me-1" style={{ backgroundColor: "#111880" }}>
              <i className="bx bx-link-alt"></i>
            </span>
            <input
              type="text"
              name="videoUrl"
              className={`form-control border-0 ${
                formik.touched.videoUrl && formik.errors.videoUrl ? "is-invalid" : ""
              }`}
              placeholder="https://www.youtube.com/watch?v=xxxx"
              disabled={!isvideoLinkEnable}
              value={formik.values.videoUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.videoUrl && formik.errors.videoUrl && (
            <div className="text-danger">{formik.errors.videoUrl}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name*</label>
          <input
            type="text"
            name="name"
            className={`form-control ${
              formik.touched.name && formik.errors.name ? "is-invalid" : ""
            }`}
            placeholder="Enter Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-danger">{formik.errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="designation" className="form-label">Designation*</label>
          <input
            type="text"
            name="designation"
            className={`form-control ${
              formik.touched.designation && formik.errors.designation ? "is-invalid" : ""
            }`}
            placeholder="Enter Designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.designation && formik.errors.designation && (
            <div className="text-danger">{formik.errors.designation}</div>
          )}
        </div>

        <div className="mb-3">
          <RichTextEditor
            labelName={"Content*"}
            height="120px"
            initialValue={formik.values.content}
            onChange={(content) => formik.setFieldValue("content", content)}
          />
          {formik.touched.content && formik.errors.content && (
            <div className="text-danger">{formik.errors.content}</div>
          )}
        </div>
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


function Add({ data, setIsVisible, toast, fetchData }) {
  const [isvideoLinkEnable, setIsvideoLinkEnable] = useState(false);
  const [ratings, setRatings] = useState(null);
  const [upload, setUpload] = useState({ file: null });
  const [imageError, setImageError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const submitTestimonial = async (data) => {
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
        name: data.name,
        designation: data.designation,
        content: data.content,
        ratings: data.ratings,
        videoUrl: data.videoUrl,
        imageUrl: imageUrl,
      };

      const response = await saveTestiMonial(payLoad);

      if (response.status === 201) {
        toast.current?.show({
          severity: "success",
          summary: "Saved",
          detail:
            response.data.detail[0].msg || "Testimonial created successfully",
        });
        setIsVisible(false);
        fetchData();
      } else {
        setButtonLoading(false);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Testimonial creation failed",
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

  const handleFileChange = (file) => {
    setUpload({ file });
    setImageError(null); // Clear error on file selection
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      designation: "",
      videoUrl: "",
      content: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      designation: Yup.string().required("Designation is required"),
      content: Yup.string().required("Content is required"),
      videoUrl: Yup.string().when([], {
        is: () => isvideoLinkEnable,
        then: (schema) =>
          schema
            .required("YouTube link is required")
            .matches(
              /^https?:\/\/.+/,
              "Enter a valid URL (must start with http:// or https://)"
            )
            .url("Enter a valid URL"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: (values) => {
      if (!upload.file) {
        setImageError("Image is required");
        return;
      }

      setImageError(null); // Clear any previous image error

      const finalData = {
        ...values,
        ratings,
        image: upload.file,
        videoUrl: isvideoLinkEnable ? values.videoUrl : "	",
      };
      submitTestimonial(finalData);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="position-relative"
      style={{ height: "100vh" }}
    >
      <div
        className="p-3"
        style={{ overflowY: "auto", height: "calc(100vh - 200px)" }}
      >
        <FileUpload
          title={"Image Upload*"}
          showBorder={true}
          onFileChange={handleFileChange}
          imageUrl={upload.file?.preview}
                    dimensionNote="Recommended dimensions: Width 300px × Height 300px"

        />
        {imageError && <div className="text-danger mt-2">{imageError}</div>}

        <label
          htmlFor="ratings"
          className="form-label d-flex align-items-center"
        >
          Ratings
        </label>
        <Rating value={ratings} onChange={(e) => setRatings(e.value)} />

        <div className="mt-4">
          <label
            htmlFor="videoLink"
            className="form-label d-flex align-items-center"
          >
            Video Link (YouTube) &nbsp;
            <InputSwitch
              checked={isvideoLinkEnable}
              onChange={(e) => setIsvideoLinkEnable(e.value)}
              style={{ scale: "0.7" }}
            />
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
              type="text"
              name="videoUrl"
              className={`form-control border-0 ${
                formik.touched.videoUrl && formik.errors.videoUrl
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="https://www.youtube.com/watch?v=xxxx"
              disabled={!isvideoLinkEnable}
              value={formik.values.videoUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.videoUrl && formik.errors.videoUrl && (
            <div className="text-danger">{formik.errors.videoUrl}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name*
          </label>
          <input
            type="text"
            name="name"
            className={`form-control ${
              formik.touched.name && formik.errors.name ? "is-invalid" : ""
            }`}
            placeholder="Enter Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-danger">{formik.errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="designation" className="form-label">
            Designation*
          </label>
          <input
            type="text"
            name="designation"
            className={`form-control ${
              formik.touched.designation && formik.errors.designation
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter Designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.designation && formik.errors.designation && (
            <div className="text-danger">{formik.errors.designation}</div>
          )}
        </div>

        <div className="mb-3">
          <RichTextEditor
            labelName={"Content*"}
            height="120px"
            initialValue={formik.values.content}
            onChange={(content) => formik.setFieldValue("content", content)}
          />
          {formik.touched.content && formik.errors.content && (
            <div className="text-danger">{formik.errors.content}</div>
          )}
        </div>
      </div>

      {/* Fixed Buttons */}
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
function View({ tableData, toast }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getTestiMonialPageResponse(tableData._id);
        if (res.status === 200) {
          setData(res.data?.detail || []);
        } else {
          toast.current.show({
            severity: "error",
            summary: "Failed to Load  TestiMonial",
            detail: res.data?.detail?.[0]?.msg || "Please try again.",
            life: 3000,
          });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Failed to Load TestiMonial ",
          detail: error.message || "Please try again.",
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="d-flex gap-4 flex-column">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="5"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : (
        data && (
          <>
            <label className="form-label">Image</label>

            <Image
              src={data.imageUrl}
              width={120}
              height={120}
              alt="Testimonial Image"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
            <label
              htmlFor="title"
              className="form-label d-flex align-items-center"
            >
              Ratings
            </label>
            <Rating value={data.ratings} disabled cancel={false} />
            <div>
              <label className="form-label  mb-2">Name</label>
              <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
                {data.name}
              </p>
            </div>
            <div>
              <label className="form-label  mb-2">Designation</label>
              <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
                {data.designation}
              </p>
            </div>
            <div>
              <label className="form-label mb-2">Content</label>
              <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
                {data.content}
              </p>
            </div>
          </>
        )
      )}
    </div>
  );
}

function Delete() {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Testimonial</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
