import { useState } from 'react';
import { searchDictionary } from '@/service/dictionaryLookup.service';
import type { WordData, ImageResult } from '@/types/dictionaryLookup/dictionary-lookup.type';

export const useDictionary = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WordData | null>(null);
  const [image, setImage] = useState<ImageResult | null>(null);
  const [mean, setMean] = useState('');
  const [translations, setTranslations] = useState<string[]>([]);

  const search = async (word: string) => {
    setLoading(true);
    try {
      const result = await searchDictionary(word);
      setData(result.wordData);
      setImage(result.image);
      setMean(result.mean);
      setTranslations(result.translations);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    image,
    mean,
    translations,
    search,
  };
};
