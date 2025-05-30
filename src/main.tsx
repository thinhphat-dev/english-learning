import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import { AuthProvider } from '@/providers/auth.context';
import { RouterProvider } from 'react-router';
import { router } from '@/config/routers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
