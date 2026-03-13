import Routing from './routes/routing';
import './App.css';
import { Toaster } from 'sonner';

/**
 * App: Componente raíz que invoca el sistema de rutas.
 */
function App() {
  return (
    <>
      <Toaster richColors closeButton />
      <Routing />
    </>
  );
}

export default App;
