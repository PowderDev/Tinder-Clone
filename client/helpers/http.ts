//@ts-nocheck

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { AuthResponse } from "../types/user";

const $api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4000",
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && error.config) {
      try {
        const res = await axios.get<AuthResponse>("http://localhost:4000/auth/refresh", {
          withCredentials: true,
        });
        localStorage.setItem("token", res.data.accessToken);
        return $api.request(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }
    throw error;
  }
);

export default $api;

const getCookie = (name: string) => {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith(name + "=");
  });
};

export const deleteCookie = (name: string, path?: string, domain?: string) => {
  if (getCookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
};
