import React, { Suspense, useState } from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import RegisterPage from '../components/auth/RegisterPage/RegisterPage';
import { useAuth } from '../hooks/useAuth';
const LazyChatWrapper = React.lazy(() => import('../components/ChatWrapper'));
const LazyLoginPage = React.lazy(
  () => import('../components/auth/LoginPage/LoginPage')
);

interface Props {
  children: JSX.Element;
}

export const ProtectedRoutes: React.FC<Props> = ({ children }) => {
  const authedUser = useAuth();
  return authedUser != null ? children : <Navigate to={'/login'} replace />;
};
export const Authorized: React.FC<Props> = ({ children }) => {
  const authedUser = useAuth();
  return authedUser == null ? children : <Navigate to={'/'} replace />;
};

export const routing = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
  {
    path: '/',
    children: [
      {
        element: (
          <React.Suspense fallback={null}>
            <ProtectedRoutes>
              <LazyChatWrapper />
            </ProtectedRoutes>
          </React.Suspense>
        ),
        index: true,
      },
      {
        element: (
          <Authorized>
            <RegisterPage />
          </Authorized>
        ),
        path: '/registration',
      },
      {
        element: (
          <Suspense fallback={null}>
            <Authorized>
              <LazyLoginPage />
            </Authorized>
          </Suspense>
        ),
        path: '/login',
      },
    ],
  },
]);
