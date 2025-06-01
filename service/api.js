import axios from 'axios';

const api = axios.create({
  baseURL: 'https://94.136.190.152:8003/api/v1/user',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const mediaApi = axios.create({
  baseURL: 'https://94.136.190.152:8003/api/v1/media',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const paymentApi = axios.create({
  baseURL: 'https://94.136.190.152:8003/api/v1/payments',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export { api, mediaApi, paymentApi };