import { googleTranslationApi } from '@/api/api';
import { PartOfSpeechEnum as pose } from '@/enum/part.of.speech.enum';

export const translatePartOfSpeech = (pos: string): string => {
  switch (pos) {
    case 'noun':
      return pose.NOUN;
    case 'adjective':
      return pose.ADJECTIVE;
    case 'adverb':
      return pose.ADVERB;
    case 'verb':
      return pose.VERB;
    default:
      break;
  }
  return pos;
};

export const translateDefinition = async (text: string): Promise<string> => {
  try {
    const res = await googleTranslationApi.get(`/translate_a/single`, {
      params: {
        client: 'gtx',
        sl: 'en',
        tl: 'vi',
        dt: 't',
        q: text,
      },
    });
    return res.data[0][0][0];
  } catch (err) {
    return '(Lỗi dịch nghĩa): ' + err;
  }
};
