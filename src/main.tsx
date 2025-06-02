import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '@/providers/auth.context';
import { RouterProvider } from 'react-router';
import { router } from '@/config/routers';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import '@/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ReactQueryProvider>
  </StrictMode>,
);
