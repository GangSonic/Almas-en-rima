import Calaverita from './Calaverita'

function SeccionCalaverita({ calaverita, nombrePersona }) {
  if (!calaverita) return null

  return (
    <div className="mt-8">
      <h3 className="text-yellow-400 font-bold text-xl mb-4 text-center" style={{fontFamily: 'Creepster, cursive'}}>
        Tu Calaverita
      </h3>
      
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-slate-700">
        <Calaverita 
          texto={calaverita} 
          nombrePersona={nombrePersona}
        />
      </div>
    </div>
  )
}

export default SeccionCalaverita