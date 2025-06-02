import axiosInstance from "./axiosInstance";

//GET request
export async function getAllNewsLetters (page, limit,conferenceName=null) {
        const query = conferenceName ? `&name=${conferenceName}` : "";

  try {
    const response = await axiosInstance.get(`/news/letters/data?page=${page}&limit=${limit}${query}`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to fetch NewsLetter";
    throw new Error(message);
  }
}
//Delete
export async function deleteNewsLetter (id) {
  try {
    const response = await axiosInstance.delete(`/news/letters/${id}/delete`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to delete NewsLetter "
     throw new Error(message);
  }
}



// export const getAllNewsLetters = async (page = 1, limit = 10) => {
//   return await axios.get(`/api/newsletters?page=${page}&limit=${limit}`);
// };

// export const deleteNewsLetter = async (id) => {
//   return await axios.delete(`/api/newsletters/${id}`);
// };