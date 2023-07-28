// import { IListeningFilter, IListeningInfo } from "@interfaces/listening/listening.interface";
import { IReadingFilter, IReadingInfo } from "@interfaces/reading/reading.interface";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "utils/axios";

const getAll = async (query?: IReadingFilter) => {
  const response = await getRequest("reading", query);
  return response;
};

const createReading = async (body: any) => {
  const response = await postRequest(`reading`, body);
  return response;
};
const updateReading = async (id: string, body: IReadingInfo) => {
  const response = await patchRequest(`reading/${id}`, body);
  return response;
};

const removeReading = async (id: string) => {
  const response = await deleteRequest(`reading/${id}`);
  return response;
}

export default { getAll, createReading, updateReading, removeReading };