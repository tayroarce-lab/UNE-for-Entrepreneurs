import React from 'react'

function routing() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/ManejarUsuarios" element={<ManejarUsuarios />} />
            <Route path="/ManejarClientes" element={<ManejarClientes />} />
            <Route path="/ManejoPresupuesto" element={<ManejoPresupuesto />} />
            <Route path="/ManejoInventario" element={<ManejoInventario />} />
            <Route path="/ManejoFinanciaciones" element={<ManejoFinanciaciones />} />
            <Route path="/GestionTipsNoticias" element={<GestionTipsNoticias />} />
            <Route path="/Configuraciones" element={<Configuraciones />} />
        </Routes>
    </div>
  )
}

export default routing