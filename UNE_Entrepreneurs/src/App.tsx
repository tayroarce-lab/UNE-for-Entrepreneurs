// ============================================================
// App principal \u2014 UNE Costa Rica
// ============================================================
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import router from './routes/routing';
import './styles/financing.css';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors closeButton />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
