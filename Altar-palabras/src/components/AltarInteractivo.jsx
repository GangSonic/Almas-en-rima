import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PanelElementos from './PanelElementos';
import ZonaAltar from './ZonaAltar';
import ControladorAltar from './ControladorAltar';
import { useAltarState } from '../hooks/useAltarState';

const AltarInteractivo = () => {
  const [mostrarPanel, setMostrarPanel] = useState(true);
  const [mostrarGrid, setMostrarGrid] = useState(true);
  const {
    elementos,
    fotosSubidas,
    agregarElemento,
    moverElemento,
    eliminarElemento,
    agregarFoto,
    eliminarFoto,
    limpiarAltar,
    guardarAltar,
    cargarAltar,
    contadorElementos
  } = useAltarState();

  const handleDrop = useCallback((item, posicion) => {
    if (item.esNuevo) {
      // Elemento nuevo desde el panel
      agregarElemento(item.tipo, posicion, item.props, item.emoji, item.nombre);
    } else {
      // Elemento existente siendo movido
      moverElemento(item.id, posicion);
    }
  }, [agregarElemento, moverElemento]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-orange-800 to-purple-900 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-orange-300 mb-2">
              🎭 Altar Interactivo de Ofrendas 🎭
            </h1>
            <p className="text-orange-200">
              Arrastra elementos para crear tu altar personalizado
            </p>
          </div>

          <div className="flex gap-6">
            {/* Panel de Elementos */}
            {mostrarPanel && (
              <div className="w-80 flex-shrink-0">
                <PanelElementos 
                  fotosSubidas={fotosSubidas}
                  onAgregarFoto={agregarFoto}
                  onEliminarFoto={eliminarFoto}
                />
              </div>
            )}

            {/* Área Principal */}
            <div className="flex-1">
              {/* Controles */}
              <ControladorAltar
                mostrarPanel={mostrarPanel}
                setMostrarPanel={setMostrarPanel}
                mostrarGrid={mostrarGrid}
                setMostrarGrid={setMostrarGrid}
                limpiarAltar={limpiarAltar}
                guardarAltar={guardarAltar}
                cargarAltar={cargarAltar}
                contadorElementos={contadorElementos}
              />

              {/* Altar */}
              <ZonaAltar
                elementos={elementos}
                onDrop={handleDrop}
                onEliminar={eliminarElemento}
                mostrarGrid={mostrarGrid}
              />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default AltarInteractivo;