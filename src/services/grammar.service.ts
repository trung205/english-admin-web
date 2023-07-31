// import { IListeningFilter, IListeningInfo } from "@interfaces/listening/listening.interface";
import { IGrammarFilter, IGrammarInfo } from "@interfaces/grammar/grammar.interface";
import { IReadingFilter, IReadingInfo } from "@interfaces/reading/reading.interface";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "utils/axios";

const getAll = async (query?: IGrammarFilter) => {
  const response = await getRequest("grammar", query);
  return response;
};

const createGrammar = async (body: any) => {
  const response = await postRequest(`grammar`, body);
  return response;
};
const updateGrammar = async (id: string, body: IGrammarInfo) => {
  const response = await patchRequest(`grammar/${id}`, body);
  return response;
};

const removeGrammar = async (id: string) => {
  const response = await deleteRequest(`grammar/${id}`);
  return response;
}

export default { getAll, createGrammar, updateGrammar, removeGrammar };