"use client";
import React, { useState, useRef, useEffect } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../ConferencePageAdmin/LandingPage/RichTextEditor";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
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
  patchPastConferenceTestimonial,
  deletePastConfernceTestiMonial,
} from "@/service/AdminConfernecePages/confernce";
import { Button } from "primereact/button";

export default function TestimonialAdmin({
  selectedConferenceID,
  testimonialData,
  fetchConfernceData,
  toast,
}) {
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });
  const [first, setFirst] = useState(0); // starting index
  const [rows, setRows] = useState(10); // rows per page

  const handleDelete = async (testimonialId) => {
    try {
      const response = await deletePastConfernceTestiMonial(selectedConferenceID, {
        testimonialId: testimonialId,
      });
      if (response.status !== 200) {
        throw new Error(
          response.data.detail[0].msg || "Failed to delete testimonial"
        );
      }
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "TestiMonial has been deleted.",
        life: 3000,
      });
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
  const handleStatusChange = async (newStatus, id) => {
    try {
      const response = await updateTestiMonialStatus(selectedConferenceID, id, {
        status: newStatus,
      });

      if (response.status === 200) {
        // Update local state
        fetchConfernceData();
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
  const confirmDelete = (testimonialId) => {
    const accept = () => {
      handleDelete(testimonialId);
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
        content: <View data={data} toast={toast} />,
      },
      edit: {
        header: "Edit Testimonial",
        content: (
          <Edit
            data={data}
            selectedConferenceID={selectedConferenceID}
            toast={toast}
            fetchData={fetchConfernceData}
            setIsVisible={setIsVisible}
          />
        ),
      },
      add: {
        header: "Add Testimonial",
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
          <div className="d-flex flex-column justify-content-between h-100">
            {/* Content Area */}

            {sidebarState.content}
          </div>
        </>
      </Sidebar>
      <ConfirmDialog draggable={false} />
      {testimonialData.length === 0 ? (
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
                <td className="p-2 table-heading">Affiliation with Country</td>
                <td className="p-2 table-heading">Published On</td>
                <td className="p-2 table-heading">Action</td>
              </tr>
            </thead>
            <tbody>
              {testimonialData.slice(first, first + rows).map((element, i) => (
                <tr key={i}>
                  <td className="p-3 table-data">
                    <Image
                      src={element.imageUrl || "/icons/DefaultPreviewImage.png"}
                      height={90}
                      width={110}
                      alt="Testimonial Image"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </td>
                  <td className="p-3 table-data">{element.name}</td>
                  <td className="p-3 table-data">{element.country}</td>
                  <td className="p-3 table-data">{element.publishedOn}</td>
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
                        onClick={() => confirmDelete(element.testimonialId)}
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
            first={first}
            rows={rows} // set rows using useState, e.g., 10
            totalRecords={testimonialData.length}
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
  const [upload, setUpload] = useState({ file: null, imageUrl: data.imageUrl || "" });
  const [imageError, setImageError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

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
        country: values.country,
        publishedOn: values.publishedOn,
        content: values.content,
        imageUrl,
      };

      const response = await patchPastConferenceTestimonial(
        selectedConferenceID,
        payload,
        data.testimonialId
      );

      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Updated",
          detail:
            response.data.detail[0].msg || "Testimonial updated successfully",
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
      country: data.country || "",
      publishedOn: data.publishedOn || "",
      content: data.content || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      country: Yup.string().required("Affiliation with Country is required"),
      content: Yup.string().required("Content is required"),
      publishedOn: Yup.string().required("Date is required"),
    }),
    onSubmit: submitTestimonial,
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
          title={"Logo Image Upload"}
          showBorder={true}
          onFileChange={handleFileChange}
          imageUrl={upload.imageUrl}
          dimensionNote="Recommended dimensions: Width 100px × Height 100px"
        />
        {imageError && <div className="text-danger mt-2">{imageError}</div>}

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
          <label htmlFor="country" className="form-label">
            Affiliation with Country*
          </label>
          <input
            type="text"
            name="country"
            className={`form-control ${
              formik.touched.country && formik.errors.country
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter Affiliation with Country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.country && formik.errors.country && (
            <div className="text-danger">{formik.errors.country}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="publishedOn" className="form-label">
            Published On*
          </label>
          <input
            type="date"
            name="publishedOn"
            className={`form-control ${
              formik.touched.publishedOn && formik.errors.publishedOn
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter Affiliation with publishedOn"
            value={formik.values.publishedOn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.publishedOn && formik.errors.publishedOn && (
            <div className="text-danger">{formik.errors.publishedOn}</div>
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

function Add({ selectedConferenceID, setIsVisible, toast, fetchData }) {

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
        country: data.country,
        publishedOn: data.publishedOn,
        content: data.content,
        imageUrl,
      };

      const response = await patchPastConferenceTestimonial(selectedConferenceID, payLoad);

      if (response.status === 200) {
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
      country: "",
      publishedOn: "",
      content: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      country: Yup.string().required("Affiliation with Country is required"),
      content: Yup.string().required("Content is required"),
      publishedOn: Yup.string().required("Date is required"),
    }),
    
      onSubmit: (values) => {
      if (!upload.file) {
        setImageError("Image is required");
        return;
      }

      setImageError(null); 

      const finalData = {
        ...values,
        image: upload.file,

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
          title={"Logo Image Upload"}
          showBorder={true}
          onFileChange={handleFileChange}
          imageUrl={upload.imageUrl}
          dimensionNote="Recommended dimensions: Width 100px × Height 100px"
        />
        {imageError && <div className="text-danger mt-2">{imageError}</div>}

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
          <label htmlFor="country" className="form-label">
            Affiliation with Country*
          </label>
          <input
            type="text"
            name="country"
            className={`form-control ${
              formik.touched.country && formik.errors.country
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter Affiliation with Country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.country && formik.errors.country && (
            <div className="text-danger">{formik.errors.country}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="publishedOn" className="form-label">
            Published On*
          </label>
          <input
            type="date"
            name="publishedOn"
            className={`form-control ${
              formik.touched.publishedOn && formik.errors.publishedOn
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter Affiliation with publishedOn"
            value={formik.values.publishedOn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.publishedOn && formik.errors.publishedOn && (
            <div className="text-danger">{formik.errors.publishedOn}</div>
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
function View({ data, toast }) {
  return (
    <div className="d-flex gap-4 flex-column">
      {data && (
        <>
          <label className="form-label">Image</label>

          <Image
            src={data.imageUrl}
            width={120}
            height={120}
            alt="Testimonial Image"
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
          <div>
            <label className="form-label  mb-2">Name</label>
            <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
              {data.name}
            </p>
          </div>
          <div>
            <label className="form-label  mb-2">Affiliation with Country</label>
            <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
              {data.country}
            </p>
          </div>
          <div>
            <label className="form-label  mb-2">Published On</label>
            <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
              {data.publishedOn}
            </p>
          </div>
          <div>
            <label className="form-label mb-2">Content</label>
            <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
              {data.content}
            </p>
          </div>
        </>
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
