import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Formulario from '../components/Formulario'
import VisualizadorCalaverita from '../components/VisualizadorCalaverita'
import HistorialCalaveritas from '../components/HistorialCalaveritas'
import ModalAltar from '../components/ModalAltar'
import Footer from '../components/Footer'
import { useLocalStorage, useDebounce } from '../hooks/useLocalStorage'
import { useHistorialCalaveritas } from '../hooks/useHistorialCalaveritas'

function CrearCalaverita() {
  const navigate = useNavigate()
  const [calaveritaActual, setCalaveritaActual] = useState('')
  const [nombrePersona, setNombrePersona] = useState('')
  const [ocupacion, setOcupacion] = useState('')
  const [tono, setTono] = useState('chistosa')
  const [mostrarAltar, setMostrarAltar] = useState(false)
  const [notificacionTemporal, setNotificacionTemporal] = useState('')

  const { guardarDatos, cargarDatos } = useLocalStorage()
  const { historial, agregarAlHistorial, eliminarDelHistorial, limpiarHistorial } = useHistorialCalaveritas()

  // Debounce para los inputs de texto
  const nombreDebounced = useDebounce(nombrePersona, 500)
  const ocupacionDebounced = useDebounce(ocupacion, 500)

  // Cargar datos al iniciar la aplicación
  useEffect(() => {
    const datosGuardados = cargarDatos()
    if (datosGuardados) {
      setCalaveritaActual(datosGuardados.ultimaCalaverita || '')
      setNombrePersona(datosGuardados.nombreIngresado || '')
      setOcupacion(datosGuardados.ocupacionIngresada || '')
      setTono(datosGuardados.tonoSeleccionado || 'chistosa')
    }
  }, [])

  // Guardar datos cuando cambien (con debounce para inputs)
  useEffect(() => {
    if (nombreDebounced || ocupacionDebounced || calaveritaActual || tono !== 'chistosa') {
      const datosParaGuardar = {
        ultimaCalaverita: calaveritaActual,
        nombreIngresado: nombrePersona,
        ocupacionIngresada: ocupacion,
        tonoSeleccionado: tono
      }
      guardarDatos(datosParaGuardar)
    }
  }, [nombreDebounced, ocupacionDebounced, calaveritaActual, tono])

  const mostrarNotificacionTemporal = (mensaje) => {
    setNotificacionTemporal(mensaje)
    setTimeout(() => setNotificacionTemporal(''), 3000)
  }

  const handleNuevaCalaverita = (nuevaCalaverita) => {
    setCalaveritaActual(nuevaCalaverita)
    // Agregar al historial cuando se genera una nueva calaverita
    agregarAlHistorial(nuevaCalaverita, nombrePersona, ocupacion, tono)
  }

  const restaurarCalaverita = (calaveritaHistorial) => {
    setCalaveritaActual(calaveritaHistorial.texto)
    setNombrePersona(calaveritaHistorial.nombre)
    setOcupacion(calaveritaHistorial.ocupacion)
    setTono(calaveritaHistorial.tono)
    // Scroll hacia arriba para ver la calaverita restaurada
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const copiarTexto = () => {
    mostrarNotificacionTemporal('📋 Texto copiado al portapapeles')
  }

  const agregarAlAltar = () => {
    setMostrarAltar(true)
    mostrarNotificacionTemporal('🎨 Abriendo altar interactivo...')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a' }}>
      {/* Header con navegación */}
      <header style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #1e1b4b, #581c87, #92400e)',
        borderBottom: '3px solid #d97706',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            background: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = '#4b5563'}
          onMouseLeave={(e) => e.target.style.background = '#6b7280'}
        >
          ← Volver al Inicio
        </button>
        
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#f59e0b',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          fontFamily: 'Creepster, cursive',
          margin: '0'
        }}>
          ✍️ Crear Mi Calaverita Literaria
        </h1>
        
        <button
          onClick={() => navigate('/historia')}
          style={{
            padding: '10px 20px',
            background: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = '#6d28d9'}
          onMouseLeave={(e) => e.target.style.background = '#7c3aed'}
        >
          📚 Aprender Más
        </button>
      </header>

      {/* Main Content */}
      <main style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Sección Formulario + Calaverita (2 columnas) */}
          <section style={{
            display: 'grid',
            gridTemplateColumns: '2fr 3fr',
            gap: '40px',
            marginBottom: '60px'
          }}
          className="responsive-grid">
            
            {/* Columna Izquierda - Formulario */}
            <div>
              <Formulario 
                onCalaveritaGenerada={handleNuevaCalaverita}
                onNombreChange={setNombrePersona}
                onOcupacionChange={setOcupacion}
                onTonoChange={setTono}
                nombre={nombrePersona}
                ocupacion={ocupacion}
                tono={tono}
              />
            </div>

            {/* Columna Derecha - Calaverita */}
            <div>
              <VisualizadorCalaverita
                calaverita={calaveritaActual}
                nombrePersona={nombrePersona}
                onCopiarTexto={copiarTexto}
                onAgregarAlAltar={agregarAlAltar}
              />
            </div>
          </section>

          {/* Sección Altar Interactivo (Botón) */}
          <section style={{
            textAlign: 'center',
            marginBottom: '60px',
            padding: '40px',
            background: 'linear-gradient(135deg, #374151, #4b5563)',
            borderRadius: '16px',
            border: '2px solid #d97706'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏛️</div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#fbbf24',
                marginBottom: '12px'
              }}>
                Altar Interactivo de Ofrendas
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#d1d5db',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Crea un altar personalizado arrastrando elementos tradicionales, 
                subiendo fotos de tus seres queridos y diseñando una ofrenda única.
              </p>
            </div>

            <button
              onClick={() => setMostrarAltar(true)}
              style={{
                padding: '16px 32px',
                fontSize: '20px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                margin: '0 auto'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px) scale(1.05)';
                e.target.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
              }}
            >
              🎨 Crear Mi Altar Interactivo
            </button>
          </section>

          {/* Sección Historial */}
          <HistorialCalaveritas
            historial={historial}
            onRestaurarCalaverita={restaurarCalaverita}
            onEliminarCalaverita={eliminarDelHistorial}
            onLimpiarHistorial={limpiarHistorial}
            onMostrarNotificacion={mostrarNotificacionTemporal}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal del Altar Interactivo */}
      <ModalAltar
        isOpen={mostrarAltar}
        onClose={() => setMostrarAltar(false)}
      />

      {/* Notificación temporal */}
      {notificacionTemporal && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#059669',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          zIndex: '1001',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {notificacionTemporal}
        </div>
      )}
    </div>
  )
}

export default CrearCalaverita