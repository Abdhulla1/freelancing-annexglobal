
import axiosInstance from "./axiosInstance";

export async function getOCMTableResponse(page, limit) {
  try {
    const response = await axiosInstance.get(`/ocm/data?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
   const message = error?.response?.data?.detail?.[0]?.msg || "Failed Load OCM Table Response"
          throw new Error(message);
  }
}
export async function getOCMPageResponse( id) {
  try {
    const response = await axiosInstance.get(`/ocm/${id}/data`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed Load OCM"
          throw new Error(message);
  }
}
export async function saveOCMBG(formData) {
  try {
    const response = await axiosInstance.patch(
      `/ocm/bg/logo`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save OCM"
          throw new Error(message);  }
}
export async function saveOCM(formData) {
  try {
    const response = await axiosInstance.post(
      `/ocm/create`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save OCM"
          throw new Error(message);  }
}
export async function updateOCM(id,formData) {
  try {
    const response = await axiosInstance.patch(
      `/ocm/${id}/update`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update OCM"
          throw new Error(message);  }
}

export async function deleteOCM(id) {
  try {
    const response = await axiosInstance.delete(`/ocm/${id}/remove`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to delete OCM"
          throw new Error(message);
  }
}

export async function updateOCMStatus(id, status) {
  try {
    const response = await axiosInstance.patch(
      `/ocm/${id}/update/status`,
      { status: status }
    );
    return response;
  } catch (error) {
      const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update Speaker Status"
          throw new Error(message);
  }
}