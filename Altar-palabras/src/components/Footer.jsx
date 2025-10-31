function Footer() {
  return (
    <footer className="bg-purple-900/10 border-t border-purple-700/20 py-8 px-4 mt-12">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-4">
          <div className="text-2xl mb-2">🌺 💀 🌺</div>
        </div>
        
        <div className="text-gray-300 leading-relaxed space-y-2">
          <p className="text-lg font-medium text-yellow-400">
            Sobre el Día de Muertos
          </p>
          <p className="max-w-3xl mx-auto">
            El Día de Muertos es una celebración mexicana que honra a los difuntos. 
            Las calaveritas literarias son versos humorísticos sobre la muerte, 
            y los altares son ofrendas para recibir a las almas que nos visitan.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-purple-700/20">
          <p className="text-gray-400 text-sm">
            Una tradición que celebra la vida a través de la memoria
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer