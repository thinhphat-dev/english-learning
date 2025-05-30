import { PartOfSpeechEnum as pose } from "@/enum/part.of.speech.enum";

export interface Phonetic {
  text?: string;
  audio?: string;
}

export interface Definition {
  definition: string;
  example?: string;
}

export interface Meaning {
  partOfSpeech: pose;
  definitions: Definition[];
}

export interface WordData {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  sourceUrls: string[];
}

export interface ImageResult {
  urls: {
    small: string;
  };
  alt_description: string;
}