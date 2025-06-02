import axiosInstance from "./axiosInstance";

//GET request
export async function getAllContactUS(page, limit,conferenceName=null) {
          const query = conferenceName ? `&name=${conferenceName}` : "";
  try {
    const response = await axiosInstance.get(`/contactus/data?page=${page}&limit=${limit}${query}`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to fetch Contact US";
    throw new Error(message);
  }
}
//Delete
export async function deleteContactUS(id) {
  try {
    const response = await axiosInstance.delete(`/contactus/${id}/delete`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to delete Contact US"
          throw new Error(message);
  }
}