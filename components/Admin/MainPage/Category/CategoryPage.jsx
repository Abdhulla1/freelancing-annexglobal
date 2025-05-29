"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { updateCategoryPage } from "@/service/mainPageService";

export default function CategoryPage({ categoryData = [], toast, fetchData }) {
  const normalizedInitialCategories = Array(16)
    .fill("")
    .map((_, i) => categoryData[i] || "");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categories: normalizedInitialCategories,
    },
    validationSchema: Yup.object().shape({
      categories: Yup.array()
        .of(Yup.string().required("Category is required"))
        
    }),
    onSubmit: async (values) => {
      const payload = {
        categories: values.categories,
      };
      try {
        console.log("Submitting payload:", payload);
        const response = await updateCategoryPage(payload);
        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail:
              response.data?.detail?.[0]?.msg ||
              "Categories updated successfully",
            life: 3000,
          });
          fetchData();
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Unknown response",
            detail:
              response.data?.detail?.[0]?.msg || "Unknown server response",
            life: 3000,
          });
        }
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Submission failed",
          life: 3000,
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="row mt-4">
  {formik.values.categories.map((value, index) => (
    <div className="col-md-6 mb-3" key={index}>
      <label className="form-label">Category {index + 1}</label>
      <input
        type="text"
        name={`categories[${index}]`}
        className={`form-control ${
          formik.touched.categories?.[index] &&
          formik.errors.categories?.[index]
            ? "is-invalid"
            : ""
        }`}
        placeholder="Category Name"
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.categories?.[index] &&
        typeof formik.errors.categories?.[index] === "string" && (
          <div className="text-danger mt-1">
            {formik.errors.categories[index]}
          </div>
        )}
    </div>
  ))}
</div>


      <div className="mt-4 p-2 d-flex justify-content-start align-items-center gap-2 w-100">

        <Button
          type="submit"
          className="btn px-1 px-md-5 btn-warning text-white"
          disabled={!formik.isValid || !formik.dirty}
          label="Save Changes"
        />
      </div>
    </form>
  );
}
