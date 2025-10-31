import { useState } from 'react'

const elementos = {
  flores: [
    { id: 'cempasuchil', emoji: '🌼', nombre: 'Cempasúchil', color: 'text-orange-400' },
    { id: 'rosa', emoji: '🌹', nombre: 'Rosa', color: 'text-pink-400' },
    { id: 'clavel', emoji: '🌺', nombre: 'Clavel', color: 'text-red-400' },
    { id: 'nube', emoji: '☁️', nombre: 'Nube', color: 'text-white' },
    { id: 'gladiola', emoji: '🌸', nombre: 'Gladiola', color: 'text-purple-400' }
  ],
  comida: [
    { id: 'pan', emoji: '🍞', nombre: 'Pan de Muerto', color: 'text-amber-600' },
    { id: 'calavera-azucar', emoji: '💀', nombre: 'Calavera de Azúcar', color: 'text-white' },
    { id: 'manzana', emoji: '🍎', nombre: 'Manzana', color: 'text-red-500' },
    { id: 'naranja', emoji: '🍊', nombre: 'Naranja', color: 'text-orange-500' },
    { id: 'platano', emoji: '🍌', nombre: 'Plátano', color: 'text-yellow-400' },
    { id: 'tamales', emoji: '🫔', nombre: 'Tamales', color: 'text-yellow-600' },
    { id: 'chocolate', emoji: '☕', nombre: 'Chocolate Caliente', color: 'text-amber-800' }
  ],
  decoracion: [
    { id: 'papel-naranja', emoji: '🟠', nombre: 'Papel Picado Naranja', color: 'text-orange-500' },
    { id: 'papel-morado', emoji: '🟣', nombre: 'Papel Picado Morado', color: 'text-purple-500' },
    { id: 'papel-amarillo', emoji: '🟡', nombre: 'Papel Picado Amarillo', color: 'text-yellow-400' },
    { id: 'vela-blanca', emoji: '🕯️', nombre: 'Vela Blanca', color: 'text-yellow-200' },
    { id: 'vela-roja', emoji: '🔴', nombre: 'Vela Roja', color: 'text-red-500' },
    { id: 'incienso', emoji: '🪔', nombre: 'Incienso', color: 'text-amber-400' },
    { id: 'sal', emoji: '🧂', nombre: 'Sal', color: 'text-white' },
    { id: 'foto', emoji: '🖼️', nombre: 'Marco de Foto', color: 'text-amber-600' }
  ]
}

function ModalElementos({ isOpen, onClose, onElementSelect, elementosColocados }) {
  const [tabActiva, setTabActiva] = useState('flores')

  if (!isOpen) return null

  const contarElemento = (elementoId) => {
    return elementosColocados.filter(el => el.id === elementoId).length
  }

  const puedeAgregar = (elementoId) => {
    return contarElemento(elementoId) < 2
  }

  const handleElementSelect = (elemento) => {
    if (puedeAgregar(elemento.id)) {
      onElementSelect(elemento)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-slate-800 rounded-xl border-4 border-yellow-400 w-full max-w-lg h-full max-h-[600px] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h3 className="text-yellow-400 font-bold text-xl" style={{fontFamily: 'Creepster, cursive'}}>
            Elementos del Altar
          </h3>
          <button
            onClick={onClose}
            className="text-yellow-400 hover:text-yellow-300 text-2xl transition-colors"
            title="Cerrar"
          >
            ❌
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700">
          {Object.keys(elementos).map((tab) => (
            <button
              key={tab}
              onClick={() => setTabActiva(tab)}
              className={`
                flex-1 py-4 px-4 text-base font-medium capitalize transition-all duration-200
                ${tabActiva === tab 
                  ? 'bg-yellow-400 text-slate-900 shadow-lg' 
                  : 'text-gray-300 hover:text-yellow-400 hover:bg-slate-700'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Elementos */}
        <div className="p-6 overflow-y-auto flex-1" style={{maxHeight: '400px'}}>
          <div className="grid grid-cols-3 gap-4">
            {elementos[tabActiva].map((elemento) => {
              const cantidad = contarElemento(elemento.id)
              const disponible = puedeAgregar(elemento.id)
              
              return (
                <button
                  key={elemento.id}
                  onClick={() => handleElementSelect(elemento)}
                  disabled={!disponible}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200 group
                    ${disponible 
                      ? 'border-slate-600 hover:border-yellow-400 hover:scale-105 cursor-pointer hover:shadow-lg' 
                      : 'border-gray-700 opacity-50 cursor-not-allowed'
                    }
                    bg-slate-700 hover:bg-slate-600
                  `}
                >
                  <div className={`text-3xl mb-2 ${elemento.color} group-hover:scale-110 transition-transform`}>
                    {elemento.emoji}
                  </div>
                  <div className="text-xs text-gray-300 text-center font-medium">
                    {elemento.nombre}
                  </div>
                  {cantidad > 0 && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 text-sm rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                      {cantidad}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-900/50">
          <p className="text-gray-400 text-sm text-center">
            Máximo 2 elementos del mismo tipo • Click para agregar al altar
          </p>
        </div>
      </div>
    </div>
  )
}

export default ModalElementos