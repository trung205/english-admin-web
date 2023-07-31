import { IFilterBase } from "..";

export interface IReadingFilter extends IFilterBase {
  lessonId: string;
}

export class IReadingInfo {
  lessonId?: string;
  image?: string;
  pronunciation?: string;
  translateWord?: string;
  word?: string;
}
