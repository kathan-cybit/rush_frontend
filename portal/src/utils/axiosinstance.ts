import axios from "axios";
import { error_toast } from "./toaster";

// const baseURL = process.env.REACT_APP_BACKEND_URL;
const host = new URL(window.location.href).hostname;
const baseURL = `http://${host}:8080/api`;
// const baseURL = `https://${host}/api`;
// const baseURL = "https://public.eirisapps.com/vtwo";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor functions for axios api calls which gets implenered before and after evry api calls
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
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status == 401) {
      // a browser safe fallback if token expired or unauthirized
      if (window.location.pathname != "/login") {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/login";
        }, 200);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
