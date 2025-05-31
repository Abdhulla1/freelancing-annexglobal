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
        
       const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Upload Image"
          throw new Error(message);  }
      
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
        throw new Error(error.response?.data || "Failed to to Upload Video");
      }
    }
export async function uploadPDF(file,onProgress){
    const formData = new FormData();
    formData.append("file", file); 
    try {
        const response = await axiosInstance.post(`/media/save/pdf`,formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },    onUploadProgress: (event) => {
      const percent = Math.round((event.loaded * 100) / event.total);
      onProgress(percent); // Send progress to caller
    },
          });
        return response;
    
      } catch (error) {
      const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Upload PDF";
      throw new Error(message);
      }
    }