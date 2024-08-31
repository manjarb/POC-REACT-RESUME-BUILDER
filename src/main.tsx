import { StrictMode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CreateResume from './pages/CreateResume/CreateResume';
import CreateTemplate from './pages/CreateTemplate/CreateTemplate';
import HomePage from './pages/HomePage/HomePage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';

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
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={router} />
    </DndProvider>
  </StrictMode>,
);
