import Axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { storage } from "./storage";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getActiveToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  if (process.env.NODE_ENV === "development") {
    config.headers["ngrok-skip-browser-warning"] = true;
  }

  return config;
}

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL as string,
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        // Insert custom access-token refresh logic here. For now, we are
        // just refreshing the page here, so as to redirect them to the
        // login page since their token is now expired.
        // storage.clearAllTokens();
        // window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);
