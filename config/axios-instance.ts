import axios from "axios";
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://ai-python-dmf6acdgaph4gqhy.canadacentral-01.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
})

// In request interceptor
axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
if (session?.user?.accessToken) {
    config.headers['Authorization'] = `Bearer ${session.user.accessToken}`;
  }
  return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through on success
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      window.location.href = "/signin"; 

    }
    return Promise.reject(error);
  }
);

const getAxiosClient=()=>{
  return axiosInstance
}

export default getAxiosClient;