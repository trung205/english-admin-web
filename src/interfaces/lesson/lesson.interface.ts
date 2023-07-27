import { IFilterBase } from "..";

export enum LessonType {
  GRAMMAR = "GRAMMAR",
  LISTENING = "LISTENING",
  READING = "READING",
}

export interface ILessonFilter extends IFilterBase {
    type?: LessonType
}