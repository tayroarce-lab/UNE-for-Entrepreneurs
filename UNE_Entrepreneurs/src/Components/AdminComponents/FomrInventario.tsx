function FormInventario() {
    return (
    <div>
        <h1>Inventario</h1>
        <button onClick={() => window.location.href = "./Configuraciones"}>Volver</button>
        <button onClick={() => window.location.href = "./AdminDashboard"}>Dashboard</button>
    </div>
  )
}