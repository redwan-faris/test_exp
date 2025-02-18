import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,  
  headers: {
    'Content-Type': 'application/json',
    'Api-key': process.env.API_KEY,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;  
  },
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);  
  }
);

export default axiosInstance;
