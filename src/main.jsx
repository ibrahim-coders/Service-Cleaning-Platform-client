import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './Router/router';
import { RouterProvider } from 'react-router-dom';
import AuthContext from './Context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthContext>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthContext>
    </HelmetProvider>
  </StrictMode>
);
