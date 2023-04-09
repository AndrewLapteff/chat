import { RouterProvider } from 'react-router-dom';
import { routing } from './routes/routing';
import Spinner from './components/Spinner/Spinnerr';

function App() {
  return (
    <RouterProvider
      fallbackElement={<Spinner />}
      router={routing}
    ></RouterProvider>
  );
}

export default App;
