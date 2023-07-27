import { IListeningFilter } from "@interfaces/listening/listening.interface";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "utils/axios";

const getAll = async (query?: IListeningFilter) => {
  const response = await getRequest("listening", query);
  return response;
};

const createListening = async (body: any) => {
  const response = await postRequest(`listening`, body);
  return response;
};
const updateListening = async (id: string, body: any) => {
  const response = await patchRequest(`listening/${id}`, body);
  return response;
};

const removeListening = async (id: string) => {
  const response = await deleteRequest(`listening/${id}`);
  return response;
}

export default { getAll, createListening, updateListening, removeListening };