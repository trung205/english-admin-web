import { IFilterBase } from "..";

export enum ListeningType {
  SELECT_WORD = 'selectWord',
  SELECT_CELL = 'selectCell',
}

export interface IListeningFilter extends IFilterBase {
  type?: ListeningType;
  lessonId: string;
}

export class IListeningInfo {
  type?: ListeningType;
  lessonId?: string;
  answer?: string;
  question?: string;
  words?: Array<string>;
  rawAnswer?: string;
}
