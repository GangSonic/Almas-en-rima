import { useState } from 'react'
import SelectorElementos from './SelectorElementos'
import ModalElementos from './ModalElementos'

function Altar({ elementosColocados, onElementoColocado, onElementoRemovido }) {
  const [selectorAbierto, setSelectorAbierto] = useState(false)
  const [slotSeleccionado, setSlotSeleccionado] = useState(null)
  const [modalAbierto, setModalAbierto] = useState(false)

  const abrirSelector = (slotId) => {
    setSlotSeleccionado(slotId)
    setSelectorAbierto(true)
  }

  const cerrarSelector = () => {
    setSelectorAbierto(false)
    setSlotSeleccionado(null)
  }

  const colocarElemento = (slotId, elemento) => {
    onElementoColocado(slotId, elemento)
  }

  const removerElemento = (slotId) => {
    onElementoRemovido(slotId)
  }

  const colocarElementoDesdeModal = (elemento) => {
    // Encontrar el primer slot vacío disponible
    const slotsDisponibles = [
      'top-left', 'top-right', 'middle-left', 'middle-right', 
      'middle-top', 'bottom-1', 'bottom-2', 'bottom-3'
    ]
    
    const slotVacio = slotsDisponibles.find(slot => 
      !elementosColocados.some(el => el.slotId === slot)
    )
    
    if (slotVacio) {
      colocarElemento(slotVacio, elemento)
    }
  }

  const obtenerElementoEnSlot = (slotId) => {
    return elementosColocados.find(el => el.slotId === slotId)
  }

  const SlotElemento = ({ slotId, className = "", size = "text-2xl" }) => {
    const elemento = obtenerElementoEnSlot(slotId)
    
    return (
      <div 
        className={`
          ${className} ${size} cursor-pointer transition-all duration-200
          ${elemento ? 'elemento-hover' : 'slot-vacio hover:bg-yellow-400/20 rounded-full p-2'}
        `}
        onClick={() => {
          if (elemento) {
            removerElemento(slotId)
          } else {
            abrirSelector(slotId)
          }
        }}
        title={elemento ? `Click para remover ${elemento.nombre}` : 'Click para agregar elemento'}
      >
        {elemento ? (
          <span className={`${elemento.color} glow-effect scale-in`}>
            {elemento.emoji}
          </span>
        ) : (
          <span className="text-yellow-400/50 hover:text-yellow-400">
            ➕
          </span>
        )}
      </div>
    )
  }
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl text-yellow-400" style={{fontFamily: 'Creepster, cursive'}}>
          Altar de Ofrendas
        </h2>
        
        {/* Botón flotante para agregar elementos */}
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-purple-700 hover:to-purple-600 flex items-center space-x-2"
        >
          <span>➕</span>
          <span className="hidden sm:inline">Agregar Elementos</span>
          <span className="sm:hidden">🎨</span>
        </button>
      </div>
      
      {/* Altar Structure - 3 Levels */}
      <div className="relative bg-gradient-to-b from-amber-900 to-amber-950 rounded-lg p-4 shadow-2xl border-4 border-amber-700">
        
        {/* Level 3 - Top */}
        <div className="altar-level h-20 mb-3 rounded-t-lg flex items-center justify-between px-4 relative">
          {/* Slot izquierdo superior */}
          <SlotElemento slotId="top-left" />
          
          {/* Calavera central (fija) */}
          <div className="text-5xl glow-effect animate-pulse">💀</div>
          
          {/* Slot derecho superior */}
          <SlotElemento slotId="top-right" />
        </div>

        {/* Level 2 - Middle */}
        <div className="altar-level h-40 mb-3 flex items-center justify-between px-4 relative">
          {/* Slot vela izquierda */}
          <SlotElemento slotId="middle-left" size="text-4xl" />
          
          {/* Espacio central decorativo */}
          <div className="flex-1 mx-4 flex items-center justify-center relative">
            {/* Decoración central fija */}
            <div className="text-3xl text-yellow-400 opacity-60">
              📜
            </div>
            {/* Slot decoración superior central */}
            <SlotElemento 
              slotId="middle-top" 
              className="absolute -top-2 left-1/2 transform -translate-x-1/2" 
            />
          </div>
          
          {/* Slot vela derecha */}
          <SlotElemento slotId="middle-right" size="text-4xl" />
        </div>

        {/* Level 1 - Bottom */}
        <div className="altar-level h-24 rounded-b-lg flex items-center justify-center space-x-4 relative">
          {/* Slots del nivel inferior */}
          <SlotElemento slotId="bottom-1" size="text-3xl" />
          <SlotElemento slotId="bottom-2" size="text-3xl" />
          <SlotElemento slotId="bottom-3" size="text-3xl" />
        </div>

        {/* Papel picado decorativo */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
          <div className="w-3 h-4 bg-orange-500 rounded-sm"></div>
          <div className="w-3 h-4 bg-yellow-400 rounded-sm"></div>
          <div className="w-3 h-4 bg-purple-600 rounded-sm"></div>
          <div className="w-3 h-4 bg-orange-500 rounded-sm"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -left-2 text-yellow-400 text-2xl opacity-80 animate-pulse">✨</div>
        <div className="absolute -top-2 -right-2 text-yellow-400 text-2xl opacity-80 animate-pulse">✨</div>
        <div className="absolute -bottom-2 -left-2 text-yellow-400 text-2xl opacity-80 animate-pulse">✨</div>
        <div className="absolute -bottom-2 -right-2 text-yellow-400 text-2xl opacity-80 animate-pulse">✨</div>
      </div>

      {/* Mensaje de ayuda */}
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          💡 Haz click en los ➕ para personalizar tu altar o usa el botón "Agregar Elementos"
        </p>
      </div>

      {/* Selector de elementos para slots específicos */}
      <SelectorElementos
        isOpen={selectorAbierto}
        onClose={cerrarSelector}
        onSelect={colocarElemento}
        slotId={slotSeleccionado}
        elementosColocados={elementosColocados}
      />

      {/* Modal de elementos */}
      <ModalElementos
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onElementSelect={colocarElementoDesdeModal}
        elementosColocados={elementosColocados}
      />
    </div>
  )
}

export default Altar