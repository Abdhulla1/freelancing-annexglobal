import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.annexglobalconferences.com/api/v1/user',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const mediaApi = axios.create({
  baseURL: 'https://api.annexglobalconferences.com/api/v1/media',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const paymentApi = axios.create({
  baseURL: 'https://api.annexglobalconferences.com/api/v1/payments',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export { api, mediaApi, paymentApi };