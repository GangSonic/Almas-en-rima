import { useState } from 'react'
import { generarCalaveritaConIA, generarCalaveritaFallback, validarConfiguracion } from '../services/iaService'

// Opciones predefinidas para los selectores
const rasgosPersonalidad = [
  { value: '', label: 'Ninguno', emoji: '' },
  { value: 'alegre', label: 'Alegre', emoji: '😊' },
  { value: 'trabajador', label: 'Trabajador', emoji: '💪' },
  { value: 'dormilon', label: 'Dormilón', emoji: '😴' },
  { value: 'comelon', label: 'Comelón', emoji: '🍽️' },
  { value: 'fiestero', label: 'Fiestero', emoji: '🎉' },
  { value: 'bailador', label: 'Bailador', emoji: '💃' },
  { value: 'chismoso', label: 'Chismoso', emoji: '🗣️' },
  { value: 'despistado', label: 'Despistado', emoji: '🤔' },
  { value: 'chistoso', label: 'Chistoso', emoji: '😂' },
  { value: 'serio', label: 'Serio', emoji: '😐' },
  { value: 'soñador', label: 'Soñador', emoji: '💭' },
  { value: 'aventurero', label: 'Aventurero', emoji: '🗺️' },
  { value: 'miedoso', label: 'Miedoso', emoji: '😨' },
  { value: 'valiente', label: 'Valiente', emoji: '🦸' },
  { value: 'flojo', label: 'Flojo', emoji: '🛋️' }
]

const ocupaciones = [
  { value: '', label: 'Ninguna', emoji: '' },
  { value: 'estudiante', label: 'Estudiante', emoji: '📚' },
  { value: 'maestro', label: 'Maestro/a', emoji: '👩‍🏫' },
  { value: 'doctor', label: 'Doctor/a', emoji: '👩‍⚕️' },
  { value: 'ingeniero', label: 'Ingeniero/a', emoji: '👩‍💻' },
  { value: 'cocinero', label: 'Cocinero/a', emoji: '👩‍🍳' },
  { value: 'musico', label: 'Músico/a', emoji: '🎵' },
  { value: 'artista', label: 'Artista', emoji: '🎨' },
  { value: 'deportista', label: 'Deportista', emoji: '⚽' },
  { value: 'escritor', label: 'Escritor/a', emoji: '✍️' },
  { value: 'policia', label: 'Policía', emoji: '👮' },
  { value: 'bombero', label: 'Bombero/a', emoji: '🚒' },
  { value: 'panadero', label: 'Panadero/a', emoji: '🍞' },
  { value: 'mecanico', label: 'Mecánico/a', emoji: '🔧' },
  { value: 'agricultor', label: 'Agricultor/a', emoji: '🌾' },
  { value: 'conductor', label: 'Conductor/a', emoji: '🚗' },
  { value: 'comerciante', label: 'Comerciante', emoji: '🏪' },
  { value: 'abogado', label: 'Abogado/a', emoji: '⚖️' }
]

function Formulario({
  onCalaveritaGenerada,
  onNombreChange,
  onOcupacionChange,
  onTonoChange,
  nombre,
  ocupacion,
  tono
}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [ultimaCalaverita, setUltimaCalaverita] = useState('')
  const [errorIA, setErrorIA] = useState(false)
  const [errorNombre, setErrorNombre] = useState('')
  const [rasgoSeleccionado, setRasgoSeleccionado] = useState('')
  const [ocupacionSeleccionada, setOcupacionSeleccionada] = useState('')

  // Validación de nombre (solo letras, espacios y caracteres españoles)
  const validarNombre = (texto) => {
    const regex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/
    return regex.test(texto)
  }

  const generarNuevaCalaverita = async () => {
    if (!nombre.trim()) {
      alert('Por favor ingresa un nombre')
      return
    }

    if (!validarNombre(nombre.trim())) {
      setErrorNombre('El nombre solo puede contener letras y espacios')
      return
    }

    if (nombre.trim().length > 30) {
      setErrorNombre('El nombre no puede tener más de 30 caracteres')
      return
    }

    setIsGenerating(true)
    setErrorIA(false)
    setErrorNombre('')

    try {
      console.log('🎭 Generando calaverita para:', nombre, rasgoSeleccionado, ocupacionSeleccionada, tono)
      
      // Combinar rasgo + ocupación para enviar a la IA
      const caracteristicas = [rasgoSeleccionado, ocupacionSeleccionada]
        .filter(item => item && item.trim())
        .join(', ')
      
      // Intentar generar con IA
      const resultado = await generarCalaveritaConIA(
        nombre.trim(),
        caracteristicas,
        tono
      )

      if (resultado.success) {
        // ✅ Usar la calaverita generada por IA
        setUltimaCalaverita(resultado.calaverita)
        onCalaveritaGenerada(resultado.calaverita)
        onNombreChange(nombre.trim())
        console.log('✨ Calaverita única generada por IA')
      } else {
        // ⚠️ Usar fallback si hay error
        const fallback = generarCalaveritaFallback(nombre.trim(), caracteristicas, tono)
        setUltimaCalaverita(fallback)
        onCalaveritaGenerada(fallback)
        onNombreChange(nombre.trim())
        setErrorIA(true)
        console.warn('Usando calaverita de respaldo')
      }

      // Efecto de sonido opcional (campana pequeña)
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT')
        audio.volume = 0.1
        audio.play().catch(() => { }) // Ignorar errores de audio
      } catch (e) {
        // Ignorar errores de audio
      }

    } catch (error) {
      // 🔥 Si todo falla, usar plantilla
      console.error('Error completo:', error)
      const caracteristicas = [rasgoSeleccionado, ocupacionSeleccionada]
        .filter(item => item && item.trim())
        .join(', ')
      const fallback = generarCalaveritaFallback(nombre.trim(), caracteristicas, tono)
      setUltimaCalaverita(fallback)
      onCalaveritaGenerada(fallback)
      onNombreChange(nombre.trim())
      setErrorIA(true)
    }

    setIsGenerating(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    generarNuevaCalaverita()
  }

  const handleRegenerar = () => {
    generarNuevaCalaverita()
  }

  const handleInputChange = (e) => {
    const valor = e.target.value
    
    // Validar en tiempo real
    if (valor.length > 30) {
      setErrorNombre('Máximo 30 caracteres')
      return
    }
    
    if (valor && !validarNombre(valor)) {
      setErrorNombre('Solo se permiten letras y espacios')
      return
    }
    
    setErrorNombre('')
    onNombreChange(valor)
  }

  const handleRasgoChange = (e) => {
    setRasgoSeleccionado(e.target.value)
  }

  const handleOcupacionChange = (e) => {
    setOcupacionSeleccionada(e.target.value)
  }

  const handleTonoChangeLocal = (e) => {
    onTonoChange(e.target.value)
  }

  const limpiarFormulario = () => {
    onNombreChange('')
    setRasgoSeleccionado('')
    setOcupacionSeleccionada('')
    onTonoChange('chistosa')
    setErrorNombre('')
    setErrorIA(false)
    setUltimaCalaverita('')
  }

  return (
    <div className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-purple-700/30 shadow-xl">
      <h2 className="text-2xl md:text-3xl text-yellow-400 mb-6 text-center" style={{ fontFamily: 'Creepster, cursive' }}>
        Crear Calaverita
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Nombre con validación */}
        <div>
          <label
            htmlFor="nombre"
            className="block text-gray-200 text-lg mb-3 font-medium"
          >
            ¿Para quién es la calaverita?
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleInputChange}
            placeholder="Ej: Juan, María, Pedro"
            maxLength={30}
            className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
              errorNombre 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-orange-500/30 focus:border-orange-500 focus:ring-orange-500/20'
            }`}
            disabled={isGenerating}
          />
          {errorNombre && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
              <span>⚠️</span>
              <span>{errorNombre}</span>
            </p>
          )}
          <p className="text-gray-400 text-xs mt-1">
            {nombre.length}/30 caracteres • Solo letras y espacios
          </p>
        </div>

        {/* Selector de Rasgo de Personalidad */}
        <div>
          <label
            htmlFor="rasgo"
            className="block text-gray-200 text-base mb-2 font-medium"
          >
            La mayoría de veces estoy... (opcional)
          </label>
          <select
            id="rasgo"
            value={rasgoSeleccionado}
            onChange={handleRasgoChange}
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border-2 border-purple-500/30 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            disabled={isGenerating}
          >
            {rasgosPersonalidad.map((rasgo) => (
              <option key={rasgo.value} value={rasgo.value} className="bg-slate-800">
                {rasgo.emoji} {rasgo.label}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de Ocupación */}
        <div>
          <label
            htmlFor="ocupacion-select"
            className="block text-gray-200 text-base mb-2 font-medium"
          >
            Ocupación (opcional)
          </label>
          <select
            id="ocupacion-select"
            value={ocupacionSeleccionada}
            onChange={handleOcupacionChange}
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border-2 border-purple-500/30 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            disabled={isGenerating}
          >
            {ocupaciones.map((ocupacion) => (
              <option key={ocupacion.value} value={ocupacion.value} className="bg-slate-800">
                {ocupacion.emoji} {ocupacion.label}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de Tono */}
        <div>
          <label className="block text-gray-200 text-base mb-3 font-medium">
            Tono de la calaverita
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-slate-800/30 p-2 rounded-lg transition-colors">
              <input
                type="radio"
                name="tono"
                value="chistosa"
                checked={tono === 'chistosa'}
                onChange={handleTonoChangeLocal}
                className="text-orange-500 focus:ring-orange-500"
                disabled={isGenerating}
              />
              <span className="text-gray-200">😄 Chistosa (tradicional)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-slate-800/30 p-2 rounded-lg transition-colors">
              <input
                type="radio"
                name="tono"
                value="respetuosa"
                checked={tono === 'respetuosa'}
                onChange={handleTonoChangeLocal}
                className="text-orange-500 focus:ring-orange-500"
                disabled={isGenerating}
              />
              <span className="text-gray-200">🙏 Respetuosa</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-slate-800/30 p-2 rounded-lg transition-colors">
              <input
                type="radio"
                name="tono"
                value="satirica"
                checked={tono === 'satirica'}
                onChange={handleTonoChangeLocal}
                className="text-orange-500 focus:ring-orange-500"
                disabled={isGenerating}
              />
              <span className="text-gray-200">😈 Satírica</span>
            </label>
          </div>
        </div>

        {/* Botones principales */}
        <div className="space-y-3">
          <button
            type="submit"
            disabled={!nombre.trim() || isGenerating || errorNombre}
            className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
              isGenerating 
                ? 'bg-gray-600 cursor-wait' 
                : 'bg-gradient-to-r from-orange-500 to-yellow-400 text-slate-900 hover:scale-105 hover:shadow-xl'
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-3">
                <span className="animate-spin text-2xl">💀</span>
                <span className="text-white">La Catrina está escribiendo...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>✍️</span>
                <span>Crear Calaverita</span>
              </span>
            )}
          </button>

          {/* Botón Regenerar */}
          {ultimaCalaverita && (
            <button
              type="button"
              onClick={handleRegenerar}
              disabled={!nombre.trim() || isGenerating || errorNombre}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold py-3 px-6 rounded-lg text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-purple-700 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Regenerando...
                </span>
              ) : (
                <>🎲 Regenerar Calaverita</>
              )}
            </button>
          )}

          {/* Botón Limpiar Formulario */}
          <button
            type="button"
            onClick={limpiarFormulario}
            disabled={isGenerating}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🧹 Limpiar Formulario
          </button>
        </div>
      </form>

      {/* Indicador de estado de IA */}
      {errorIA && (
        <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-600/50 rounded-lg">
          <p className="text-yellow-400 text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>Usando calaverita de respaldo (IA no disponible)</span>
          </p>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-gray-300 text-sm">
          {validarConfiguracion() 
            ? '🤖 Calaveritas únicas generadas con IA • Tradición mexicana auténtica'
            : '📝 Calaveritas tradicionales • Múltiples variaciones disponibles'
          }
        </p>
        <p className="text-green-400 text-xs mt-2">
          ✨ Formulario seguro con opciones predefinidas
        </p>
      </div>
    </div>
  )
}

export default Formulario