function FormInventario() {
  return (
    <div>
      <h1>Inventario</h1>
      <button onClick={() => window.location.href = '/ManejoInventario'}>Volver al Inventario</button>
      <button onClick={() => window.location.href = '/AdminDashboard'}>Dashboard</button>
    </div>
  );
}

export default FormInventario;