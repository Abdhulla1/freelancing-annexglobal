import axiosInstance from "./axiosInstance";


export async function getAdminDashboardData() {
      try {
    const response = await axiosInstance.get(`/dashboard/data`);
    return response;
  } catch (error) {
      return Promise.reject(error.response.data.detail[0].msg || "Failed Load Data" );
  }
}