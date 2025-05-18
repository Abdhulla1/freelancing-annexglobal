import axiosInstance from "./axiosInstance";

export async function getTestiMonialTableResponse() {
  try {
    const response = await axiosInstance.get(`/footer/media/links/data`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data || "Failed Load  Table Response Section"
    );
  }
}
export async function updateMediaLinkStatus(id, status) {
  try {
    const response = await axiosInstance.patch(
      `/footer/media/links/${id}/update/status
`,
      { status: status }
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data || "Failed Update Media Link"
    );
  }
}
export async function saveTestiMonial( formData) {
  try {
    const response = await axiosInstance.post(
      `/testimonial/create`,
     formData
    );
    return response;
  } catch (error) {
      return Promise.reject(error.response.data.detail[0].msg || "Failed Create Testimonial" );
  }
}

