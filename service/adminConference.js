import axiosInstance from "./axiosInstance";

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

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
  console.log(id);
  try {
    const response = await axiosInstance.get(`/conference/${id}/data`);
    console.log(response)
    return response.data?.detail; // {data:response.data?.detail,error:null};
  } catch (error) {
    return error || "Failed to fetch Conference";
  }
}
export async function saveConference(formdata) {
  try {
    const response = await axiosInstance.post(`/conference/create`, formdata);
    // return response.data?.detail;
     return response;
  } catch (error) {
   const message = error?.response?.data?.detail?.[0]?.msg || "Failed to fetch Conference";
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
export async function saveConferenceLandingPage(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/landing/page`,
      formdata
    );
    return response.data?.detail;
  } catch (error) {
    throw new Error(
      error.response?.data || "Failed to Save Conference Landing Page"
    );
  }
}
export async function saveWelcomeContent(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/webinar/welcome/content`,
      formdata
    );
    return response.data?.detail;
  } catch (error) {
    throw new Error(
      error.response?.data || "Failed to Save Conference Welcome Content"
    );
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
