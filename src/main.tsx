import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CreateTemplate from './pages/CreateTemplate/CreateTemplate';
import CreateResume from './pages/CreateResume/CreateResume';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/templates/create',
    element: <CreateTemplate />,
  },
  {
    path: '/resumes/create',
    element: <CreateResume />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
