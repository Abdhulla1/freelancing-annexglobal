import axios from "axios";

const BASE_URL="https://139.59.15.8:8003/api/v1";

export const fetchTokenFromApi = async () => {
    try {
      const response = await fetch('/api/getToken');
      const data = await response.json();
  
      if (response.ok) {
        return { token: data.token };  // Return token if successful
      } else {
        return { error: data.error };  // Return error message if token is not found
      }
    } catch (error) {
      return { error: 'Failed to fetch token' }; 
    }
  };



const axiosInstance=axios.create({
     baseURL: BASE_URL,
})


//GET request
export async function fetchAdmins(){
try {
  const { token } = await (await fetch('/api/getToken')).json();
    const response = await axiosInstance.get('/controlled/access/admin/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data?.detail;

  } catch (error) {
    throw new Error(error.response.data || "Failed to fetch admins");
  }
}