import { useAuthStore } from '@/store/auth.store';
import type { ReactNode } from 'react';
import { PATH } from '@/config/routers/path';
import { Navigate } from 'react-router';
import { Loading } from '@/config/routers/index';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser, loading } = useAuthStore();
  if (loading) {
    return <Loading />;
  }
  if (currentUser) {
    return <Navigate to={PATH.HOME.PATH} replace />;
  }
  return children;
};

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser, loading } = useAuthStore();
  if (loading) {
    return <Loading />;
  }
  if (!currentUser) {
    return <Navigate to={PATH.LOGIN.PATH} replace />;
  }
  return children;
};
