import { publicAxios, protectedAxios } from "./axios";
import { interceptor } from "./interceptor";
interceptor.requestInterceptor();
interceptor.responseInterceptor();
const API = {
  login: async (payload) => {
    const loginApi = "/api/user/login";
    try{
    const response=await publicAxios.post(loginApi, payload);
    return response;
    }
    catch(error)
    { 
      console.log(error);
      return error.response;
    }
  },
  signup: async (payload) => {
    const signupApi = "/api/user/signup";
    try{
    const response=await publicAxios.post(signupApi, payload);
    return response;
    }
    catch(error)
    { 
      return error.response;
    }
  },
  addTable: async (payload) => {
    return await protectedAxios.post(`/api/table/${payload}`)
  },
  deleteTable: async (payload = "") => {
    return await protectedAxios.delete(`/api/table/${payload}`)
  },
  addEntity: async (payload) => {
    return await protectedAxios.post(`/api/entity`, payload)
  },
  getAllEntities: async (tablename) => {
    return await protectedAxios.get(`/api/entity/${tablename}`)
  },
  deleteEntityById: async (rowId) => {
    return await protectedAxios.delete(`/api/entity/${rowId}`)
  },
};

export default API;
