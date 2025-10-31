import React, { useState } from 'react';

const CardCalaverita = ({ calaverita, onVer, onEliminar }) => {
  const [mostrarCompleta, setMostrarCompleta] = useState(false);

  const getTonoIcon = (tono) => {
    switch (tono) {
      case 'chistosa': return '😂';
      case 'respetuosa': return '🙏';
      case 'satirica': return '😈';
      default: return '📜';
    }
  };

  const getPreview = (texto) => {
    const lineas = texto.split('\n').filter(linea => linea.trim());
    return lineas.slice(0, 3).join('\n') + (lineas.length > 3 ? '...' : '');
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
      border: '3px solid #d97706',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
      transition: 'all 0.3s ease',
      position: 'relative',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
    }}>
      
      {/* Header de la card */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        <div>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#92400e',
            margin: '0 0 4px 0',
            fontFamily: 'serif'
          }}>
            Calaverita para {calaverita.nombre}
          </h4>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#78350f'
          }}>
            <span>{getTonoIcon(calaverita.tono)}</span>
            <span>{calaverita.tono}</span>
            <span>•</span>
            <span>{formatearFecha(calaverita.fecha)}</span>
          </div>
        </div>

        {/* Botón eliminar */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm(`¿Eliminar la calaverita para ${calaverita.nombre}?`)) {
              onEliminar(calaverita.id);
            }
          }}
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#dc2626';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ef4444';
            e.target.style.transform = 'scale(1)';
          }}
          title="Eliminar calaverita"
        >
          ×
        </button>
      </div>

      {/* Preview del contenido */}
      <div style={{
        flex: '1',
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#374151',
        fontFamily: 'serif',
        whiteSpace: 'pre-line',
        marginBottom: '16px',
        overflow: 'hidden'
      }}>
        {mostrarCompleta ? calaverita.texto : getPreview(calaverita.texto)}
      </div>

      {/* Botones de acción */}
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => setMostrarCompleta(!mostrarCompleta)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#3b82f6';
          }}
        >
          {mostrarCompleta ? '📄 Menos' : '👁️ Ver completa'}
        </button>

        <button
          onClick={() => onVer(calaverita)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#047857';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#059669';
          }}
        >
          📝 Usar esta
        </button>
      </div>

      {/* Decoración de esquina */}
      <div style={{
        position: 'absolute',
        top: '-2px',
        right: '-2px',
        width: '20px',
        height: '20px',
        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
        borderRadius: '0 8px 0 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px'
      }}>
        📜
      </div>
    </div>
  );
};

export default CardCalaverita;