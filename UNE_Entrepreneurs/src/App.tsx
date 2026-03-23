import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import router from './routes/routing';
import './App.css';
import './styles/Notificaciones.css';

/**
 * App: Componente raíz que invoca el sistema de rutas.
 */
function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <AuthProvider>
      <Toaster richColors closeButton position="top-right" />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}


export default App;
