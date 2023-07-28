import { IFilterBase } from "..";

export interface IReadingFilter extends IFilterBase {
  lesson: string;
}

export class IReadingInfo {
  lesson?: string;
  image?: string;
  pronunciation?: string;
  translateWord?: string;
  word?: string;
}
