import React, { useState } from "react";
import FileUpload from "@/components/Reusable/Admin/FileUpload/FileUpload";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadImage,deleteMedia} from "@/service/mediaManagemnt";
import { patchSpeakerHeaderPannelImages } from "@/service/AdminConfernecePages/confernce";
export default function LandingPage({
  selectedConferenceID,
  fetchConfernceData,
  headerPannelImages,
  toast,
}) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [images, setImages] = useState(() => {
    return headerPannelImages?.length === 2
      ? headerPannelImages.map((img) => ({
          imageUrl: img.imageUrl || "",
          file: null, // file is always null initially since it's not uploaded by user yet
        }))
      : [
          { imageUrl: "", file: null },
          { imageUrl: "", file: null },
        ];
  });

  const handleFileChange = (file, index) => {
    const previewUrl = file ? URL.createObjectURL(file) : "";
    setImages((prev) =>
      prev.map((img, i) =>
        i === index ? { ...img, imageUrl: previewUrl, file } : img
      )
    );
  };

  const formik = useFormik({
    initialValues: {
      name1: headerPannelImages?.[0]?.name || "",
      name2: headerPannelImages?.[1]?.name || "",
    },
    validationSchema: Yup.object({
      name1: Yup.string().required("Name  is required"),
      name2: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values) => {
      setButtonLoading(true);
      try {
        // Image validations
        for (let i = 0; i < images.length; i++) {
          const img = images[i];
          if (!img.file && !img.imageUrl) {
            toast.current.show({
              severity: "error",
              summary: "Missing Image",
              detail: `Please upload image ${i + 1}`,
              life: 3000,
            });
            setButtonLoading(false);
            return;
          }
        }

        // Upload images
        const uploadedUrls = [];
        for (let img of images) {
          if (img.file) {
            const res = await uploadImage(img.file);
            const url = res?.data?.detail?.message?.[0]?.url;
            if (!url) throw new Error("Upload failed");
            uploadedUrls.push(url);
          } else {
            uploadedUrls.push(img.imageUrl); // Use existing image if not changed
          }
        }

        // Prepare final payload
        const payload = {
          images: [
            { name: values.name1, imageUrl: uploadedUrls[0] },
            { name: values.name2, imageUrl: uploadedUrls[1] },
          ],
        };

        // You would call your API here to save
        const response = await patchSpeakerHeaderPannelImages(
          selectedConferenceID,
          payload
        );
        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Header Panel Images saved successfully",
            life: 3000,
          });
          for (let i = 0; i < images.length; i++) {
            const img = images[i];
            const oldImage = headerPannelImages?.[i]?.imageUrl;

            if (
              img.file && // new file was uploaded
              oldImage && // old image exists
              oldImage !== img.imageUrl && // image was actually replaced
              !oldImage.startsWith("blob:") // make sure it's not a local preview
            ) {
              try {
                await deleteMedia("image", oldImage);
              } catch (err) {
                console.error("Image deletion failed:", err);
              }
            }
          }

          fetchConfernceData();
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Upload Failed",
          detail: error.message || "Something went wrong",
          life: 3000,
        });
      } finally {
        setButtonLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        {[0, 1].map((i) => (
          <div className="mb-4" key={i}>
            <FileUpload
              title={`Landing Image ${i + 1}*`}
              showBorder={true}
              dimensionNote="Recommended dimensions: Width 200px × Height 200px"
              imageUrl={images[i].imageUrl || "/icons/DefaultPreviewImage.png"}
              onFileChange={(file) => handleFileChange(file, i)}
            />
            <div>
              <label htmlFor={`name${i + 1}`} className="form-label">
                Name*
              </label>
              <input
                type="text"
                name={`name${i + 1}`}
                id={`name${i + 1}`}
                className={`form-control ${
                  formik.touched[`name${i + 1}`] &&
                  formik.errors[`name${i + 1}`]
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter Name"
                value={formik.values[`name${i + 1}`]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[`name${i + 1}`] &&
                formik.errors[`name${i + 1}`] && (
                  <div className="invalid-feedback">
                    {formik.errors[`name${i + 1}`]}
                  </div>
                )}
            </div>
          </div>
        ))}

        <div className=" mt-4 p-2 d-flex justify-content-start gap-2 w-100">
          <button
            type="submit"
            className="btn px-5 btn-warning text-white"
            disabled={!formik.isValid}
          >
            {buttonLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
