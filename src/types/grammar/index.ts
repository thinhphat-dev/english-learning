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

export interface GrammarExample {
  sentence: string;
  translation: string;
  note?: string;
}

export interface GrammarCategory {
  name: string;
  description: string;
  examples: string[];
}

export interface GrammarItem {
  type: 'Noun' | 'Adverb' | 'Adjective' | 'Verb' | string;
  title_vn: string;
  definition: string;
  examples: GrammarExample[];
  signals: string[];
  categories: GrammarCategory[];
}