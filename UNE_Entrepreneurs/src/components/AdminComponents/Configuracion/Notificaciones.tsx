import { useState } from 'react'
import '../../../styles/Notificaciones.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import {
  Bell,
  ArrowLeft,
  LayoutDashboard,
  CheckCheck,
  Trash2,
  Eye,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings2,
  Inbox,
  SlidersHorizontal,
  Filter
} from 'lucide-react'

// ── Tipos ──────────────────────────────────────────────
type TipoNotificacion = 'info' | 'warning' | 'success' | 'error' | 'system'

interface Notificacion {
  id: number
  titulo: string
  mensaje: string
  tipo: TipoNotificacion
  leida: boolean
  fecha: string
}

interface PreferenciaNotificacion {
  id: TipoNotificacion
  nombre: string
  descripcion: string
  activa: boolean
}



// ── Helpers ────────────────────────────────────────────
const iconoPorTipo = (tipo: TipoNotificacion) => {
  switch (tipo) {
    case 'info': return <Info size={18} />
    case 'warning': return <AlertTriangle size={18} />
    case 'success': return <CheckCircle size={18} />
    case 'error': return <XCircle size={18} />
    case 'system': return <Settings2 size={18} />
  }
}

const etiquetaPorTipo = (tipo: TipoNotificacion): string => {
  switch (tipo) {
    case 'info': return 'Informativa'
    case 'warning': return 'Advertencia'
    case 'success': return 'Éxito'
    case 'error': return 'Error'
    case 'system': return 'Sistema'
  }
}

const formatearFecha = (fecha: string): string => {
  const date = new Date(fecha)
  const ahora = new Date()
  const diffMs = ahora.getTime() - date.getTime()
  const diffHoras = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffHoras < 1) return 'Hace unos minutos'
  if (diffHoras < 24) return `Hace ${diffHoras} hora${diffHoras > 1 ? 's' : ''}`
  if (diffDias < 7) return `Hace ${diffDias} día${diffDias > 1 ? 's' : ''}`
  return date.toLocaleDateString('es-CR', { day: '2-digit', month: 'short', year: 'numeric' })
}

// ── Componente principal ──────────────────────────────
function Notificaciones() {
  const [tab, setTab] = useState<'centro' | 'preferencias'>('centro')
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])
  const [preferencias, setPreferencias] = useState<PreferenciaNotificacion[]>([])
  const [filtroTipo, setFiltroTipo] = useState<TipoNotificacion | 'todas'>('todas')
  const [filtroEstado, setFiltroEstado] = useState<'todas' | 'leidas' | 'no-leidas'>('todas')

  // Contadores
  const noLeidas = notificaciones.filter(n => !n.leida).length

  // Filtrar notificaciones
  const notificacionesFiltradas = notificaciones.filter(n => {
    const pasaTipo = filtroTipo === 'todas' || n.tipo === filtroTipo
    const pasaEstado =
      filtroEstado === 'todas' ||
      (filtroEstado === 'leidas' && n.leida) ||
      (filtroEstado === 'no-leidas' && !n.leida)
    return pasaTipo && pasaEstado
  })

  // ── Acciones ──
  const marcarComoLeida = (id: number) => {
    setNotificaciones(prev =>
      prev.map(n => n.id === id ? { ...n, leida: true } : n)
    )
    toast.success('Notificación marcada como leída')
  }

  const marcarTodasComoLeidas = () => {
    if (noLeidas === 0) {
      toast.info('No hay notificaciones sin leer')
      return
    }
    Swal.fire({
      title: '¿Marcar todas como leídas?',
      text: `Se marcarán ${noLeidas} notificación(es) como leídas`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#59233A',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, marcar todas',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })))
        toast.success('Todas las notificaciones marcadas como leídas')
      }
    })
  }

  const eliminarNotificacion = (id: number) => {
    Swal.fire({
      title: '¿Eliminar notificación?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setNotificaciones(prev => prev.filter(n => n.id !== id))
        toast.success('Notificación eliminada')
      }
    })
  }

  const eliminarTodas = () => {
    if (notificaciones.length === 0) {
      toast.info('No hay notificaciones para eliminar')
      return
    }
    Swal.fire({
      title: '¿Eliminar todas las notificaciones?',
      text: 'Se eliminarán todas las notificaciones. Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar todas',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setNotificaciones([])
        toast.success('Todas las notificaciones eliminadas')
      }
    })
  }

  const togglePreferencia = (id: TipoNotificacion) => {
    setPreferencias(prev =>
      prev.map(p => p.id === id ? { ...p, activa: !p.activa } : p)
    )
    const pref = preferencias.find(p => p.id === id)
    if (pref) {
      toast.success(`Notificaciones de "${pref.nombre}" ${pref.activa ? 'desactivadas' : 'activadas'}`)
    }
  }

  return (
    <div className="admin-container admin-container-no-nav">
      <div className="admin-main-wrap">
        {/* Header */}
        <header>
          <h1><Bell size={24} /> Notificaciones</h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => window.location.href = "/Configuraciones"}>
              <ArrowLeft size={16} /> Volver
            </button>
            <button onClick={() => window.location.href = "/AdminDashboard"}>
              <LayoutDashboard size={16} /> Dashboard
            </button>
          </div>
        </header>

        <section>
          {/* Tabs */}
          <div className="notif-tabs">
            <button
              className={tab === 'centro' ? 'active' : ''}
              onClick={() => setTab('centro')}
            >
              <Inbox size={16} /> Centro de Notificaciones
              {noLeidas > 0 && <span className="notif-badge">{noLeidas}</span>}
            </button>
            <button
              className={tab === 'preferencias' ? 'active' : ''}
              onClick={() => setTab('preferencias')}
            >
              <SlidersHorizontal size={16} /> Preferencias
            </button>
          </div>

          {/* ── Tab: Centro de notificaciones ── */}
          {tab === 'centro' && (
            <>
              {/* Barra de acciones y filtros */}
              <div className="notif-actions-bar">
                <div className="notif-filter-group">
                  <Filter size={14} style={{ color: '#9ca3af' }} />
                  <select
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value as TipoNotificacion | 'todas')}
                  >
                    <option value="todas">Todos los tipos</option>
                    <option value="info">Informativas</option>
                    <option value="warning">Advertencias</option>
                    <option value="success">Éxito</option>
                    <option value="error">Errores</option>
                    <option value="system">Sistema</option>
                  </select>
                  <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value as 'todas' | 'leidas' | 'no-leidas')}
                  >
                    <option value="todas">Todas</option>
                    <option value="no-leidas">No leídas</option>
                    <option value="leidas">Leídas</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={marcarTodasComoLeidas}>
                    <CheckCheck size={14} /> Marcar todas como leídas
                  </button>
                  <button onClick={eliminarTodas} style={{ backgroundColor: '#dc2626' }}>
                    <Trash2 size={14} /> Limpiar todo
                  </button>
                </div>
              </div>

              {/* Lista de notificaciones */}
              <div className="notif-list">
                {notificacionesFiltradas.length === 0 ? (
                  <div className="notif-empty">
                    <div className="notif-empty-icon">
                      <Inbox size={32} />
                    </div>
                    <h3>Sin notificaciones</h3>
                    <p>No hay notificaciones que coincidan con los filtros seleccionados.</p>
                  </div>
                ) : (
                  notificacionesFiltradas.map((notif) => (
                    <div
                      key={notif.id}
                      className={`notif-item ${notif.leida ? 'read' : 'unread'}`}
                    >
                      <div className={`notif-icon ${notif.tipo}`}>
                        {iconoPorTipo(notif.tipo)}
                      </div>
                      <div className="notif-content">
                        <h4>{notif.titulo}</h4>
                        <p>{notif.mensaje}</p>
                        <div className="notif-meta">
                          <span className="notif-type-label">{etiquetaPorTipo(notif.tipo)}</span>
                          <span>{formatearFecha(notif.fecha)}</span>
                        </div>
                      </div>
                      <div className="notif-item-actions">
                        {!notif.leida && (
                          <button
                            title="Marcar como leída"
                            onClick={() => marcarComoLeida(notif.id)}
                          >
                            <Eye size={16} />
                          </button>
                        )}
                        <button
                          className="delete-btn"
                          title="Eliminar"
                          onClick={() => eliminarNotificacion(notif.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* ── Tab: Preferencias ── */}
          {tab === 'preferencias' && (
            <div className="notif-prefs">
              <article style={{ marginBottom: '8px' }}>
                <h2><SlidersHorizontal size={20} /> Preferencias de Notificaciones</h2>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '4px' }}>
                  Active o desactive los tipos de notificaciones que desea recibir en el sistema.
                </p>
              </article>

              {preferencias.map((pref) => (
                <div key={pref.id} className="notif-prefs-card">
                  <div className="notif-prefs-info">
                    <div className={`notif-icon ${pref.id}`}>
                      {iconoPorTipo(pref.id)}
                    </div>
                    <div className="notif-prefs-text">
                      <h4>{pref.nombre}</h4>
                      <p>{pref.descripcion}</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={pref.activa}
                      onChange={() => togglePreferencia(pref.id)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer>
          <p>Gestione sus notificaciones y preferencias desde este panel.</p>
          <p>Copyright © 2026</p>
        </footer>
      </div>
    </div>
  )
}

export default Notificaciones