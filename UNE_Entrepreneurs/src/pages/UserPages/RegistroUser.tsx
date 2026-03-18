import React from 'react';

const RegistroUser: React.FC = () => {
    return (
        <div>
            <h1>Registro de Usuario</h1>
            <form>
                <input type="text" placeholder="Nombre" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Contraseña" />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default RegistroUser;