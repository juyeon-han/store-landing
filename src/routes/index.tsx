import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from '@/App';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import NotFoundFallback from '@/components/fallback/NotFoundFallback';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '*',
        element: <NotFoundFallback />,
      },
    ],
  },
]);

export default router;
