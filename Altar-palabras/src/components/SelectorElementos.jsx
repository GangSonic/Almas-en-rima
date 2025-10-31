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

function SelectorElementos({ isOpen, onClose, onSelect, slotId, elementosColocados }) {
  const [categoriaActiva, setCategoriaActiva] = useState('flores')

  if (!isOpen) return null

  const todosElementos = [...elementos.flores, ...elementos.comida, ...elementos.decoracion]

  const contarElemento = (elementoId) => {
    return elementosColocados.filter(el => el.id === elementoId).length
  }

  const puedeAgregar = (elementoId) => {
    return contarElemento(elementoId) < 2
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-purple-900 rounded-xl border-4 border-yellow-400 max-w-md w-full max-h-96 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-700">
          <h3 className="text-yellow-400 font-bold" style={{fontFamily: 'Creepster, cursive'}}>
            Seleccionar Elemento
          </h3>
          <button
            onClick={onClose}
            className="text-yellow-400 hover:text-yellow-300 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-purple-700">
          {Object.keys(elementos).map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={`
                flex-1 py-2 px-2 text-sm font-medium capitalize transition-colors
                ${categoriaActiva === categoria 
                  ? 'bg-yellow-400 text-purple-900' 
                  : 'text-gray-300 hover:text-yellow-400'
                }
              `}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Elementos */}
        <div className="p-4 overflow-y-auto max-h-64">
          <div className="grid grid-cols-3 gap-2">
            {elementos[categoriaActiva].map((elemento) => {
              const cantidad = contarElemento(elemento.id)
              const disponible = puedeAgregar(elemento.id)
              
              return (
                <button
                  key={elemento.id}
                  onClick={() => {
                    if (disponible) {
                      onSelect(slotId, elemento)
                      onClose()
                    }
                  }}
                  disabled={!disponible}
                  className={`
                    relative p-2 rounded-lg border transition-all duration-200
                    ${disponible 
                      ? 'border-purple-600 hover:border-yellow-400 hover:scale-105 cursor-pointer' 
                      : 'border-gray-600 opacity-50 cursor-not-allowed'
                    }
                    bg-purple-800/50 hover:bg-purple-700/50
                  `}
                >
                  <div className={`text-xl ${elemento.color}`}>
                    {elemento.emoji}
                  </div>
                  <div className="text-xs text-gray-300 text-center mt-1">
                    {elemento.nombre.split(' ')[0]}
                  </div>
                  {cantidad > 0 && (
                    <div className="absolute -top-1 -right-1 bg-yellow-400 text-purple-900 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      {cantidad}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectorElementos