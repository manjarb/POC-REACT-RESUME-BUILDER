import { lazy,StrictMode, Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';

// Lazy load the components
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CreateTemplate = lazy(() => import('./pages/CreateTemplate/CreateTemplate'));
const CreateResume = lazy(() => import('./pages/CreateResume/CreateResume'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/templates/create',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CreateTemplate />
      </Suspense>
    ),
  },
  {
    path: '/resumes/create',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CreateResume />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={router} />
    </DndProvider>
  </StrictMode>,
);
