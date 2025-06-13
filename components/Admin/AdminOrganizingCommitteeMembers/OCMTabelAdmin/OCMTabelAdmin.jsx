"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputSwitch } from "primereact/inputswitch";
import { Paginator } from "primereact/paginator";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import RichTextEditor from "../../AdminConferences/AdminConferenceView/ConferencePageAdmin/LandingPage/RichTextEditor";
import {
  getOCMTableResponse,
  saveOCM,
  updateOCM,
  deleteOCM,
  updateOCMStatus,
  getOCMPageResponse,
} from "@/service/ocmService";
import { uploadImage, deleteMedia } from "@/service/mediaManagemnt";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getallConferencesNames } from "@/service/adminConference";

export default function OCMTabelAdmin({ visibleDetails, setVisibleDetails }) {
  const toast = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });
  const [ocmData, setOcmData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [conferencesData, setConferencesData] = useState([]);

  const fetchData = async (page = 1, limit = rowsPerPage) => {
    setLoading(true);
    try {
      const res = await getOCMTableResponse(page, limit);
      if (res.status === 200) {
        setOcmData(res.data?.detail.data || []);
        setTotalRecords(res.data?.detail.total || 0);
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to load OCMs.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  const fetchAllConferencesNamesData = async () => {
    try {
      const res = await getallConferencesNames();
      if (res.status === 200) {
        setConferencesData(res.data?.detail.names || []);
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to load Conferences.",
        life: 3000,
      });
    }
  };
  useEffect(() => {
    fetchAllConferencesNamesData();

    fetchData();
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleStatusChange = async (newStatus, id) => {
    try {
      const response = await updateOCMStatus(id, newStatus);
      if (response.status === 200) {
        const updatedData = ocmData.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        );
        setOcmData(updatedData);
        toast.current?.show({
          severity: "success",
          summary: "Updated",
          detail: response.data.detail[0].msg || "Status updated successfully",
        });
      }
    } catch (err) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update status",
      });
    }
  };

  const handleDelete = async (id, imageUrl) => {
    try {
      await deleteOCM(id);
      toast.current?.show({
        severity: "success",
        summary: "Deleted",
        detail: "OCM deleted successfully.",
      });
      try {
        await deleteMedia("image", imageUrl);
      } catch {
        console.error("Failed to Delete");
      }
      fetchData(currentPage);
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Failed to delete.",
      });
    }
  };

  const confirmDelete = (id, imageUrl) => {
    confirmDialog({
      message: <Delete />,
      acceptLabel: "OK",
      rejectLabel: "Cancel",
      acceptClassName: "btn px-5 btn-warning text-white shadow-none",
      rejectClassName: "btn px-5 bg-white border me-3 shadow-none",
      defaultFocus: "accept",
      accept: () => handleDelete(id, imageUrl),
      reject: () => {},
      className: "custom-confirm-dialog",
    });
  };

  const handleModel = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View OCM",
        content: <View tableData={data} />,
      },
      edit: {
        header: "Edit OCM",
        content: (
          <Edit
            tableData={data}
            toast={toast}
            fetchData={fetchData}
            setIsVisible={setIsVisible}
            conferencesData={conferencesData}
          />
        ),
      },
      add: {
        header: "Add OCM",
        content: (
          <Add
            toast={toast}
            fetchData={fetchData}
            setIsVisible={setIsVisible}
            conferencesData={conferencesData}
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
      <Dialog
        header={sidebarState.header}
        visible={isVisible}
        draggable={false}
        onHide={() => setIsVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {sidebarState.content}
      </Dialog>
      <ConfirmDialog draggable={false} />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="5"
          />
        </div>
      ) : ocmData.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>No OCMs found</h5>
          <p>Try adding a new OCM using the + button.</p>
        </div>
      ) : (
        <>
          <table className="tabel w-100 table-striped-columns">
            <thead>
              <tr>
                <td className="p-2 table-heading">OCM Image</td>
                <td className="p-2 table-heading">Name</td>
                <td className="p-2 table-heading">Company</td>
                <td className="p-2 table-heading">Author</td>
                <td className="p-2 table-heading">Status</td>
                <td className="p-2 table-heading">Action</td>
              </tr>
            </thead>
            <tbody>
              {ocmData.map((element, i) => (
                <tr key={i}>
                  <td className="p-3 table-data">
                    <Image
                      src={element.imageUrl || "/icons/DefaultPreviewImage.png"}
                      height={90}
                      width={110}
                      alt="OCM Image"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </td>
                  <td className="p-3 table-data">{element.name}</td>
                  <td className="p-3 table-data">{element.companyDetails}</td>
                  <td className="p-3 table-data">{element.author}</td>
                  <td className="p-3 table-data">
                    <InputSwitch
                      checked={element.status}
                      onChange={(e) => handleStatusChange(e.value, element._id)}
                      style={{ scale: "0.7" }}
                    />
                  </td>
                  <td className="p-3 table-data">
                    <div className="d-flex gap-1 justify-content-center flex-nowrap">
                      <button
                        name="edit"
                        className="btn btn-outline-secondary rounded"
                        onClick={(e) =>
                          handleModel(e.currentTarget.name, element)
                        }
                      >
                        <i className="bx bx-edit-alt"></i>
                      </button>
                      <button
                        className="btn btn-outline-secondary rounded"
                        onClick={() =>
                          confirmDelete(element._id, element.imageUrl)
                        }
                      >
                        <i className="bx bx-trash-alt"></i>
                      </button>
                      <button
                        name="view"
                        className="btn btn-outline-warning rounded"
                        onClick={(e) =>
                          handleModel(e.currentTarget.name, element)
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
        className="btn btn-lg text-white rounded-circle btn-warning position-absolute"
        style={{ bottom: "50px", right: "50px", zIndex: 1000 }}
        onClick={(e) => handleModel(e.target.name)}
      >
        +
      </button>
    </div>
  );
}

function Edit({ tableData, toast, fetchData, setIsVisible, conferencesData }) {
  const [data, setData] = useState({});
  const [upload, setUpload] = useState({ file: null, imageUrl: "" });
  const [imageError, setImageError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getOCMPageResponse(tableData._id);
        if (res.status === 200) {
          setData(res.data?.detail || []);
          setUpload({ file: null, imageUrl: res.data?.detail.imageUrl });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Failed to Load  OCM",
            detail: res.data?.detail?.[0]?.msg || "Please try again.",
            life: 3000,
          });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Failed to Load OCM ",
          detail: error.message || "Please try again.",
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tableData._id, toast]);

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
        author: data.author,
        bioData: data.bio,
        companyDetails: data.companyDetails,
        imageUrl: imageUrl,
      };

      const response = await updateOCM(tableData._id, payLoad);

      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "updated",
          detail: response.data.detail[0].msg || "Speaker Updated successfully",
        });
        if (
          upload.file && // user chose a new file
          tableData.imageUrl &&
          typeof tableData.imageUrl === "string" &&
          !tableData.imageUrl.startsWith("blob:") &&
          tableData.imageUrl !== imageUrl // ensure it's not the same
        ) {
          try {
            await deleteMedia("image", tableData.imageUrl);
          } catch (err) {
            console.warn("Failed to delete old image", err);
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
      name: data.name || "",
      author: data.author || "",
      bio: data.bioData || "",
      companyDetails: data.companyDetails || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      author: Yup.string().required("Author is required"),
      bio: Yup.string().required("Bio is required"),
      companyDetails: Yup.string().required("Company Details are required"),
    }),
    onSubmit: (values) => {
      if (!upload.file) {
        setImageError("Speaker image is required");
        return;
      }
      setImageError(null);
      // console.log({ ...values, image: upload.file });
      const finalData = {
        ...values,
        image: upload.file,
      };
      submitSpeaker(finalData);
    },
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
      className="d-flex gap-3 container flex-column h-100"
    >
      <div className="mb-3">
        <label className="form-label">Name*</label>
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
        <label className="form-label">Author*</label>
        {conferencesData.length === 0 ? (
          <div className="alert alert-warning p-2 mt-2" role="alert">
            No Conferences found. Please add Conferences first.
          </div>
        ) : (
          <select
            name="author"
            className={`form-select ${
              formik.touched.author && formik.errors.author ? "is-invalid" : ""
            }`}
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Author</option>

            {conferencesData.map((user, i) => (
              <option key={i} value={user}>
                {user}
              </option>
            ))}
          </select>
        )}
        {formik.touched.author && formik.errors.author && (
          <div className="text-danger">{formik.errors.author}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Company Details*</label>
        <input
          type="text"
          name="companyDetails"
          className={`form-control ${
            formik.touched.companyDetails && formik.errors.companyDetails
              ? "is-invalid"
              : ""
          }`}
          placeholder="Enter Company Details"
          value={formik.values.companyDetails}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.companyDetails && formik.errors.companyDetails && (
          <div className="text-danger">{formik.errors.companyDetails}</div>
        )}
      </div>

      <FileUpload
        title="Speaker Image Upload*"
        showBorder={true}
        onFileChange={handleFileChange}
        imageUrl={upload.imageUrl}
        dimensionNote="Recommended dimensions: Width 250px × Height 270px"
      />
      {imageError && <div className="text-danger mt-1">{imageError}</div>}

      <div className="mb-3">
        <RichTextEditor
          labelName="Bio-Data*"
          height="120px"
          initialValue={formik.values.bio}
          onChange={(content) => formik.setFieldValue("bio", content)}
        />
        {formik.touched.bio && formik.errors.bio && (
          <div className="text-danger">{formik.errors.bio}</div>
        )}
      </div>

      <Button
        label="Update OCM"
        type="submit"
        className="btn btn-warning text-white mt-3 align-self-start"
        loading={buttonLoading}
        style={{ outline: "none", boxShadow: "none" }}
      />
    </form>
  );
}
function Add({ data, toast, fetchData, setIsVisible, conferencesData }) {
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
        name: data.name,
        author: data.author,
        bioData: data.bio,
        companyDetails: data.companyDetails,
        imageUrl: imageUrl,
      };

      const response = await saveOCM(payLoad);

      if (response.status === 201) {
        toast.current?.show({
          severity: "success",
          summary: "Saved",
          detail: response.data.detail[0].msg || "OCM successfully",
        });
        setIsVisible(false);
        fetchData();
      } else {
        setButtonLoading(false);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "OCM creation failed",
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
      author: "",
      bio: "",
      companyDetails: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      author: Yup.string().required("Author is required"),
      bio: Yup.string().required("Bio is required"),
      companyDetails: Yup.string().required("Company Details are required"),
    }),
    onSubmit: (values) => {
      if (!upload.file) {
        setImageError("Speaker image is required");
        return;
      }
      setImageError(null);
      // console.log({ ...values, image: upload.file });
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

  const isFormValid =
    formik.isValid && Object.keys(formik.touched).length > 0 && !!upload.file;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex gap-3 container flex-column h-100"
    >
      <div className="mb-3">
        <label className="form-label">Name*</label>
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
        <label className="form-label">Author*</label>
        {conferencesData.length === 0 ? (
          <div className="alert alert-warning p-2 mt-2" role="alert">
            No Conferences found. Please add Conferences first.
          </div>
        ) : (
          <select
            name="author"
            className={`form-select ${
              formik.touched.author && formik.errors.author ? "is-invalid" : ""
            }`}
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Author</option>

            {conferencesData.map((user, i) => (
              <option key={i} value={user}>
                {user}
              </option>
            ))}
          </select>
        )}
        {formik.touched.author && formik.errors.author && (
          <div className="text-danger">{formik.errors.author}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Company Details*</label>
        <input
          type="text"
          name="companyDetails"
          className={`form-control ${
            formik.touched.companyDetails && formik.errors.companyDetails
              ? "is-invalid"
              : ""
          }`}
          placeholder="Enter Company Details"
          value={formik.values.companyDetails}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.companyDetails && formik.errors.companyDetails && (
          <div className="text-danger">{formik.errors.companyDetails}</div>
        )}
      </div>

      <FileUpload
        title="OCM Image Upload*"
        showBorder={true}
        onFileChange={handleFileChange}
        dimensionNote="Recommended dimensions: Width 250px × Height 270px"
      />
      {imageError && <div className="text-danger mt-1">{imageError}</div>}

      <div className="mb-3">
        <RichTextEditor
          labelName="Bio-Data*"
          height="120px"
          initialValue={formik.values.bio}
          onChange={(content) => formik.setFieldValue("bio", content)}
        />
        {formik.touched.bio && formik.errors.bio && (
          <div className="text-danger">{formik.errors.bio}</div>
        )}
      </div>

      <Button
        label="Save OCM"
        type="submit"
        className="btn btn-warning text-white mt-3 align-self-start"
        loading={buttonLoading}
        style={{ outline: "none", boxShadow: "none" }}
      />
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
        const res = await getOCMPageResponse(tableData._id);
        if (res.status === 200) {
          setData(res.data?.detail || []);
        } else {
          toast.current.show({
            severity: "error",
            summary: "Failed to Load  OCM",
            detail: res.data?.detail?.[0]?.msg || "Please try again.",
            life: 3000,
          });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Failed to Load OCM ",
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
            <div>
              <label className="form-label  mb-2">Name</label>
              <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
                {data.name}
              </p>
            </div>
            <div>
              <label className="form-label  mb-2">Author</label>
              <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
                {data.author}
              </p>
            </div>
            <label className="form-label">OCM Image</label>
            <Image
              src={data.imageUrl}
              width={100}
              height={100}
              alt="Speaker Image"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />

            <div>
              <label className="form-label mb-2">Bio-Data</label>

              <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
                {data.bioData}
              </p>
            </div>
            <div>
              <label className="form-label mb-2">Company</label>
              <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
                {data.companyDetails}
              </p>
            </div>
          </>
        )
      )}
    </div>
  );
}

function Delete({ data = null }) {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete OCM</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
