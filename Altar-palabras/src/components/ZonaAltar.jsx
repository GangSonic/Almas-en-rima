import React from 'react';
import CeldaAltar from './CeldaAltar';

const ZonaAltar = ({ elementos, onDrop, onEliminar, mostrarGrid }) => {
  // Organizar elementos por posición
  const elementosPorPosicion = elementos.reduce((acc, elemento) => {
    const key = `${elemento.posicion.nivel}-${elemento.posicion.x}-${elemento.posicion.y}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(elemento);
    return acc;
  }, {});

  // Ordenar elementos por z-index en cada posición
  Object.keys(elementosPorPosicion).forEach(key => {
    elementosPorPosicion[key].sort((a, b) => a.posicion.z - b.posicion.z);
  });

  const getNivelConfig = (nivel) => {
    switch (nivel) {
      case 0: return { 
        nombre: 'Nivel Superior', 
        width: '60%', 
        bg: 'rgb(88, 28, 135)', 
        cols: 3,
        height: '180px'
      };
      case 1: return { 
        nombre: 'Nivel Medio', 
        width: '80%', 
        bg: 'rgb(194, 65, 12)', 
        cols: 4,
        height: '160px'
      };
      case 2: return { 
        nombre: 'Nivel Inferior', 
        width: '100%', 
        bg: 'rgb(120, 53, 15)', 
        cols: 5,
        height: '140px'
      };
      default: return { 
        nombre: `Nivel ${nivel + 1}`, 
        width: '100%', 
        bg: 'rgb(88, 28, 135)', 
        cols: 4,
        height: '160px'
      };
    }
  };

  return (
    <div 
      data-altar="zona"
      style={{
        background: 'linear-gradient(to bottom, rgb(139, 69, 19), rgb(101, 67, 33), rgb(62, 39, 35))',
        minHeight: '600px',
        position: 'relative',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}
    >
      {/* Papel picado decorativo */}
      <div 
        style={{
          position: 'absolute',
          top: '-10px',
          left: '0',
          right: '0',
          height: '30px',
          background: 'linear-gradient(90deg, #ff6b35 0%, #f7931e 25%, #c149ad 50%, #f7931e 75%, #ff6b35 100%)',
          borderRadius: '15px 15px 0 0',
          zIndex: 10
        }}
      >
        <div style={{ textAlign: 'center', color: 'white', fontSize: '16px', lineHeight: '30px' }}>
          🎀 ✨ 🎀 ✨ 🎀 ✨ 🎀 ✨ 🎀
        </div>
      </div>
      
      {/* Título del altar */}
      <div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#fbbf24', 
          marginBottom: '10px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          🏛️ Altar de Ofrendas 🏛️
        </h2>
      </div>

      {/* Niveles del altar escalonados */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        {Array.from({ length: 3 }, (_, nivel) => {
          const config = getNivelConfig(nivel);
          
          return (
            <div 
              key={nivel} 
              style={{
                width: config.width,
                minHeight: config.height,
                background: `linear-gradient(135deg, ${config.bg}, ${config.bg}dd)`,
                borderRadius: '8px',
                padding: '15px',
                boxShadow: `0 ${8 + nivel * 4}px ${16 + nivel * 8}px rgba(0,0,0,0.${3 + nivel})`,
                border: '3px solid #d97706',
                position: 'relative',
                transform: `translateY(${nivel * -5}px)`,
                zIndex: 10 - nivel
              }}
            >
              {/* Etiqueta del nivel */}
              {mostrarGrid && (
                <div style={{ 
                  position: 'absolute', 
                  top: '-15px', 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  background: 'rgb(88, 28, 135)',
                  color: '#fbbf24',
                  padding: '5px 15px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  border: '2px solid #d97706'
                }}>
                  {config.nombre}
                </div>
              )}

              {/* Grid del nivel */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
                  gap: '10px',
                  minHeight: '100px'
                }}
              >
                {Array.from({ length: config.cols }, (_, x) => {
                  const posicionKey = `${nivel}-${x}-0`;
                  const elementosEnPosicion = elementosPorPosicion[posicionKey] || [];
                  
                  return (
                    <CeldaAltar
                      key={`${nivel}-${x}-0`}
                      posicion={{ nivel, x, y: 0 }}
                      elementos={elementosEnPosicion}
                      onDrop={onDrop}
                      onEliminar={onEliminar}
                      mostrarGrid={mostrarGrid}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Decoración inferior */}
      <div style={{ 
        marginTop: '30px', 
        textAlign: 'center',
        color: '#fbbf24',
        fontSize: '14px'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span>🌟</span>
          <span>En memoria de nuestros seres queridos</span>
          <span>🌟</span>
        </div>
      </div>
    </div>
  );
};

export default ZonaAltar;