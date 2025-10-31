function Calaverita({ texto, nombrePersona }) {
  if (!texto) return null

  // Dividir el texto en estrofas (asumiendo que están separadas por doble salto de línea)
  const estrofas = texto.split('\n\n').filter(estrofa => estrofa.trim())

  return (
    <div className="papel-antiguo w-full fade-in font-mono text-sm leading-relaxed relative shadow-2xl text-white">
      {/* Decorative corners */}
      <div className="absolute -top-1 -left-1 text-amber-600 text-xs">🌿</div>
      <div className="absolute -top-1 -right-1 text-amber-600 text-xs">🌿</div>
      <div className="absolute -bottom-1 -left-1 text-amber-600 text-xs">🌿</div>
      <div className="absolute -bottom-1 -right-1 text-amber-600 text-xs">🌿</div>
      
      <div className="text-center mb-4">
        <div className="text-amber-700 text-lg mb-2">💀</div>
        <h3 className="font-bold text-lg text-purple-700 mb-1" style={{fontFamily: 'Creepster, cursive'}}>
          Calaverita para {nombrePersona}
        </h3>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-0.5 bg-purple-700"></div>
          <div className="text-purple-700 text-xs">💀</div>
          <div className="w-8 h-0.5 bg-purple-700"></div>
        </div>
      </div>
      
      <div className="space-y-4">
        {estrofas.map((estrofa, index) => (
          <div key={index} className="text-center">
            {estrofa.split('\n').map((verso, versoIndex) => (
              <div key={versoIndex} className="leading-6 text-white">
                {verso}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Decorative border */}
      <div className="mt-4 pt-4 border-t border-purple-300 text-center">
        <div className="text-purple-600 text-xs flex items-center justify-center space-x-2">
          <span>🌺</span>
          <span>Día de Muertos</span>
          <span>🌺</span>
        </div>
      </div>
    </div>
  )
}

export default Calaverita