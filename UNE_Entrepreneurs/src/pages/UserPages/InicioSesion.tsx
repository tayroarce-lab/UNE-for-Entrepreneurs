import React from 'react';

const InicioSesion: React.FC = () => {
    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Contraseña" />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default InicioSesion;