"use client";
import React, { useState, useEffect, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../ConferencePageAdmin/LandingPage/RichTextEditor";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
import { Paginator } from "primereact/paginator";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadImage } from "@/service/mediaManagemnt";
import {patchSpeakers, deleteSpeaker,updateSpeakerStatus} from "@/service/AdminConfernecePages/confernce";
export default function SpeakerTabelAdmin({
  selectedConferenceID,
  speakerData,
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
  const [statusChecked, setStatusChecked] = useState(false);

  const handleStatusChange = async (newStatus, id) => {
    try {
      const response = await updateSpeakerStatus(selectedConferenceID, {speakerId:id,status:newStatus});

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

  const handleDelete = async (id) => {
    try {
  
     const response=await deleteSpeaker(selectedConferenceID,{speakerId:id});
           if(response.status !== 200) {
              throw new Error(response.data.detail[0].msg || "Failed to delete Speaker");
           }
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Speaker has been deleted.",
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

  const confirmDelete = (id) => {
    const accept = () => {
      handleDelete(id);
    };
    const reject = () => {
      console.log("rejectcted");
    };

    confirmDialog({
      message: <Delete />,
      acceptLabel: "OK",
      rejectLabel: "Cancel",
      acceptClassName: "btn px-5 btn-warning text-white shadow-none",
      rejectClassName: "btn px-5 bg-white border me-3 shadow-none",
      defaultFocus: "accept",
      accept,
      reject,
      className: "custom-confirm-dialog",
    });
  };

  const handleModel = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Speaker",
        content: <View data={data} toast={toast} />,
      },
      edit: {
        header: "Edit Speaker",
        content: (
          <Edit
            formData={data}
                      selectedConferenceID={selectedConferenceID}

            toast={toast}
            setIsVisible={setIsVisible}
            fetchData={fetchConfernceData}
          />
        ),
      },
      add: {
        header: "Add Speaker",
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
      <Dialog
        header={sidebarState.header}
        visible={isVisible}
        draggable={false}
        onHide={() => {
          if (!isVisible) return;
          setIsVisible(false);
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {/* Content Area */}
        {sidebarState.content}
      </Dialog>
      <ConfirmDialog draggable={false} />
      {speakerData.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>No speakers found</h5>
          <p>Try adding a new speaker using the + button.</p>
        </div>
      ) : (
        <>
          <table className="tabel w-100  table-striped-columns">
            <thead>
              <tr>
                <td className="p-2 table-heading">Speaker Image</td>
                <td className="p-2 table-heading">Name</td>
                <td className="p-2 table-heading">Title</td>
                <td className="p-2 table-heading">Company</td>
                <td className="p-2 table-heading">Status</td>
                <td className="p-2 table-heading">Action</td>
              </tr>
            </thead>
            <tbody>
              {speakerData.map((element, i) => (
                <tr key={i}>
                  <td className="p-3 table-data">
                    <Image
                      src={element.imageUrl || "/icons/DefaultPreviewImage.png"}
                      height={90}
                      width={110}
                      alt="speaker Image"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </td>
                  <td className="p-3 table-data">{element.name}</td>
                  <td className="p-3 table-data">{element.title}</td>
                  <td className="p-3  table-data ">{element.companyDetails}</td>
              
                  <td className="p-3  table-data ">
                    {" "}
                    <InputSwitch
                      checked={element.status}
                      onChange={(e) => handleStatusChange(e.value, element.speakerId)}
                      style={{ scale: "0.7" }}
                    />
                  </td>
                  <td className="p-3 table-data ">
                    <div className="d-flex gap-1  justify-content-center flex-nowrap">
                      <button
                        name="edit"
                        className="btn btn-outline-secondary rounded"
                        onClick={(e) => handleModel(e.target.name, element)}
                      >
                        <i className="bx bx-edit-alt"></i>
                      </button>
                      <button
                        className="btn btn-outline-secondary rounded"
                        onClick={() => confirmDelete(element.speakerId)}
                      >
                        <i className="bx bx-trash-alt"></i>
                      </button>
                      <button
                        name="view"
                        className="btn btn-outline-warning rounded"
                        onClick={(e) => handleModel(e.target.name, element)}
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
            totalRecords={speakerData.length}
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
        onClick={(e) => handleModel(e.target.name)}
      >
        +
      </button>
    </div>
  );
}

function Edit({ formData,selectedConferenceID, toast, fetchData, setIsVisible }) {
  const [upload, setUpload] = useState({ file: null, imageUrl: formData.imageUrl || ''});
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
        title: data.title,
        bioData: data.bio,
        companyDetails: data.companyDetails,
        imageUrl: imageUrl,
      };

      const response = await patchSpeakers(selectedConferenceID,payLoad,formData.speakerId);

      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "updated",
          detail: response.data.detail[0].msg || "Speaker Updated successfully",
        });
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
      name: formData.name || "",
      title: formData.title || "",
      bio: formData.bioData || "",
      companyDetails: formData.companyDetails || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      title: Yup.string().required("Title is required"),
      bio: Yup.string().required("Bio is required"),
      companyDetails: Yup.string().required("Company Details are required"),
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
        <label className="form-label">Title*</label>
        <input
          type="text"
          name="title"
          className={`form-control ${
            formik.touched.title && formik.errors.title ? "is-invalid" : ""
          }`}
          placeholder="Enter Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-danger">{formik.errors.title}</div>
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
        label="Update Speaker"
        type="submit"
        className="btn btn-warning text-white mt-3 align-self-start"
        loading={buttonLoading}
        style={{ outline: "none", boxShadow: "none" }}
      />
    </form>
  );
}
function Add({selectedConferenceID, toast, fetchData, setIsVisible }) {
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
        title: data.title,
        bioData: data.bio,
        companyDetails: data.companyDetails,
        imageUrl: imageUrl,
      };

      const response = await patchSpeakers(selectedConferenceID,payLoad);

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
          detail: "Speaker creation failed",
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
      title: "",
      bio: "",
      companyDetails: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      title: Yup.string().required("Title is required"),
      bio: Yup.string().required("Bio is required"),
      companyDetails: Yup.string().required("Company Details are required"),
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
        <label className="form-label">Title*</label>
        <input
          type="text"
          name="title"
          className={`form-control ${
            formik.touched.title && formik.errors.title ? "is-invalid" : ""
          }`}
          placeholder="Enter Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-danger">{formik.errors.title}</div>
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
        label="Save Speaker"
        type="submit"
        className="btn btn-warning text-white mt-3 align-self-start"
        loading={buttonLoading}
        style={{ outline: "none", boxShadow: "none" }}
      />
    </form>
  );
}

function View({ data }) {

 
  return (
    <div className="d-flex gap-4 flex-column">
 
          <>
            <div>
              <label className="form-label  mb-2">Name</label>
              <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
                {data.name}
              </p>
            </div>
            <div>
              <label className="form-label  mb-2">title</label>
              <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
                {data.title}
              </p>
            </div>
            <label className="form-label">Speaker Image</label>
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
