import React from 'react';
import AltarInteractivo from './AltarInteractivo';

const ModalAltar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(4px)',
      zIndex: '1000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        backgroundColor: '#0f172a',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header del modal */}
        <div style={{
          background: 'linear-gradient(135deg, rgb(88, 28, 135), rgb(124, 58, 237))',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid rgba(251, 191, 36, 0.3)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#fbbf24',
            margin: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            🎨 Altar Interactivo de Ofrendas
          </h2>
          
          <button
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'rgba(239, 68, 68, 0.8)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              fontSize: '20px',
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
              e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.8)';
              e.target.style.transform = 'scale(1)';
            }}
            title="Cerrar altar"
          >
            ×
          </button>
        </div>

        {/* Contenido del altar */}
        <div style={{
          height: 'calc(100% - 80px)',
          overflow: 'auto'
        }}>
          <AltarInteractivo />
        </div>

        {/* Instrucciones flotantes */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fed7aa',
          padding: '12px 20px',
          borderRadius: '20px',
          fontSize: '14px',
          textAlign: 'center',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          backdropFilter: 'blur(8px)'
        }}>
          💡 Arrastra elementos desde el panel lateral al altar • Haz clic derecho para eliminar • Sube fotos de tus seres queridos
        </div>
      </div>
    </div>
  );
};

export default ModalAltar;