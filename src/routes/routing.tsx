import React, { Suspense, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { User } from 'firebase/auth';
import RegisterPage from '../components/auth/RegisterPage/RegisterPage';
import LoginPage from '../components/auth/LoginPage/LoginPage';
const LazyChatWrapper = React.lazy(() => import('../components/ChatWrapper'));
const LazyRegisterPage = React.lazy(
  () => import('../components/auth/RegisterPage/RegisterPage')
);
const LazyLoginPage = React.lazy(
  () => import('../components/auth/LoginPage/LoginPage')
);

interface Props {
  children: JSX.Element;
}

export const ProtectedRoutes: React.FC<Props> = ({ children }) => {
  const { authedUser }: { authedUser: User } = useContext<any>(AuthContext);
  return authedUser != null ? children : <Navigate to={'/login'} replace />;
};
export const Authorized: React.FC<Props> = ({ children }) => {
  const { authedUser }: { authedUser: User } = useContext<any>(AuthContext);
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

export const ProviderWithDelay = () => {
  const [isReady, setReady] = useState<boolean>(false);
  const { authedUser } = useContext<any>(AuthContext);
  setTimeout(() => {
    setReady(true);
  }, 400);

  if (isReady || authedUser != null) {
    return <RouterProvider router={routing}></RouterProvider>;
  }

  return null;
};
