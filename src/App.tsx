import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { ProviderWithDelay } from './routes/routing';

function App() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <ProviderWithDelay />
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;
