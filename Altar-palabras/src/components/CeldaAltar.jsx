import React from 'react';
import { useDrop } from 'react-dnd';
import ElementoArrastrable from './ElementoArrastrable';

const ITEM_TYPE = 'ELEMENTO_ALTAR';

const CeldaAltar = ({ posicion, elementos, onDrop, onEliminar, mostrarGrid }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item) => {
      onDrop(item, posicion);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const puedeRecibir = elementos.length < 3; // Máximo 3 elementos por celda

  const getDropStyle = () => {
    if (isOver && canDrop && puedeRecibir) {
      return {
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        border: '2px solid #22c55e',
        transform: 'scale(1.05)'
      };
    }
    if (isOver && !puedeRecibir) {
      return {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        border: '2px solid #ef4444'
      };
    }
    if (mostrarGrid) {
      return {
        border: '2px dashed rgba(251, 191, 36, 0.3)',
        backgroundColor: 'rgba(251, 191, 36, 0.05)'
      };
    }
    return {
      backgroundColor: 'transparent',
      border: '1px solid transparent'
    };
  };

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        minHeight: '80px',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        ...getDropStyle()
      }}
    >
      {/* Indicador de posición (solo cuando mostrar grid) */}
      {mostrarGrid && elementos.length === 0 && (
        <div style={{
          position: 'absolute',
          inset: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{
            color: 'rgba(251, 191, 36, 0.4)',
            fontSize: '12px',
            fontFamily: 'monospace'
          }}>
            {posicion.nivel}-{posicion.x}-{posicion.y}
          </span>
        </div>
      )}

      {/* Elementos en la celda */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {elementos.map((elemento, index) => (
          <div
            key={elemento.id}
            style={{
              position: 'absolute',
              zIndex: elemento.posicion.z || index,
              transform: `translate(${index * 4}px, ${index * -4}px)`,
            }}
          >
            <ElementoArrastrable
              elemento={elemento}
              esNuevo={false}
              id={elemento.id}
              onEliminar={onEliminar}
            />
          </div>
        ))}
      </div>

      {/* Indicador de capacidad */}
      {elementos.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          width: '24px',
          height: '24px',
          backgroundColor: 'rgb(88, 28, 135)',
          color: 'white',
          borderRadius: '50%',
          fontSize: '12px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: '0',
          transition: 'opacity 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.opacity = '1'}
        onMouseLeave={(e) => e.target.style.opacity = '0'}>
          {elementos.length}
        </div>
      )}

      {/* Mensaje cuando está llena */}
      {isOver && !puedeRecibir && (
        <div style={{
          position: 'absolute',
          inset: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderRadius: '8px',
          border: '2px solid #ef4444'
        }}>
          <span style={{
            color: '#fecaca',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Máximo 3 elementos
          </span>
        </div>
      )}

      {/* Efecto de brillo al hacer hover */}
      {isOver && canDrop && puedeRecibir && (
        <div style={{
          position: 'absolute',
          inset: '0',
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))',
          borderRadius: '8px',
          animation: 'pulse 2s infinite'
        }}></div>
      )}
    </div>
  );
};

export default CeldaAltar;