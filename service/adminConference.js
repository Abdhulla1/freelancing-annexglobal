import axiosInstance from "./axiosInstance";

//GET request
export async function getAllConference(page, limit) {
  try {
    const response = await axiosInstance.get(`/conference/data?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to fetch Conference";
    throw new Error(message);
  }
}
export async function getSelectedConference(id) {
  try {
    const response = await axiosInstance.get(`/conference/${id}/data`);
    return response.data?.detail; // {data:response.data?.detail,error:null};
  } catch (error) {
 const message = error?.response?.data?.detail?.[0]?.msg || "Failed to fetch Conference";
    throw new Error(message);
  }
}
export async function saveConference(formdata) {
  try {
    const response = await axiosInstance.post(`/conference/create`, formdata);
    // return response.data?.detail;
     return response;
  } catch (error) {
   const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Conference";
    throw new Error(message);
  }
}
export async function updateConference(id,formdata) {
  try {
    const response = await axiosInstance.patch(`/conference/${id}/update`, formdata);
    return response;
  } catch (error) {
      return Promise.reject(error.response.data.detail[0].msg || "Failed to Update Conference" );
  }
}
export async function saveVideoSection(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/webinar/video/section`,
      formdata
    );
    return response.data?.detail;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to Save Video Section");
  }
}

//Publish Toggle
export async function conferenceStatusToggle(id,formData) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/draft/publish
`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update"
          throw new Error(message);  }
}
//Permalink Toggle
export async function savePermalink(id,formData) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/permalink`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update"
          throw new Error(message);  }
}
export async function restPasswordLink(formData) {
  try {
    const response = await axiosInstance.patch(
      `/controlled/access/admin/forgot/password`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update"
          throw new Error(message);  }
}
export async function restPassword(formData) {
  try {
    const response = await axiosInstance.patch(
      `/controlled/access/admin/forgot/password`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update"
          throw new Error(message);  }
}
export async function getallConferencesNames() {
  try {
    const response = await axiosInstance.get(
      `/user/conferences/names`
    );
    return response;
  } catch (error) {
      const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Get All Conferences Names"
          throw new Error(message);
  }
}