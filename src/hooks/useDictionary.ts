import { useQuery } from '@tanstack/react-query';
import { searchDictionary } from '@/service/dictionary/dictionaryLookup.service';

export const useDictionaryQuery = (word: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['dictionary', word],
    queryFn: () => searchDictionary(word),
    enabled,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};
