import { dictionaryApi, unsplashApi } from '@/api/api';
import { translateDefinition } from '@/utils/translation.helper';
import type { WordData, ImageResult } from '@/types/dictionaryLookup/dictionary-lookup.type';

export const searchDictionary = async (word: string) => {
  const res = await dictionaryApi.get(`/api/v2/entries/en/${word}`);
  const wordData: WordData = res.data[0];
  wordData.meanings = wordData.meanings.slice(0, 3);

  const imgRes = await unsplashApi.get(`/search/photos?query=${word}&client_id=`);
  const image: ImageResult | null = imgRes.data.results[0] || null;

  const mean = await translateDefinition(word);
  const definitions = wordData.meanings.map((m) => m.definitions[0]?.definition || '');
  const translations = await Promise.all(definitions.map((def) => translateDefinition(def)));

  return {
    wordData,
    image,
    mean,
    translations,
  };
};
