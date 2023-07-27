import axios from "axios";
import AuthService from "src/services/auth.service";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user: any = JSON.parse(localStorage.getItem("user") || "{}") ;
    if (user && user?.token) {
      config.headers.Authorization = `Bearer ${user?.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      AuthService.logout();
    }
    return Promise.reject(error);
  }
);

export async function getRequest(endpoint: string, query?: any) {
  console.log(query)
  let params: any = {};
  if (query) {
    for(let key in query ) {
      if (query[key]) params[key] = query[key];
    }
  }
  console.log(params, "params getRequest")
  const response = await axiosInstance.get(`/${endpoint}`, {params});
  return response;
}

export async function postRequest(endpoint: string, payload: any) {
  const response = await axiosInstance.post(`/${endpoint}`, payload);
  return response;
}

export async function patchRequest(endpoint: string, payload: any) {
  const response = await axiosInstance.patch(`/${endpoint}`, payload);
  return response;
}

export async function deleteRequest(endpoint: string) {
  const response = await axiosInstance.delete(`/${endpoint}`);
  return response;
}
