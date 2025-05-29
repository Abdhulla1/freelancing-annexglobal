import axiosInstance from "./axiosInstance";

//GET request
export async function getAllGallery( ) {
  try {
    const response = await axiosInstance.get(`/gallery/data`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to fetch Gallery";
    throw new Error(message);
  }
}
export async function saveAllGallery(formData) {
  try {
     const response = await axiosInstance.put(`/gallery/update/images`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Gallery";
    throw new Error(message);
  }
}
