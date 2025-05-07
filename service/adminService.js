import axios from "axios";
import axiosInstance from "./axiosInstance";
const BASE_URL = "https://139.59.15.8:8003/api/v1";

// const axiosInstance=axios.create({
//      baseURL: BASE_URL,
// })

//GET request
export async function fetchAdmins() {
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
  console.log(formData);
  try {
    const response = await axiosInstance.post(
      "/controlled/access/admin/create/profile",
      formData
    );
    return response.data?.detail.data;
  } catch (error) {
    throw error;
  }
}
export async function updateAdmin(formData, id) {
  console.log(formData);
  try {
    const response = await axiosInstance.patch(
      `/controlled/access/admin/${id}/update/profile`,
      formData
    );
    return response.data?.detail.data;
  } catch (error) {
    throw error;
  }
}

export async function resetAdmin(id) {
  try {
    const response = await axiosInstance.patch(
      `/controlled/access/admin/${id}/reset/profile`
    );
    return response.data?.detail?.[0];
  } catch (error) {
    throw error;
  }
}
