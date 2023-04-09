import { createBrowserRouter } from 'react-router-dom';
import RegisterPage from '../components/auth/RegisterPage/RegisterPage';
import ChatWrapper from '../components/ChatWrapper';
import Spinner from '../components/Spinner/Spinnerr';
import LoginPage from '../components/auth/LoginPage/LoginPage';

export const routing = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        element: <ChatWrapper />,
        index: true,
      },
      {
        element: <RegisterPage />,
        path: '/registration',
      },
      {
        element: <LoginPage />,
        path: '/login',
      },
    ],
  },
]);
