import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider
} from "react-router-dom";
import { router } from './router/routes';
import AuthProvider from './context/AuthContext/AuthProvider';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <ToastContainer></ToastContainer>
     <RouterProvider router={router} />
     </AuthProvider>
  </StrictMode>,
)
