import { createBrowserRouter } from 'react-router-dom';
import { PATH } from '@/config/routers/path';
import { lazy, Suspense } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { PrivateRoute, PublicRoute } from './authRouter';

export const Loading = () => <div className='text-center mt-10'>Đang tải...</div>;

const LoginPage = lazy(() => import('@/page/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/page/auth/RegisterPage'));
const HomePage = lazy(() => import('@/page/home/HomePage'));
const Information = lazy(() => import('@/page/auth/Information'));
const Grammar = lazy(() => import('@/page/grammar/Grammar'));
const DictionaryLookup = lazy(() => import('@/page/dictionary/DictionaryLookup'));
const VocabularyQuiz = lazy(() => import('@/page/dictionary/VocabularyQuiz'));
const GrammarQuiz = lazy(() => import('@/page/grammar/GrammarQuiz'));
const FlashCard = lazy(() => import('@/page/dictionary/FlashCard'));
const ErrorPage403 = lazy(() => import('@/page/error/ErrorPage'));
const ErrorPage404 = lazy(() => import('@/page/error/ErrorPage'));

export const router = createBrowserRouter([
  {
    path: PATH.LOGIN.PATH,
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: PATH.REGISTER.PATH,
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    element: (
      <Suspense fallback={<Loading />}>
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      </Suspense>
    ),
    children: [
      {
        path: PATH.HOME.PATH,
        index: true,
        element: <HomePage />,
      },
      {
        path: PATH.INFORMATION.PATH,
        element: <Information />,
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
        path: PATH.DICTIONARY.QUIZ.PATH,
        element: <VocabularyQuiz />,
      },
      {
        path: PATH.GRAMMAR.QUIZ.PATH,
        element: <GrammarQuiz />,
      },
      {
        path: PATH.DICTIONARY.FLASHCARD.PATH,
        element: <FlashCard />,
      },
    ],
  },
  {
    path: '/forbidden',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorPage403 type='403' />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorPage404 type='404' />
      </Suspense>
    ),
  },
]);
