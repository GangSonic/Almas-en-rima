import React from 'react';
import CardCalaverita from './CardCalaverita';

const HistorialCalaveritas = ({ historial, onRestaurarCalaverita, onEliminarCalaverita, onLimpiarHistorial, onMostrarNotificacion }) => {
  const manejarVer = (calaverita) => {
    onRestaurarCalaverita(calaverita);
    if (onMostrarNotificacion) {
      onMostrarNotificacion(`✅ Calaverita para ${calaverita.nombre} restaurada`);
    }
  };

  const manejarEliminar = (id) => {
    onEliminarCalaverita(id);
    if (onMostrarNotificacion) {
      onMostrarNotificacion(`🗑️ Calaverita eliminada`);
    }
  };

  const manejarLimpiarTodo = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todas las calaveritas del historial?')) {
      onLimpiarHistorial();
      if (onMostrarNotificacion) {
        onMostrarNotificacion('🗑️ Historial limpiado completamente');
      }
    }
  };

  if (historial.length === 0) {
    return (
      <section style={{
        width: '100%',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #374151, #4b5563)',
          borderRadius: '12px',
          padding: '40px',
          border: '2px dashed #6b7280'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📜</div>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#fbbf24',
            marginBottom: '12px'
          }}>
            Historial de Calaveritas
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#d1d5db',
            lineHeight: '1.6'
          }}>
            Aún no has creado calaveritas. Cuando generes algunas, 
            aparecerán aquí para que puedas revisarlas y reutilizarlas.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{
      width: '100%',
      padding: '40px 20px'
    }}>
      {/* Header del historial */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h3 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#fbbf24',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          📜 Historial de Calaveritas ({historial.length})
        </h3>

        <button
          onClick={manejarLimpiarTodo}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ef4444',
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
            e.target.style.backgroundColor = '#dc2626';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ef4444';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          🗑️ Limpiar Todo el Historial
        </button>
      </div>

      {/* Grid de calaveritas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {historial.map((calaverita) => (
          <CardCalaverita
            key={calaverita.id}
            calaverita={calaverita}
            onVer={manejarVer}
            onEliminar={manejarEliminar}
          />
        ))}
      </div>

      {/* Footer informativo */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        background: 'rgba(251, 191, 36, 0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(251, 191, 36, 0.3)'
      }}>
        <p style={{
          fontSize: '14px',
          color: '#fed7aa',
          margin: '0'
        }}>
          💡 Haz clic en "Usar esta" para restaurar una calaverita anterior, 
          o en "Ver completa" para leer el texto completo.
        </p>
      </div>
    </section>
  );
};

export default HistorialCalaveritas;