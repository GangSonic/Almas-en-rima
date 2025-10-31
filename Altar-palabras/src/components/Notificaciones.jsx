function Notificaciones({ guardadoReciente, datosRestaurados }) {
  return (
    <>
      {/* Notificación de guardado */}
      {guardadoReciente && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in z-40">
          <div className="flex items-center space-x-2">
            <span>✅</span>
            <span className="text-sm font-medium">Guardado automáticamente</span>
          </div>
        </div>
      )}

      {/* Notificación de restauración */}
      {datosRestaurados && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-40">
          <div className="flex items-center space-x-2">
            <span>✨</span>
            <span className="font-medium">Altar restaurado</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Notificaciones