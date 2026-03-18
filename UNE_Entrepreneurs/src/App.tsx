import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import router from './routes/routing';
import './App.css';

/**
 * App: Componente raíz que invoca el sistema de rutas.
 */
function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
