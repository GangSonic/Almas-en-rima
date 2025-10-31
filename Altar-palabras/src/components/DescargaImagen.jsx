import { useState } from 'react'
import { toPng } from 'html-to-image'

function DescargaImagen({ nombrePersona }) {
  const [generandoImagen, setGenerandoImagen] = useState(false)

  const handleDescargarAltar = async () => {
    setGenerandoImagen(true)
    
    try {
      console.log('Iniciando descarga de imagen con html-to-image...')
      
      // Buscar el contenedor principal del altar y calaverita
      const elemento = document.getElementById('altar-completo')
      
      if (!elemento) {
        console.error('No se encontró el elemento del altar')
        alert('No se pudo encontrar el altar para capturar. Por favor, recarga la página.')
        return
      }

      console.log('Elemento encontrado, iniciando captura...')
      
      // Generar la imagen usando html-to-image
      const dataUrl = await toPng(elemento, {
        backgroundColor: '#1A1A2E',
        pixelRatio: 2,
        quality: 0.95,
        cacheBust: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      })

      console.log('Imagen generada exitosamente')

      // Crear nombre de archivo personalizado
      const nombreArchivo = nombrePersona 
        ? `altar-de-palabras-${nombrePersona.replace(/\s+/g, '-').toLowerCase()}.png`
        : 'altar-de-palabras-mi-altar.png'

      // Crear enlace de descarga
      const link = document.createElement('a')
      link.download = nombreArchivo
      link.href = dataUrl
      
      // Simular click para descargar
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      console.log('Descarga completada exitosamente')

    } catch (error) {
      console.error('Error al generar la imagen:', error)
      alert('Error al generar la imagen. Por favor, inténtalo de nuevo.')
    } finally {
      setGenerandoImagen(false)
    }
  }

  return (
    <button
      onClick={handleDescargarAltar}
      disabled={generandoImagen}
      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2 shadow-lg"
    >
      {generandoImagen ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Generando imagen...</span>
        </>
      ) : (
        <>
          <span>📸</span>
          <span>Descargar mi Altar</span>
        </>
      )}
    </button>
  )
}

export default DescargaImagen