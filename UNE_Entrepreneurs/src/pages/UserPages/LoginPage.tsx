// ============================================================
// Página de Login — UNE
// ============================================================
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FinancingNavbar from '../../components/Financing/FinancingNavbar';
import '../../styles/financing.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    if (success) {
      navigate('/financiamiento');
    } else {
      setError('Credenciales incorrectas. Intente de nuevo.');
    }
    setLoading(false);
  };

  return (
    <>
      <FinancingNavbar />
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <div
          style={{
            background: 'var(--bgWhite)',
            borderRadius: 'var(--radiusLg)',
            padding: '2.5rem',
            width: '100%',
            maxWidth: '420px',
            boxShadow: 'var(--shadowLg)',
            border: '1px solid var(--borderLight)',
          }}
        >
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'var(--textPrimary)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Iniciar Sesión
          </h1>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--textMuted)',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            Acceda a su cuenta UNE
          </p>

          {error && (
            <div className="financingAlert financingAlertError">{error}</div>
          )}

          <form onSubmit={handleSubmit} id="loginForm">
            <div className="financingFormGroup">
              <label className="financingFormLabel" htmlFor="loginEmail">
                Correo electrónico
              </label>
              <input
                id="loginEmail"
                type="email"
                className="financingFormInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div className="financingFormGroup">
              <label className="financingFormLabel" htmlFor="loginPassword">
                Contraseña
              </label>
              <input
                id="loginPassword"
                type="password"
                className="financingFormInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="financingBtn financingBtnPrimary"
              disabled={loading}
              style={{ width: '100%', padding: '12px' }}
              id="loginSubmitBtn"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'var(--infoBg)',
              borderRadius: 'var(--radiusSm)',
              fontSize: '0.75rem',
              color: 'var(--infoBlue)',
            }}
          >
            <strong>Usuarios de prueba:</strong>
            <br />
            Admin: admin@une.cr / admin123
            <br />
            Usuario: maria@example.com / user123
          </div>
        </div>
      </div>
    </>
  );
}
