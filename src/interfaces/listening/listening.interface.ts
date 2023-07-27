import { IFilterBase } from "..";

export enum ListeningType {
  SELECT_WORD = 'selectWord',
  SELECT_CELL = 'selectCell',
}

export interface IListeningFilter extends IFilterBase {
  type?: ListeningType;
  lesson: string;
}
