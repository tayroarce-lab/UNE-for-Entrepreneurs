import React, { useState, useEffect } from 'react'
import '../../styles/AdminDashboard.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { Quote, Send, Edit, Trash2, X, Image as ImageIcon, Loader, Eye, EyeOff, Search, MapPin, Briefcase } from 'lucide-react'
import { getCasosExito, createCasoExito, updateCasoExito, deleteCasoExito } from '../../services/CasosExitoService'
import type { CasoExito } from '../../services/CasosExitoService'
import AdminLayout from './AdminLayout'
import AdminHeader from './AdminHeader'

function GestionCasosExito() {
  const [casos, setCasos] = useState<CasoExito[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [nombreInput, setNombreInput] = useState('');
  const [profesionInput, setProfesionInput] = useState('');
  const [ubicacionInput, setUbicacionInput] = useState('');
  const [citaInput, setCitaInput] = useState('');
  const [imagenInput, setImagenInput] = useState('');
  const [colorTagInput, setColorTagInput] = useState('#60a5fa');
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const filteredCasos = casos.filter(c =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.profesion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    cargarCasos();
  }, []);

  const cargarCasos = async () => {
    setLoading(true);
    try {
      const data = await getCasosExito();
      setCasos(data || []);
    } catch (error) {
      console.error('Error al cargar casos de éxito:', error);
      toast.error('Error al cargar casos de éxito');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setImagenInput(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const clearInputs = () => {
      setNombreInput('');
      setProfesionInput('');
      setUbicacionInput('');
      setCitaInput('');
      setImagenInput('');
      setColorTagInput('#60a5fa');
      const fileInput = document.getElementById('imagen-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
  };

  const handleGuardar = async () => {
    if (!nombreInput.trim() || !citaInput.trim()) {
        toast.error('El nombre y la cita son requeridos');
        return;
    }

    const data: Omit<CasoExito, 'id'> = {
        nombre: nombreInput,
        profesion: profesionInput,
        ubicacion: ubicacionInput,
        cita: citaInput,
        imagen: imagenInput,
        colorTag: colorTagInput,
        activo: true,
        fecha: new Date().toISOString()
    };

    if (editandoId) {
      Swal.fire({
        title: '¿Guardar cambios?',
        text: "Se actualizará este caso de éxito",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#8B1A1A',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateCasoExito(editandoId, data);
            setEditandoId(null);
            clearInputs();
            toast.success('Caso de éxito actualizado');
            await cargarCasos();
          } catch {
            toast.error('Error al guardar cambios');
          }
        }
      });
    } else {
      Swal.fire({
        title: '¿Registrar nuevo caso?',
        text: "Se añadirá a la galería de Nuestra Gente",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#8B1A1A',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, registrar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await createCasoExito(data);
            clearInputs();
            toast.success('Caso de éxito registrado con éxito');
            await cargarCasos();
          } catch {
            toast.error('Error al registrar caso');
          }
        }
      });
    }
  };

  const handleEditar = (caso: CasoExito) => {
      setEditandoId(caso.id);
      setNombreInput(caso.nombre);
      setProfesionInput(caso.profesion);
      setUbicacionInput(caso.ubicacion);
      setCitaInput(caso.cita);
      setImagenInput(caso.imagen);
      setColorTagInput(caso.colorTag);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelarEdicion = () => {
      setEditandoId(null);
      clearInputs();
  };

  const handleEliminar = (id: string) => {
    Swal.fire({
      title: '¿Eliminar caso de éxito?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCasoExito(id);
          if (editandoId === id) handleCancelarEdicion();
          toast.success('Caso de éxito eliminado');
          await cargarCasos();
        } catch {
          toast.error('Error al eliminar');
        }
      }
    });
  };

  const handleToggleActivo = async (caso: CasoExito) => {
    try {
      await updateCasoExito(caso.id, { activo: !caso.activo });
      toast.success(caso.activo ? 'Caso ocultado' : 'Caso visible');
      await cargarCasos();
    } catch {
      toast.error('Error al cambiar estado');
    }
  };

  return (
    <AdminLayout>
        <AdminHeader 
            placeholder="Buscar por nombre, profesión o ubicación..." 
            onSearch={(val) => setSearchTerm(val)}
        />

        <main style={{ padding: 0 }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#3A0D23', marginBottom: '4px' }}>Nuestra Gente - Casos de Éxito</h1>
          <p style={{ color: '#64748B', fontSize: '1.1rem' }}>Gestiona las historias de éxito que se muestran en la sección pública de "Nuestra Gente".</p>
        </div>
            <div className="grid-card" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {editandoId ? <Edit size={24} color="#f59e0b" /> : <Quote size={24} color="#8B1A1A" />} 
                    {editandoId ? 'Editar Caso de Éxito' : 'Nuevo Caso de Éxito'}
                </h3>
                
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                        <div className="search-bar-v2" style={{ width: '100%', maxWidth: '100%' }}>
                            <Edit size={18} className="search-icon-header" />
                            <input 
                                type="text" 
                                placeholder="Nombre completo..." 
                                value={nombreInput}
                                onChange={(e) => setNombreInput(e.target.value)}
                            />
                        </div>
                        <div className="search-bar-v2" style={{ width: '100%', maxWidth: '100%' }}>
                            <Briefcase size={18} className="search-icon-header" />
                            <input 
                                type="text" 
                                placeholder="Profesión (Ej: Artesana)..." 
                                value={profesionInput}
                                onChange={(e) => setProfesionInput(e.target.value)}
                            />
                        </div>
                        <div className="search-bar-v2" style={{ width: '100%', maxWidth: '100%' }}>
                            <MapPin size={18} className="search-icon-header" />
                            <input 
                                type="text" 
                                placeholder="Ubicación (Ej: Bagaces)..." 
                                value={ubicacionInput}
                                onChange={(e) => setUbicacionInput(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <textarea 
                        placeholder="La cita o testimonio inspirador..." 
                        rows={4} 
                        value={citaInput}
                        onChange={(e) => setCitaInput(e.target.value)}
                        style={{ width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '1rem', outline: 'none', transition: 'all 0.2s' }}
                    ></textarea>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ flex: 1, padding: '20px', border: '2px dashed #cbd5e1', borderRadius: '16px', background: '#f1f5f9' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800, color: '#475569', marginBottom: '15px', cursor: 'pointer' }}>
                                <ImageIcon size={20} /> Seleccionar Fotografía
                                <input 
                                    id="imagen-upload"
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                    style={{ display: 'none' }}
                                />
                            </label>
                            
                            {imagenInput && (
                                <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', border: `4px solid ${colorTagInput}` }}>
                                    <img src={imagenInput} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <button 
                                        onClick={() => { setImagenInput(''); const f = document.getElementById('imagen-upload') as HTMLInputElement; if(f) f.value = ''; }}
                                        style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div style={{ width: '200px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#475569' }}>Color Identificador</label>
                            <input 
                                type="color" 
                                value={colorTagInput} 
                                onChange={(e) => setColorTagInput(e.target.value)}
                                style={{ width: '100%', height: '50px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button 
                            className="btn-publish-v2" 
                            onClick={handleGuardar}
                            style={{ padding: '15px 35px' }}
                        >
                            <Send size={18} />
                            {editandoId ? 'Actualizar Caso' : 'Registrar Caso'}
                        </button>
                        {editandoId && (
                            <button 
                                onClick={handleCancelarEdicion}
                                style={{ padding: '12px 25px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <X size={18} /> Cancelar
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="grid-card-label" style={{ margin: 0 }}>
                        <h3 style={{ margin: 0, color: '#3A0D23', fontWeight: 800 }}>Listado de Casos de Éxito</h3>
                    </div>
                    {/* Buscador */}
                    <div style={{ position: 'relative', minWidth: '260px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Filtrar por nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ padding: '0.65rem 2.2rem 0.65rem 2.5rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', width: '100%', fontSize: '0.9rem', outline: 'none', background: '#f8fafc' }}
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                        <Loader className="animate-spin" size={32} style={{ marginBottom: '10px' }} />
                        <p>Cargando historias...</p>
                    </div>
                ) : (
                    <div className="admin-table-container">
                    <table className="admin-table-v2">
                        <thead>
                            <tr>
                                <th>PERSONA</th>
                                <th>PROFESIÓN</th>
                                <th>UBICACIÓN</th>
                                <th>TAG</th>
                                <th style={{ textAlign: 'center' }}>ESTADO</th>
                                <th style={{ textAlign: 'center' }}>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCasos.length === 0 ? (
                                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No se encontraron casos de éxito.</td></tr>
                            ) : filteredCasos.map((caso: CasoExito) => (
                                <tr key={caso.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            {caso.imagen ? (
                                                <img src={caso.imagen} alt={caso.nombre} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${caso.colorTag}` }} />
                                            ) : (
                                                <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: caso.colorTag, fontWeight: 800 }}>{caso.nombre.charAt(0)}</div>
                                            )}
                                            <div style={{ fontWeight: 800 }}>{caso.nombre}</div>
                                        </div>
                                    </td>
                                    <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{caso.profesion}</td>
                                    <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{caso.ubicacion}</td>
                                    <td>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: caso.colorTag }}></div>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span style={{ 
                                            padding: '4px 10px', 
                                            borderRadius: '50px', 
                                            fontSize: '0.7rem', 
                                            fontWeight: 700,
                                            background: caso.activo ? '#dcfce7' : '#f1f5f9',
                                            color: caso.activo ? '#166534' : '#64748b'
                                        }}>
                                            {caso.activo ? 'ACTIVO' : 'OCULTO'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                            <button 
                                                onClick={() => handleToggleActivo(caso)} 
                                                title={caso.activo ? 'Ocultar' : 'Mostrar'}
                                                style={{ background: caso.activo ? '#eff6ff' : '#fff7ed', color: caso.activo ? '#2563eb' : '#ea580c', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}
                                            >
                                                {caso.activo ? <Eye size={16} /> : <EyeOff size={16} />}
                                            </button>
                                            <button onClick={() => handleEditar(caso)} style={{ background: '#fef3c7', color: '#d97706', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}><Edit size={16} /></button>
                                            <button onClick={() => handleEliminar(caso.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                )}
            </div>
        </main>
    </AdminLayout>
  )
}

export default GestionCasosExito
