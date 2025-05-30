import axios from 'axios';
const unsplashApiKey = import.meta.env.VITE_UNSPLASH_CLIENT_ID;

export const googleTranslationApi = axios.create({
  baseURL: import.meta.env.VITE_GOOGLE_TRANSLATION_URL,
  timeout: 30000,
});
export const dictionaryApi = axios.create({
  baseURL: import.meta.env.VITE_DICTIONARY_URL,
  timeout: 30000,
});
export const unsplashApi = axios.create({
  baseURL: import.meta.env.VITE_UNSPLASH_API_URL,
  timeout: 30000,
});
unsplashApi.interceptors.request.use((config) => {
  const connector = config.url?.includes('?') ? '&' : '?';
  config.url = `${config.url}${connector}client_id=${unsplashApiKey}`;
  return config;
});
