import { useState, useEffect } from 'react'

export function useHistorialCalaveritas() {
  const [historial, setHistorial] = useState([])

  // Cargar historial desde localStorage al inicializar
  useEffect(() => {
    cargarHistorial()
  }, [])

  const cargarHistorial = () => {
    try {
      const historialGuardado = localStorage.getItem('historialCalaveritas')
      if (historialGuardado) {
        const historialParsed = JSON.parse(historialGuardado)
        setHistorial(historialParsed)
      }
    } catch (error) {
      console.error('Error al cargar historial:', error)
      setHistorial([])
    }
  }

  const guardarHistorial = (nuevoHistorial) => {
    try {
      localStorage.setItem('historialCalaveritas', JSON.stringify(nuevoHistorial))
      setHistorial(nuevoHistorial)
    } catch (error) {
      console.error('Error al guardar historial:', error)
    }
  }

  const agregarAlHistorial = (calaverita, nombre, ocupacion, tono) => {
    const nuevaEntrada = {
      id: Date.now(),
      texto: calaverita,
      nombre: nombre,
      ocupacion: ocupacion || '',
      tono: tono,
      fecha: new Date().toISOString()
    }

    // Crear nuevo historial con la nueva entrada al inicio
    const nuevoHistorial = [nuevaEntrada, ...historial]

    // Mantener solo las últimas 3 calaveritas (FIFO)
    const historialLimitado = nuevoHistorial.slice(0, 3)

    guardarHistorial(historialLimitado)
  }

  const eliminarDelHistorial = (id) => {
    const historialFiltrado = historial.filter(item => item.id !== id)
    guardarHistorial(historialFiltrado)
  }

  const limpiarHistorial = () => {
    try {
      localStorage.removeItem('historialCalaveritas')
      setHistorial([])
    } catch (error) {
      console.error('Error al limpiar historial:', error)
    }
  }

  return {
    historial,
    agregarAlHistorial,
    eliminarDelHistorial,
    limpiarHistorial,
    cargarHistorial
  }
}