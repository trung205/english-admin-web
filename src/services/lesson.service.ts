import { ILessonFilter } from "@interfaces/lesson/lesson.interface";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "utils/axios";

const getAll = async (query?: ILessonFilter) => {
  const response = await getRequest("lesson", query);
  return response;
};

const createLesson = async (body: any) => {
  const response = await postRequest(`lesson`, body);
  return response;
};
const updateLesson = async (id: string, body: any) => {
  const response = await patchRequest(`lesson/${id}`, body);
  return response;
};

const removeLesson = async (id: string) => {
  const response = await deleteRequest(`lesson/${id}`);
  return response;
}

export default { getAll, createLesson, updateLesson, removeLesson };
