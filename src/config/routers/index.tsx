import { createBrowserRouter } from 'react-router-dom';
import { PATH } from '@/config/routers/path';
import Home from '@/layouts/Home';
import LoginPage from '@/page/auth/LoginPage';
import HomePage from '@/page/home/HomePage';
import RegisterPage from '@/page/auth/RegisterPage';
import DictionaryLookup from '@/page/dictionary/DictionaryLookup';
import Grammar from '@/page/Grammar';
import Information from '@/page/auth/Information';
import FlashCard from '@/page/dictionary/FlashCard';
import ErrorPage from '@/page/error/ErrorPage';

export const router = createBrowserRouter([
  {
    path: PATH.LOGIN.PATH,
    element: <LoginPage />,
  },
  {
    path: PATH.REGISTER.PATH,
    element: <RegisterPage />,
  },
  {
    path: PATH.HOME.PATH,
    element: <Home />,
    children: [
      {
        path: PATH.INFORMATION.PATH,
        element: <Information />,
      },
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATH.GRAMMAR.PATH,
        element: <Grammar />,
      },
      {
        path: PATH.DICTIONARY.PATH,
        element: <DictionaryLookup />,
      },
      {
        path: PATH.DICTIONARY.FLASHCARD.PATH,
        element: <FlashCard />,
      },
    ],
  },
  {
    path: '/forbidden',
    element: <ErrorPage type='403' />,
  },
  {
    path: '*',
    element: <ErrorPage type='404' />,
  },
]);
