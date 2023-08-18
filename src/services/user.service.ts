import { IFilterBase } from "@interfaces/index";
import { deleteRequest, getRequest, patchRequest, postRequest } from "utils/axios";

const getAllUser = async (query?: IFilterBase) => {
  const response = await getRequest("user", query);
  return response;
};

const createUser = async ( body: any) => {
  const response = await postRequest(`auth/register`, body);
  return response;
}
const updateUser = async (id: string, body: any) => {
  const response = await patchRequest(`user/${id}`, body);
  return response;
}

const removeUser = async (id: string) => {
  const response = await deleteRequest(`user/${id}`);
  return response;
}
const createUserHistory = async (body: any) => {
  const response = await postRequest("user-history", body);
  return response;
};
export default { getAllUser, updateUser, removeUser, createUser, createUserHistory};
