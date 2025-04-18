
import axiosInstance from "./axiosInstance";


// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });




//GET request
export async function getAllConference(){
try {
    const response = await axiosInstance.get('/conference/data');
    return response.data?.detail.data;

  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch Conference");
  }
}
export async function getSelectedConference(id){
try {
    const response = await axiosInstance.get(`/conference/${id}/data`);
    return response.data?.detail;

  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch Conference");
  }
}
export async function saveConference(formdata){
try {
    const response = await axiosInstance.post(`/conference/create`,formdata);
    return response.data?.detail;

  } catch (error) {
    throw new Error(error.response?.data || "Failed to Save Conference");
  }
}
export async function saveConferenceLandingPage(formdata,id){
try {
    const response = await axiosInstance.patch(`/conference/${id}/landing/page`,formdata);
    return response.data?.detail;

  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data || "Failed to Save Conference");
  }
}
