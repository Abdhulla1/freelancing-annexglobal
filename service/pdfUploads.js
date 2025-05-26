import axiosInstance from "./axiosInstance";


// -----------Abstracts --------------
//GET request
export async function getAllSubmittedAbstracts (page, limit) {
  try {
    const response = await axiosInstance.get(`/submit/abstract/data?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to fetch Submitted Abstract ";
    throw new Error(message);
  }
}
//Delete
export async function deleteSubmittedAbstract (id) {
  try {
    const response = await axiosInstance.delete(`/submit/abstract/${id}/delete`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to delete Submitted Abstract"
          throw new Error(message);
  }
}


// -----------Brochures --------------
//GET request
export async function getAllBrochures(page, limit) {
  try {
    const response = await axiosInstance.get(`/brochure/data?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to fetch Brochure ";
    throw new Error(message);
  }
}
//Delete
export async function deleteBrochure(id) {
  try {
    const response = await axiosInstance.delete(`/brochure/${id}/delete`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to delete Brochure"
          throw new Error(message);
  }
}