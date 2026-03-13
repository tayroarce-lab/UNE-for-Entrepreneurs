import React from 'react'

function Notificaciones() {
  return (
    <div>
        <h1>Notificaciones</h1>
        <button onClick={() => window.location.href = "./Configuraciones"}>Volver</button>
        <button onClick={() => window.location.href = "./AdminDashboard"}>Dashboard</button>
    </div>
  )
}

export default Notificaciones