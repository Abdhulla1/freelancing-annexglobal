import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log('API URL:', apiUrl);



const api = axios.create({
  baseURL: `${apiUrl}/api/v1/user`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const mediaApi = axios.create({
  baseURL: `${apiUrl}/api/v1/media`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const paymentApi = axios.create({
  baseURL: `${apiUrl}/api/v1/payments`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export { api, mediaApi, paymentApi };