import axios from "axios";
import { error_toast } from "./toaster";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status == 401) {
      if (window.location.pathname != "/login") {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/login";
        }, 200);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
