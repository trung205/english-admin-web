import axios from "axios";

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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export async function getRequest(endpoint: string) {
  const response = await axiosInstance.get(`/${endpoint}`);
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
