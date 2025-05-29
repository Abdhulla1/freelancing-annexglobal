import axiosInstance from "./axiosInstance";
//Get Main Page Data
export async function getMainPageData() {
  try {
    const response = await axiosInstance.get(`/main/page/data`);
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Fetch Main Page Data";
          throw new Error(message);  
  }
}
export async function updateMainLandingPage(formData) {
  try {
    const response = await axiosInstance.patch(`/main/page/landing/page`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update Landing Page"
          throw new Error(message);  }
}
export async function updateMainWelcomeContent(formData) {
  try {
    const response = await axiosInstance.patch(`/main/page/welcome/content`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update Welcome Content"
          throw new Error(message);  }
}
export async function updateMainVideoSection(formData) {
  try {
    const response = await axiosInstance.patch(`/main/page/video/section`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update Video Section"
          throw new Error(message);  }
}
export async function updateLocationOverview(formData) {
  try {
    const response = await axiosInstance.patch(`/main/page/location`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update Location Overview"
          throw new Error(message);  }
}
export async function updateCategoryPage(formData) {
  try {
    const response = await axiosInstance.patch(`/main/page/categories
`,
     formData
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update Categories"
          throw new Error(message);  }
}