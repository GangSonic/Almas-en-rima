import React from 'react';
import { useDrag } from 'react-dnd';

const ITEM_TYPE = 'ELEMENTO_ALTAR';

const ElementoArrastrable = ({ elemento, esNuevo = false, id = null, onEliminar = null }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: {
      tipo: elemento.tipo,
      props: elemento.props,
      emoji: elemento.emoji,
      nombre: elemento.nombre,
      esNuevo,
      id: id || null
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getElementoStyle = () => {
    const baseStyle = {
      position: 'relative',
      cursor: 'move',
      userSelect: 'none',
      transition: 'all 0.2s ease',
      opacity: isDragging ? 0.5 : 1,
      transform: isDragging ? 'scale(0.95)' : esNuevo ? 'scale(1)' : 'scale(1)',
    };

    if (esNuevo) {
      baseStyle.transform = 'scale(1)';
      baseStyle[':hover'] = { transform: 'scale(1.05)' };
    }

    return baseStyle;
  };

  const getElementoBackground = () => {
    // Solo las fotos tienen fondo especial, el resto son transparentes para mostrar el emoji
    if (elemento.tipo === 'foto' && elemento.props.src) {
      return 'transparent';
    }
    
    // Para todos los demás elementos, fondo sutil que no interfiera con el emoji
    return 'rgba(251, 191, 36, 0.1)';
  };

  const getElementoSize = () => {
    // Tamaños más grandes para mejor visibilidad en el altar
    if (elemento.tipo === 'flor') {
      switch (elemento.props.tamaño) {
        case 'pequeño': return { width: '50px', height: '50px', fontSize: '28px' };
        case 'mediano': return { width: '65px', height: '65px', fontSize: '36px' };
        case 'grande': return { width: '80px', height: '80px', fontSize: '44px' };
        case 'ramo': return { width: '75px', height: '75px', fontSize: '40px' };
        default: return { width: '65px', height: '65px', fontSize: '36px' };
      }
    }
    if (elemento.tipo === 'foto') {
      return { width: '80px', height: '80px' };
    }
    // Tamaño estándar más grande para mejor visibilidad
    return { width: '60px', height: '60px', fontSize: '36px' };
  };

  const size = getElementoSize();

  return (
    <div ref={drag} style={getElementoStyle()}>
      <div style={{
        ...size,
        background: getElementoBackground(),
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: elemento.tipo === 'foto' ? '2px solid rgba(251, 191, 36, 0.5)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        if (elemento.tipo === 'foto') {
          e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
          e.target.style.borderColor = '#fbbf24';
        } else {
          e.target.style.transform = 'scale(1.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (elemento.tipo === 'foto') {
          e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          e.target.style.borderColor = 'rgba(251, 191, 36, 0.5)';
        } else {
          e.target.style.transform = 'scale(1)';
        }
      }}>
        
        {elemento.tipo === 'foto' && elemento.props.src ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              src={elemento.props.src}
              alt={elemento.props.nombre || 'Foto'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '6px'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: '0',
              background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
              borderRadius: '6px'
            }}></div>
            {elemento.props.nombre && (
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                padding: '4px'
              }}>
                <p style={{
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '500',
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                }}>
                  {elemento.props.nombre}
                </p>
              </div>
            )}
          </div>
        ) : (
          <span style={{
            fontSize: size.fontSize || '32px',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            lineHeight: '1',
            display: 'block'
          }}>
            {elemento.emoji}
          </span>
        )}
      </div>

      {/* Nombre del elemento (solo en panel) */}
      {esNuevo && (
        <p style={{
          fontSize: '12px',
          color: '#fed7aa',
          textAlign: 'center',
          marginTop: '4px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {elemento.nombre}
        </p>
      )}

      {/* Botón eliminar (solo en altar) */}
      {!esNuevo && onEliminar && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEliminar(id);
          }}
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '24px',
            height: '24px',
            backgroundColor: '#ef4444',
            color: 'white',
            borderRadius: '50%',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.2s ease',
            opacity: '0',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#dc2626';
            e.target.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ef4444';
            e.target.style.opacity = '0';
          }}
          title="Eliminar elemento"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ElementoArrastrable;