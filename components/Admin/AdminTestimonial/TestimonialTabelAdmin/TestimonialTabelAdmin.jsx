"use client";
import React, { useState,useRef} from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import RichTextEditor from "../../AdminConferences/AdminConferenceView/ConferencePageAdmin/LandingPage/RichTextEditor";
import Image from "next/image";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner"; 
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
import { Sidebar } from "primereact/sidebar";
import { Rating } from "primereact/rating";
import { useFormik } from "formik";
import { uploadImage } from "@/service/mediaManagemnt";
import * as Yup from "yup";
import { saveTestiMonial } from "@/service/testimonialService";
import { Button } from 'primereact/button';
const testimonialData = [
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Pam Beesaley",
    designation: "Associate Professor",
    content:
      "The conference was well-organized and incredibly insightful. I look forward to participating again.",
    status: false,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Michael Scott",
    designation: "Senior Legal Advisor",
    content:
      "A brilliant opportunity to share and learn from global legal minds. Great experience!",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Angela Martin",
    designation: "Legal Consultant",
    content:
      "Insightful sessions and meaningful discussions. A must-attend for legal professionals.",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Jim Halpert",
    designation: "Corporate Law Specialist",
    content:
      "The networking and panel discussions were top-notch. Highly recommended.",
    status: false,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Dwight Schrute",
    designation: "Compliance Officer",
    content:
      "Excellent topics and expert speakers. I gained a lot of practical knowledge.",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Oscar Martinez",
    designation: "Tax Law Analyst",
    content:
      "A well-structured event that tackled critical topics in tax and finance law.",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Phyllis Vance",
    designation: "Human Rights Lawyer",
    content:
      "The event brought diverse perspectives on human rights advocacy and reform.",
    status: false,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Stanley Hudson",
    designation: "Labor Law Specialist",
    content:
      "A very informative conference with actionable takeaways for labor law practice.",
    status: true,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Ryan Howard",
    designation: "Legal Tech Consultant",
    content:
      "Innovative discussions on the future of legal technology. Impressive!",
    status: false,
  },
  {
    image: "/icons/DefaultPreviewImage.png",
    name: "Kelly Kapoor",
    designation: "International Law Expert",
    content: "Fantastic global engagement and high-level legal discussions.",
    status: true,
  },
];

export default function TestimonialTabelAdmin() {
    const toast = useRef(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });

  const [statusChecked, setStatusChecked] = useState(false);
  const confirmDelete = () => {
    const accept = () => {
      console.log("accepted");
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

  const handleSidebar = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Testimonial",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Testimonial",
        content: <Edit data={data} toast={toast} setIsVisible={setIsVisible}/>,
      },
      add: {
        header: "Add Testimonial",
        content: <Add  toast={toast} setIsVisible={setIsVisible}/>,
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

            {/* Sticky Button Area */}
            {/* {sidebarState.header !== "View Topic" && (
              <div className="bg-secondary bg-opacity-10 p-2 d-flex justify-content-center align-items-center mt-auto  gap-3 w-100">
                <button
                  className="btn px-5 bg-white border"
                  onClick={() => setIsVisible(false)}
                >
                  Close
                </button>
                <button className="btn px-5 btn-warning text-white">
                  Save
                </button>
              </div>
            )} */}
          </div>
        </>
      </Sidebar>
      <ConfirmDialog draggable={false} />
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
                  src={element.image}
                  height={90}
                  width={110}
                  alt="TopicImage"
                />{" "}
              </td>
              <td className="p-3 table-data">{element.name}</td>
              <td className="p-3 table-data">{element.designation}</td>
              <td className="p-3  table-data ">{element.content}</td>
              <td className="p-3  table-data ">
                {" "}
                <InputSwitch
                  checked={statusChecked}
                  onChange={(e) => setStatusChecked(e.value)}
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
                    onClick={confirmDelete}
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
function Edit({ data }) {
  const [isvideoLinkEnable, setIsvideoLinkEnable] = useState(false);
 const [ratings, setRatings] = useState(null);
  return (
    <div className="d-flex gap-3 flex-column">
      <FileUpload title={"Logo Image Upload"} showBorder={true} />
       <label htmlFor="title" className="form-label d-flex align-items-center">
        Ratings
      </label>
      <Rating value={ratings} onChange={(e) => setRatings(e.value)} />
      <div className="mt-4">
        <label htmlFor="title" className="form-label d-flex align-items-center">
          Video Link(Youtube) &nbsp;{" "}
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
            type="link"
            name="mapLink"
            className={`form-control border border-0`}
            id="link"
            placeholder="https://www.youtube.com/watch?v=19eIVnOI9Do"
            required
            autoComplete="off"
            disabled={!isvideoLinkEnable}
          />
        </div>
      </div>
      <div className=" mb-3">
        <label htmlFor="eventLocation" className="form-label">
          Name*
        </label>
        <input
          type="text"
          name="eventLocation"
          value={data.name}
          className="form-control"
          id="eventLocation"
          placeholder="Enter Name"
          onChange={(e) => console.log(e.target.value)}
          required
        />
      </div>
      <div className=" mb-3">
        <label htmlFor="eventLocation" className="form-label">
          Designation*
        </label>
        <input
          type="text"
          name="eventLocation"
          value={data.designation}
          className="form-control"
          id="eventLocation"
          placeholder="Enter Designation"
          onChange={(e) => console.log(e.target.value)}
          required
        />
      </div>

      {/* <RichTextEditor
        labelName={"Designation"}
        height="120px"
        initialValue={data.designation}
        onChange={(content) => console.log("Edited content:", content)}
      /> */}
      <RichTextEditor
        labelName={"Content"}
        initialValue={data.content}
        onChange={(content) => console.log("Edited content:", content)}
      />
    </div>
  );
}

function Add({ data, setIsVisible ,toast}) {
  const [isvideoLinkEnable, setIsvideoLinkEnable] = useState(false);
  const [ratings, setRatings] = useState(null);
  const [upload, setUpload] = useState({ file: null });
  const [imageError, setImageError] = useState(null);
    const [buttonLoading, setButtonLoading] = useState(false);
const submitTestimonial = async (data) => {
  setButtonLoading(true)
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
      imageUrl: imageUrl,
      videoUrl: data.videoUrl,
    };

    const response = await saveTestiMonial(payLoad);

    if (response.status === 201) {

      toast.current?.show({
        severity: "success",
        summary: "Saved",
        detail: response.data.detail[0].msg || "Testimonial created successfully",
      });
      setIsVisible(false)
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
      detail:  err || "Something went wrong!",
    });
  }finally{
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
  videoUrl: Yup.string()
    .when([], {
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
})
,
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
        videoUrl: isvideoLinkEnable ? values.videoUrl : "	https://www.linkedin.com/in/annex",
      };
      submitTestimonial(finalData);
    },
  });
    


  return (
    <form onSubmit={formik.handleSubmit} className="position-relative" style={{ height: "100vh" }}>
      <div className="p-3" style={{ overflowY: "auto", height: "calc(100vh - 200px)" }}>
        <FileUpload
          title={"Image Upload*"}
          showBorder={true}
          onFileChange={handleFileChange}
          imageUrl={upload.file?.preview}
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

      {/* Fixed Buttons */}
      <div
        className="bg-secondary position-absolute z-2 bg-opacity-10 p-2 d-flex justify-content-center align-items-center gap-3 w-100"
        style={{
          bottom: 0,
          left: 0,
          height: "80px",
        }}
      >
        <button className="btn px-5 bg-white border" onClick={() => setIsVisible(false)} type="button">
          Close
        </button>
        {/* <button className="btn px-5 btn-warning text-white" type="submit">
          Save
        </button> */}
                    <Button label="Save" type="submit" className="btn px-5 btn-warning text-white" loading={buttonLoading}   style={{ outline: 'none', boxShadow: 'none' }}/>
      </div>
    </form>
  );
}
function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <label className="form-label">Image</label>

      <Image src={data.image} width={120} height={120} alt="DeleteIcon" />
 <label htmlFor="title" className="form-label d-flex align-items-center">
        Ratings
      </label>
      <Rating value={5} disabled cancel={false} />
      <div>
        <label className="form-label  mb-2">Name</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.name}</p>
      </div>
      <div>
        <label className="form-label  mb-2">Designation</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.name}</p>
      </div>
      <div>
        <label className="form-label mb-2">Content</label>
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
      <h5 className="mt-3">Delete Testimonial</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
