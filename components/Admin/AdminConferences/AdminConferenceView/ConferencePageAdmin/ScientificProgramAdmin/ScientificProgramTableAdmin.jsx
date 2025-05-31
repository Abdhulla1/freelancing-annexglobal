"use client";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Paginator } from "primereact/paginator";
import { Button } from "primereact/button";
import Image from "next/image";
import DropZoneFile from "@/components/Reusable/DropeZone/DropZoneFile";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadImage, uploadPDF } from "@/service/mediaManagemnt";
import { patchProgram,deleteProgram } from "@/service/AdminConfernecePages/confernce";
export default function ScientificProgramTableAdmin({
  selectedConferenceID,
  scientificProgram,
  fetchConfernceData,
  toast,
}) {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogHeader, setDialogHeader] = useState("");
  const [dialogContent, setDialogContent] = useState(null);

  const handleDialog = (type, data = null) => {
    const dialogMap = {
      edit: {
        header: "Edit Scientific Program",
        content: <Edit data={data} toast={toast} selectedConferenceID={selectedConferenceID} fetchData={fetchConfernceData} setIsVisible={setDialogVisible}/>,
      },
      add: {
        header: "Add Scientific Program",
        content: <Add toast={toast} selectedConferenceID={selectedConferenceID} fetchData={fetchConfernceData} setIsVisible={setDialogVisible}/>,
      },
      view: {
        header: "view Scientific Program",
        content: <View data={data}/>,
      },
    };

    const selected = dialogMap[type];
    if (selected) {
      setDialogHeader(selected.header);
      setDialogContent(selected.content);
      setDialogVisible(true);
    }
  };
    const handleDelete = async (id) => {
      try {
    
       const response=await deleteProgram(selectedConferenceID,{contentType:"scientificProgram",programId:id});
             if(response.status !== 200) {
                throw new Error(response.data.detail[0].msg || "Failed to delete Program");
             }
        toast.current.show({
          severity: "success",
          summary: "Deleted",
          detail: "pROGRAM has been deleted.",
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
     handleDelete(id)
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
  return (
    <div className="table-responsive">
      <Dialog
        header={dialogHeader}
        visible={dialogVisible}
        draggable={false}
        onHide={() => setDialogVisible(false)}

      >
        {dialogContent}
      </Dialog>
      <ConfirmDialog draggable={false} />

      {scientificProgram.length === 0 ? (
        <div className="text-center w-100 py-5">
          <h5>No scientific programs found</h5>
          <p>Try adding a new scientific program using the + button.</p>
        </div>
      ) : (
        <>
          <table className="tabel w-100 mt-4 table-striped-columns">
            <thead>
              <tr>
                <td className="p-2 table-heading">Program Name</td>
                <td className="p-2 table-heading">Program Date</td>
                <td className="p-2 table-heading">Program File</td>
                <td className="p-2 table-heading">Action</td>
              </tr>
            </thead>
            <tbody>
              {scientificProgram.map((element, i) => (
                <tr key={i}>
                  <td className="p-3 table-data ">{element.title}</td>
                  <td className="p-3 table-data text-nowrap">{element.programDate}</td>
                  <td className="p-3 table-data text-nowrap text-truncate"
                      style={{ maxWidth: "200px" }}>
                    <i className="pi pi-file-pdf "></i>&nbsp;{element.programFile}
                  </td>
                  <td className="p-3 table-data">
                    <div className="d-flex gap-1 justify-content-center flex-nowrap">
                      <button
                        name="edit"
                        className="btn btn-outline-secondary rounded"
                        onClick={() => handleDialog("edit", element)}
                      >
                        <i className="bx bx-edit-alt"></i>
                      </button>
                      <button
                        className="btn btn-outline-secondary rounded"
                        onClick={() => confirmDelete(element.programId)}
                      >
                        <i className="bx bx-trash-alt"></i>
                      </button>
                         <button
                        name="view"
                        className="btn btn-outline-warning rounded"
                        onClick={(e) => handleDialog(e.target.name, element)}
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
            rows={rows}
            totalRecords={scientificProgram.length}
            onPageChange={(e) => setFirst(e.first)}
            className="mt-4"
          />
        </>
      )}

      <button
        name="add"
        className="btn btn-lg text-white rounded-circle btn-warning position-absolute"
        style={{ bottom: "50px", right: "50px", zIndex: 1000 }}
        onClick={() => handleDialog("add")}
      >
        +
      </button>
    </div>
  );
}

function Edit({ data,toast, fetchData, setIsVisible, selectedConferenceID }) {
  const [upload, setUpload] = useState({ file: null, imageUrl: data.coverImage || ''});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(data.programFile);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setUploadProgress(0);
    try {
      const response = await uploadPDF(file, (percent) => {
        setUploadProgress(percent);
      });
      const url = response.data?.detail?.message?.[0]?.url;
      if (url) {
       toast.current?.show({
          severity: "success",
          summary: "Saved",
          detail: "Program Uploaded successfully",
        });
        setUploadedFileUrl(url);
      } else {
        throw new Error("Upload failed. No URL returned.");
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Upload Failed",
        detail:  error.message||"Brochure upload failed",
        life: 3000,
      });
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setUploadedFileUrl("");
    setUploadProgress(0);
  };

  const formik = useFormik({
        enableReinitialize: true,

    initialValues: {
      title: data.title || "",
      programDate:data.programDate || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Program Title is required"),
      programDate: Yup.string().required("Program Date is required"),
    }),
    onSubmit: async (values) => {
      if (!upload.file) return setFileError("Cover image is required");
      if (!uploadedFileUrl) return setFileError("PDF brochure file is required");
      setFileError(null);
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

      // STEP 4: Prepare payload and call API
      const payLoad = {
        contentType: "scientificProgram",
       ...values,
       programFile:uploadedFileUrl,
        coverImage: imageUrl,
      };

      const response = await patchProgram(selectedConferenceID,payLoad,data.programId);

      if (response.status===200) {
        toast.current?.show({
          severity: "success",
          summary: "Saved",
          detail: response.data.detail[0].msg || "Program Updated successfully",
        });
        setIsVisible(false);
        fetchData();
      } else {
        setButtonLoading(false);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail:  response.data.detail[0].msg || "Program Updation failed",
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
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 mx-auto" style={{ maxWidth: "550px" }}>
      <div>
        <label className="form-label">Upload Program PDF*</label>
          <DropZoneFile
                    onFileSelect={handleFileSelect}
                    uploadedFileUrl={uploadedFileUrl}
                    onRemove={handleRemove}
                    progress={uploadProgress}
                  />{" "}
      </div>

      <FileUpload title="Cover Image*" imageUrl={upload.imageUrl} onFileChange={(file) => setUpload({ file })}  dimensionNote="Recommended dimensions: Width 560px × Height 400px" />
      {fileError && <div className="text-danger mt-1">{fileError}</div>}

      <div>
        <label className="form-label">Program Title*</label>
        <input
          type="text"
          name="title"
          className={`form-control ${formik.touched.title && formik.errors.title ? "is-invalid" : ""}`}
          placeholder="Enter Program Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && <div className="text-danger">{formik.errors.title}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Program Date*</label>
        <input
          type="date"
          name="programDate"
          className={`form-control ${formik.touched.programDate && formik.errors.programDate ? "is-invalid" : ""}`}
          placeholder="Enter Program Date"
          value={formik.values.programDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.programDate && formik.errors.programDate && <div className="text-danger">{formik.errors.programDate}</div>}
      </div>

      <Button
        label="Save Program"
        type="submit"
        className="btn btn-warning text-white mt-3 align-self-start"
        loading={buttonLoading}
        style={{ outline: "none", boxShadow: "none" }}
      />
    </form>
  );
}


function Add({ toast, fetchData, setIsVisible, selectedConferenceID }) {
  const [upload, setUpload] = useState({ file: null });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setUploadProgress(0);
    try {
      const response = await uploadPDF(file, (percent) => {
        setUploadProgress(percent);
      });
      const url = response.data?.detail?.message?.[0]?.url;
      if (url) {
       toast.current?.show({
          severity: "success",
          summary: "Saved",
          detail: "Program Uploaded successfully",
        });
        setUploadedFileUrl(url);
      } else {
        throw new Error("Upload failed. No URL returned.");
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Upload Failed",
        detail:  error.message||"Brochure upload failed",
        life: 3000,
      });
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setUploadedFileUrl("");
    setUploadProgress(0);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      programDate: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Program Title is required"),
      programDate: Yup.string().required("Program Date is required"),
    }),
    onSubmit: async (values) => {
      if (!upload.file) return setFileError("Cover image is required");
      if (!uploadedFileUrl) return setFileError("PDF brochure file is required");
      setFileError(null);
       setButtonLoading(true);
    try {
      // STEP 1: Check if image is present
      if (!upload.file) {
        throw new Error("Image is required");
      }

      // STEP 2: Upload image
      const res = await uploadImage(upload.file);

      // STEP 3: Check if upload was successful and get image URL
      if (res.status !== 201 || !res.data?.detail?.message?.[0]?.url) {
        throw new Error("Failed to upload image");
      }

      const imageUrl = res.data.detail.message[0].url;

      // STEP 4: Prepare payload and call API
      const payLoad = {
        contentType: "scientificProgram",
       ...values,
       programFile:uploadedFileUrl,
        coverImage: imageUrl,
      };

      const response = await patchProgram(selectedConferenceID,payLoad);

      if (response.status===200) {
        toast.current?.show({
          severity: "success",
          summary: "Saved",
          detail: response.data.detail[0].msg || "Program created successfully",
        });
        setIsVisible(false);
        fetchData();
      } else {
        setButtonLoading(false);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail:  response.data.detail[0].msg || "Program creation failed",
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

      toast.current?.show({
        severity: "success",
        summary: "Saved",
        detail: " Program created successfully",
      });
      setIsVisible(false);
      fetchData();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 mx-auto" style={{ maxWidth: "550px" }}>
      <div>
        <label className="form-label">Upload Program PDF*</label>
          <DropZoneFile
                    onFileSelect={handleFileSelect}
                    uploadedFileUrl={uploadedFileUrl}
                    onRemove={handleRemove}
                    progress={uploadProgress}
                  />{" "}
      </div>

      <FileUpload title="Cover Image*" onFileChange={(file) => setUpload({ file })} />
      {fileError && <div className="text-danger mt-1">{fileError}</div>}

      <div>
        <label className="form-label">Program Title*</label>
        <input
          type="text"
          name="title"
          className={`form-control ${formik.touched.title && formik.errors.title ? "is-invalid" : ""}`}
          placeholder="Enter Program Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && <div className="text-danger">{formik.errors.title}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Program Date*</label>
        <input
          type="date"
          name="programDate"
          className={`form-control ${formik.touched.programDate && formik.errors.programDate ? "is-invalid" : ""}`}
          placeholder="Enter Program Date"
          value={formik.values.programDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.programDate && formik.errors.programDate && <div className="text-danger">{formik.errors.programDate}</div>}
      </div>

      <Button
        label="Save Program"
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
                <Image
              src={data.coverImage}
              width={100}
              height={100}
              alt="Cover Image"
 dimensionNote="Recommended dimensions: Width 560px × Height 400px"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />

            <div>
              <label className="form-label  mb-2">Title</label>
              <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
                {data.title}
              </p>
            </div>
            <div>
              <label className="form-label  mb-2">Program Date</label>
              <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
                {data.programDate}
              </p>
            </div>
         
            <div>
              <label className="form-label mb-2">Program File </label>
              <p className="bg-secondary bg-opacity-10 rounded-2 p-2 text-truncate"
                      style={{ maxWidth: "600px" }}>
                    <i className="pi pi-file-pdf "></i>&nbsp;{data.programFile}
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
      <h5 className="mt-3">Delete Scientific Program</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
