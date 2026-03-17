import Routing from './routes/routing'
import { AuthProvider } from './context/AuthContext'
import './App.css'

/**
 * App: Componente raíz que invoca el sistema de rutas.
 */
function App() {
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  )
}

export default App;
