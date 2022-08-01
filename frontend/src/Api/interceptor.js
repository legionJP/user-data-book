import { protectedAxios } from "./axios";

export const interceptor = {
  requestInterceptor: () =>
    protectedAxios.interceptors.request.use(
      (config) => {
        const bearrerToken = localStorage.getItem("token");
        if (bearrerToken) {
          config.headers["authorization"] = bearrerToken;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    ),
  responseInterceptor: () =>
    protectedAxios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    ),
};
