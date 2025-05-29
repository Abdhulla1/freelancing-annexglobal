import axiosInstance from "./axiosInstance";

export async function getTestiMonialTableResponse(page, limit) {
  try {
    const response = await axiosInstance.get(`/testimonial/data?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data || "Failed Load TestiMonial Table Response Section"
    );
  }
}
export async function getTestiMonialPageResponse( id) {
  try {
    const response = await axiosInstance.get(`/testimonial/${id}/data`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data || "Failed Load TestiMonial"
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
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to delete Contact US"
          throw new Error(message);  }
}
export async function updateTestimonial(id,formData) {
  try {
    const response = await axiosInstance.patch(
      `/testimonial/${id}/update
`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to delete Contact US"
          throw new Error(message);  }
}

export async function deleteTestiMonial(id) {
  try {
    const response = await axiosInstance.delete(`/testimonial/${id}/remove`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to delete TestiMonial"
          throw new Error(message);
  }
}

export async function updateTestiMonialStatus(id, status) {
  try {
    const response = await axiosInstance.patch(
      `/testimonial/${id}/update/status

`,
      { status: status }
    );
    return response;
  } catch (error) {
        const message = error?.response?.data?.detail?.[0]?.msg || "Failed to delete Speaker"
          throw new Error(message);
  }
}