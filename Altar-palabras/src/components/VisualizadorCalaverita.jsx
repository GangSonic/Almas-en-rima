import React from 'react';

const VisualizadorCalaverita = ({ calaverita, nombrePersona, onCopiarTexto, onAgregarAlAltar }) => {
  const copiarAlPortapapeles = () => {
    if (calaverita) {
      navigator.clipboard.writeText(calaverita).then(() => {
        if (onCopiarTexto) onCopiarTexto();
      }).catch(err => {
        console.error('Error al copiar:', err);
      });
    }
  };

  if (!calaverita) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
        color: '#374151',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '4px solid #fcd34d',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📜</div>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          marginBottom: '12px',
          color: '#92400e'
        }}>
          Tu Calaverita Aparecerá Aquí
        </h3>
        <p style={{ 
          fontSize: '16px', 
          color: '#78350f',
          lineHeight: '1.6'
        }}>
          Completa el formulario de la izquierda y haz clic en "Crear Calaverita" 
          para generar versos únicos en honor a tus seres queridos.
        </p>
        <div style={{ 
          marginTop: '20px',
          fontSize: '14px',
          color: '#a16207',
          fontStyle: 'italic'
        }}>
          ✨ Cada calaverita es única y especial ✨
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
      color: '#374151',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '4px solid #fcd34d',
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
      `
    }}>
      {/* Header de la calaverita */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '24px',
        borderBottom: '2px solid #d97706',
        paddingBottom: '16px'
      }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#92400e',
          marginBottom: '8px',
          fontFamily: 'serif'
        }}>
          📜 Calaverita Literaria 📜
        </h3>
        {nombrePersona && (
          <p style={{ 
            fontSize: '18px', 
            color: '#78350f',
            fontStyle: 'italic',
            fontWeight: '500'
          }}>
            Para: {nombrePersona}
          </p>
        )}
      </div>

      {/* Contenido de la calaverita */}
      <div style={{
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#374151',
        fontFamily: 'serif',
        whiteSpace: 'pre-line',
        textAlign: 'center',
        marginBottom: '24px',
        minHeight: '200px'
      }}>
        {calaverita}
      </div>

      {/* Botones de acción */}
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        borderTop: '2px solid #d97706',
        paddingTop: '16px'
      }}>
        <button
          onClick={copiarAlPortapapeles}
          style={{
            padding: '10px 20px',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#047857';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#059669';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          📋 Copiar Texto
        </button>

        {onAgregarAlAltar && (
          <button
            onClick={onAgregarAlAltar}
            style={{
              padding: '10px 20px',
              backgroundColor: '#7c3aed',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6d28d9';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#7c3aed';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            ➕ Agregar al Altar
          </button>
        )}
      </div>

      {/* Decoración inferior */}
      <div style={{
        textAlign: 'center',
        marginTop: '16px',
        fontSize: '12px',
        color: '#a16207',
        fontStyle: 'italic'
      }}>
        🌺 En memoria de nuestros seres queridos 🌺
      </div>
    </div>
  );
};

export default VisualizadorCalaverita;