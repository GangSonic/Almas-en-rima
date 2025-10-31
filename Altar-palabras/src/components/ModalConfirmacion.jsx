function ModalConfirmacion({ isOpen, onClose, onConfirm, titulo, mensaje }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-slate-800 rounded-xl border-4 border-red-400 w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-red-400 font-bold text-xl text-center" style={{fontFamily: 'Creepster, cursive'}}>
            {titulo}
          </h3>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-300 text-center mb-6">
            {mensaje}
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Sí, borrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmacion