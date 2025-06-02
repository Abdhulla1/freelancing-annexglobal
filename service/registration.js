import axiosInstance from "./axiosInstance";

//GET request
export async function getAllRegisters(page, limit, conferenceName = null) {
  const query = conferenceName ? `&name=${conferenceName}` : "";

  try {
    const response = await axiosInstance.get(
      `/registration/details/data?page=${page}&limit=${limit}${query}`
    );
    return response;
  } catch (error) {
    const message =
      error?.response?.data?.detail?.[0]?.msg || "Failed to fetch Contact US";
    throw new Error(message);
  }
}
