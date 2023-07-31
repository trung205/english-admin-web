import { IFilterBase } from "..";

export interface IGrammarFilter extends IFilterBase {
  lessonId: string;
}

export class IGrammarInfo {
  image?: string;
  know?: string[];
  title?: string;
  use?: { ex?: string; grammar?: string }[];
  lessonId?: string;
}
export class IGrammarUse {
  ex?: string;
  grammar?: string
}
