import axiosInstance from "./axiosInstance";
export async function uploadImage(file){
    const formData = new FormData();
    formData.append("file", file); 
    try {
        const response = await axiosInstance.post(`/media/save/images`,formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        // return response.data?.detail.message[0];
         return response;
    
      } catch (error) {
        throw new Error(error.response?.data || "Failed to fetch Conference");
      }
    }
export async function uploadVideo(file){
    const formData = new FormData();
    formData.append("file", file); 
    try {
        const response = await axiosInstance.post(`/media/save/videos`,formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        return response.data?.detail.message[0];
    
      } catch (error) {
        throw new Error(error.response?.data || "Failed to fetch Conference");
      }
    }