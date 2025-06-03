export type Example = { type: string; sentence: string };
export interface Tense {
  tense: string;
  name: string;
  category: string;
  type: string;
  signalWords: string[];
  structure: {
    affirmative: string;
    negative: string;
    question: string;
  };
  examples: {
    type: string;
    sentence: string;
  }[];
  usage: {
    title: string;
    examples: {
      en: string;
      vi_ex: string;
      vi?: string;
    }[];
  }[];
}
