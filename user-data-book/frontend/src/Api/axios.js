import axios from "axios";
import API_CONSTANT from "./Constant";

export const publicAxios = axios.create({
  baseURL: API_CONSTANT.BACKEND_HOST,
});

export const protectedAxios = axios.create({
  baseURL: API_CONSTANT.BACKEND_HOST,
});
