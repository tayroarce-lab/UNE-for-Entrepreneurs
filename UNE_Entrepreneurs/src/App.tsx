import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import router from './routes/routing';
import './App.css';

import { Toaster } from 'sonner';

/**
 * App: Componente raíz que invoca el sistema de rutas.
 */
function App() {
  return (
    <AuthProvider>
      <Toaster richColors closeButton position="top-right" />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
