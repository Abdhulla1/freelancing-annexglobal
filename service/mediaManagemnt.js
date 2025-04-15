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
        return response.data?.detail;
    
      } catch (error) {
        throw new Error(error.response?.data || "Failed to fetch Conference");
      }
    }