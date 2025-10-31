import { useState, useEffect } from 'react'

// Hook personalizado para manejar localStorage con debounce
export function useLocalStorage() {
  const [guardadoReciente, setGuardadoReciente] = useState(false)
  const [datosRestaurados, setDatosRestaurados] = useState(false)

  // Función para guardar datos en localStorage
  const guardarDatos = (datos) => {
    try {
      const datosConTimestamp = {
        ...datos,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('altar-de-palabras', JSON.stringify(datosConTimestamp))
      
      // Mostrar indicador de guardado
      setGuardadoReciente(true)
      setTimeout(() => setGuardadoReciente(false), 2000)
    } catch (error) {
      console.error('Error al guardar en localStorage:', error)
    }
  }

  // Función para cargar datos desde localStorage
  const cargarDatos = () => {
    try {
      const datosGuardados = localStorage.getItem('altar-de-palabras')
      if (datosGuardados) {
        const datos = JSON.parse(datosGuardados)
        setDatosRestaurados(true)
        setTimeout(() => setDatosRestaurados(false), 3000)
        return datos
      }
    } catch (error) {
      console.error('Error al cargar desde localStorage:', error)
    }
    return null
  }

  // Función para limpiar localStorage
  const limpiarDatos = () => {
    try {
      localStorage.removeItem('altar-de-palabras')
    } catch (error) {
      console.error('Error al limpiar localStorage:', error)
    }
  }

  return {
    guardarDatos,
    cargarDatos,
    limpiarDatos,
    guardadoReciente,
    datosRestaurados
  }
}

// Hook para debounce
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}