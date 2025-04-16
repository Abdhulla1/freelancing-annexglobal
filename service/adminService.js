import axios from "axios";
import axiosInstance from "./axiosInstance";
const BASE_URL="https://139.59.15.8:8003/api/v1";

// const axiosInstance=axios.create({
//      baseURL: BASE_URL,
// })

//GET request
export async function fetchAdmins(){
try {
  // const { token } = await (await fetch('/api/getToken')).json();
    const token=localStorage.getItem("token");
    const response = await axiosInstance.get('/controlled/access/admin/data');
    return response.data?.detail.data;
  } catch (error) {
    throw new Error(error.response.data || "Failed to fetch admins");
  }
}
export async function createAdmin(formData){
try {
  // const { token } = await (await fetch('/api/getToken')).json();
    const token=localStorage.getItem("token");
    const response = await axiosInstance.get('controlled/access/admin/create/profile',formData);
    return response.data?.detail.data;
  } catch (error) {
    throw new Error(error.response.data || "Failed to fetch admins");
  }
}
