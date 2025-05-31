
import axiosInstance from "./axiosInstance";

export async function getSpeakerTableResponse(page, limit) {
  try {
    const response = await axiosInstance.get(`/speaker/data?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Get Speaker Table Response"
          throw new Error(message);
  }
}
export async function getSpeakerPageResponse( id) {
  try {
    const response = await axiosInstance.get(`/speaker/${id}/data`);
    return response;
  } catch (error) {
   const message = error?.response?.data?.detail?.[0]?.msg || "Failed Load Speaker"
          throw new Error(message);
  }
}

export async function saveSpeaker(formData) {
  try {
    const response = await axiosInstance.post(
      `/speaker/create`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Speaker"
          throw new Error(message);  }
}
export async function saveSpeakerBG(formData) {
  try {
    const response = await axiosInstance.patch(
      `/speaker/bg/logo`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Speaker"
          throw new Error(message);  }
}
export async function updateSpeaker(id,formData) {
  try {
    const response = await axiosInstance.patch(
      `/speaker/${id}/update`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update Speaker"
          throw new Error(message);  }
}

export async function deleteSpeaker(id) {
  try {
    const response = await axiosInstance.delete(`/speaker/${id}/remove`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to delete Speaker"
          throw new Error(message);
  }
}

export async function updateSpeakerStatus(id, status) {
  try {
    const response = await axiosInstance.patch(
      `/speaker/${id}/update/status`,
      { status: status }
    );
    return response;
  } catch (error) {
      const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update Speaker Status"
          throw new Error(message);
  }
}
export async function getBgImage() {
  try {
    const response = await axiosInstance.get(`/user/bg/image`);
    return response;
  } catch (error) {
   const message = error?.response?.data?.detail?.[0]?.msg || "Failed Load BG"
          throw new Error(message);
  }
}