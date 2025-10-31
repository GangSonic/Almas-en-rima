import React, { useRef, useState } from 'react';

const ControladorAltar = ({
  mostrarPanel,
  setMostrarPanel,
  mostrarGrid,
  setMostrarGrid,
  limpiarAltar,
  guardarAltar,
  cargarAltar,
  contadorElementos
}) => {
  const inputFileRef = useRef(null);

  const handleCargarArchivo = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      if (archivo.type === 'application/json') {
        cargarAltar(archivo);
      } else {
        alert('Por favor selecciona un archivo JSON válido');
      }
      // Limpiar el input
      event.target.value = '';
    }
  };

  const [exportando, setExportando] = useState(false);

  const exportarComoImagen = async () => {
    setExportando(true);
    try {
      // Importar html2canvas dinámicamente
      const html2canvas = (await import('html2canvas')).default;
      
      const altarElement = document.querySelector('[data-altar="zona"]');
      
      if (!altarElement) {
        alert('No se pudo encontrar el altar para exportar');
        return;
      }

      // Configuración optimizada para evitar errores con colores modernos
      const canvas = await html2canvas(altarElement, {
        backgroundColor: '#8b4513',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        width: 1200,
        height: 800
      });

      // Crear enlace de descarga
      const link = document.createElement('a');
      link.download = `altar-ofrendas-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      
      // Limpiar URL
      setTimeout(() => URL.revokeObjectURL(link.href), 100);
      
    } catch (error) {
      console.error('Error al exportar imagen:', error);
      alert('Error al exportar la imagen del altar. Intenta de nuevo.');
    } finally {
      setExportando(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgb(88, 28, 135), rgb(124, 58, 237))',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
      border: '2px solid rgba(251, 191, 36, 0.3)'
    }}>
      
      {/* Fila superior - Controles principales */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '16px'
      }}>
        
        {/* Controles de vista */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMostrarPanel(!mostrarPanel)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mostrarPanel
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-purple-700 text-orange-200 hover:bg-purple-600'
            }`}
          >
            {mostrarPanel ? '🎨 Ocultar Panel' : '🎨 Mostrar Panel'}
          </button>

          <button
            onClick={() => setMostrarGrid(!mostrarGrid)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mostrarGrid
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-purple-700 text-orange-200 hover:bg-purple-600'
            }`}
          >
            {mostrarGrid ? '📐 Ocultar Grid' : '📐 Mostrar Grid'}
          </button>
        </div>

        {/* Contador de elementos */}
        <div className="bg-purple-900/50 px-4 py-2 rounded-lg border border-orange-400/30">
          <span className="text-orange-300 font-semibold">
            📊 {contadorElementos.total}/{contadorElementos.maximo} elementos
          </span>
        </div>
      </div>

      {/* Fila inferior - Acciones */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Limpiar altar */}
        <button
          onClick={limpiarAltar}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white 
                     rounded-lg font-medium transition-colors shadow-lg
                     flex items-center gap-2"
        >
          🗑️ Limpiar Altar
        </button>

        {/* Guardar altar */}
        {/*
        <button
          onClick={guardarAltar}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white 
                     rounded-lg font-medium transition-colors shadow-lg
                     flex items-center gap-2"
        >
          💾 Guardar JSON
        </button>
*/}
        {/* Cargar altar */}
        {/*
        <button
          onClick={() => inputFileRef.current?.click()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white 
                     rounded-lg font-medium transition-colors shadow-lg
                     flex items-center gap-2"
        >
          📁 Cargar JSON
        </button>
*/}
        {/* Exportar como imagen */}
        <button
          onClick={exportarComoImagen}
          disabled={exportando}
          style={{
            padding: '8px 16px',
            backgroundColor: exportando ? '#6b7280' : '#7c3aed',
            color: 'white',
            borderRadius: '8px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            cursor: exportando ? 'not-allowed' : 'pointer'
          }}
          onMouseEnter={(e) => {
            if (!exportando) {
              e.target.style.backgroundColor = '#6d28d9';
            }
          }}
          onMouseLeave={(e) => {
            if (!exportando) {
              e.target.style.backgroundColor = '#7c3aed';
            }
          }}
        >
          {exportando ? '⏳ Exportando...' : '🖼️ Exportar PNG'}
        </button>

        {/* Input file oculto */}
        <input
          ref={inputFileRef}
          type="file"
          accept=".json"
          onChange={handleCargarArchivo}
          className="hidden"
        />
      </div>

      {/* Desglose por tipo (si hay elementos) */}
      {contadorElementos.total > 0 && (
        <div className="mt-4 pt-4 border-t border-orange-400/30">
          <div className="flex flex-wrap gap-2">
            {Object.entries(contadorElementos.porTipo).map(([tipo, cantidad]) => (
              <span
                key={tipo}
                className="px-2 py-1 bg-purple-700/50 text-orange-200 
                          rounded-full text-sm border border-orange-400/20"
              >
                {tipo}: {cantidad}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ControladorAltar;