import axios from 'axios';
import { getConfig } from '..';

const axiosInstance = axios.create({
  baseURL: getConfig().env.API_BASE_URL,  
  headers: {
    'Content-Type': 'application/json',
    'Api-key': getConfig().env.API_KEY,
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
