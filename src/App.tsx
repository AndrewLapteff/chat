import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { routing } from './routes/routing';

function App() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <RouterProvider router={routing}></RouterProvider>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;
