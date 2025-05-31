import axios from "axios";
import axiosInstance from "./axiosInstance";
const BASE_URL = "https://139.59.15.8:8003/api/v1";

// const axiosInstance=axios.create({
//      baseURL: BASE_URL,
// })

//GET request
export async function fetchAdmins(page, limit) {
  try {
    const response = await axiosInstance.get(
      `/controlled/access/admin/data?page=${page}&limit=${limit}`
    );
    return response.data?.detail;
  } catch (error) {
    throw new Error(error.response.data || "Failed to fetch admins");
  }
}
export async function fetchAdminss() {
  try {
    // const { token } = await (await fetch('/api/getToken')).json();
    // const token=localStorage.getItem("token");
    const response = await axiosInstance.get("/controlled/access/admin/data");
    return response.data?.detail.data;
  } catch (error) {
    throw new Error(error.response.data || "Failed to fetch admins");
  }
}
export async function fetchAdminById(id) {
  try {
    const response = await axiosInstance.get(
      `/controlled/access/admin/${id}/data`
    );
    return response.data?.detail.data;
  } catch (error) {
    throw new Error(error.response.data || "Failed to fetch admin");
  }
}
export async function createAdmin(formData) {

  try {
    const response = await axiosInstance.post(
      "/controlled/access/admin/create/profile",
      formData
    );
    return response.data?.detail.data;
  } catch (error) {
      throw new Error(error.response.data || "Failed Create admin");
  }
}
export async function updateAdmin(formData, id) {

  try {
    const response = await axiosInstance.patch(
      `/controlled/access/admin/${id}/update/profile`,
      formData
    );
    return response.data?.detail.data;
  } catch (error) {
       throw new Error(error.response.data || "Update admin");
  }
}
export async function changePassword(formData, id) {

  try {
    const response = await axiosInstance.patch(
      `/controlled/access/admin/${id}/change/password
`,
      formData
    );
    return response;
  } catch (error) {
    const message =
      error?.response?.data?.detail?.[0]?.msg || "Failed to change Password";
    throw new Error(message);
  }
}

export async function resetAdmin(id) {
  try {
    const response = await axiosInstance.patch(
      `/controlled/access/admin/${id}/reset/profile`
    );
    return response.data?.detail?.[0];
  } catch (error) {
    const message =
      error?.response?.data?.detail?.[0]?.msg || "Failed to Reset Admin";
    throw new Error(message);
  }
}
export async function deleteAdmin(id) {
  try {
    const response = await axiosInstance.delete(
      `/controlled/access/admin/${id}/delete
`
    );
    return response;
  } catch (error) {
    const message =
      error?.response?.data?.detail?.[0]?.msg || "Failed to delete Admin";
    throw new Error(message);
  }
}
