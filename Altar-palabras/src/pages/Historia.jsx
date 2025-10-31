import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Historia = () => {
  const navigate = useNavigate();
  const [elementoActivo, setElementoActivo] = useState(null);

  const elementos = {
    vela: {
      emoji: '🕯️',
      titulo: 'VELAS',
      explicacion: '¡Las velas son como FAROS! Con su luz brillante guían a nuestros seres queridos de regreso a casa. Entre más velas pongas, ¡más fácil será encontrar el camino!'
    },
    flor: {
      emoji: '🌼',
      titulo: 'FLORES DE CEMPASÚCHIL',
      explicacion: 'Estas flores ANARANJADAS son MÁGICAS. Su olor es tan fuerte y especial que guía a las almas desde muy lejos. ¡Es como si dejaran un rastro de perfume!'
    },
    calavera: {
      emoji: '💀',
      titulo: 'CALAVERAS DE AZÚCAR',
      explicacion: '¡Las calaveras NO son para dar miedo! Las decoramos con COLORES y BRILLOS porque celebramos la vida. Son DULCES y deliciosas, ¡puedes hasta comértelas!'
    },
    pan: {
      emoji: '🍞',
      titulo: 'PAN DE MUERTO',
      explicacion: 'Es un pan DELICIOSO con forma redonda que representa el ciclo de la vida. Las bolitas de arriba son como huesitos, ¡pero no te preocupes, sabe a gloria!'
    },
    agua: {
      emoji: '💧',
      titulo: 'AGUA',
      explicacion: 'Después de un viaje largo, todos tenemos sed, ¿verdad? El agua en el altar es para que nuestros visitantes puedan tomar y descansar un poquito.'
    },
    sal: {
      emoji: '🧂',
      titulo: 'SAL',
      explicacion: 'La sal PROTEGE y PURIFICA. La ponemos para que el viaje de las almas sea seguro y sin problemas.'
    },
    fruta: {
      emoji: '🍊',
      titulo: 'FRUTAS',
      explicacion: 'Las frutas son OFRENDAS especiales. Ponemos las favoritas de nuestros seres queridos para que disfruten de sus sabores preferidos.'
    },
    foto: {
      emoji: '📷',
      titulo: 'FOTO',
      explicacion: 'La foto MÁS IMPORTANTE del altar. Es para recordar cómo se veía la persona y celebrar su vida con AMOR.'
    }
  };

  const mostrarInfo = (elemento) => {
    setElementoActivo(elemento);
  };

  const cerrarInfo = () => {
    setElementoActivo(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e1b4b, #581c87, #92400e)',
      color: 'white'
    }}>
      {/* Header con navegación */}
      <header style={{
        padding: '20px',
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '3px solid #fbbf24'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            background: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          ← Volver al Inicio
        </button>
        
        <h1 style={{
          fontSize: '28px',
          fontFamily: 'Creepster, cursive',
          color: '#fbbf24',
          margin: '0'
        }}>
          📚 Historia del Día de Muertos
        </h1>
        
        <button
          onClick={() => navigate('/crear-calaverita')}
          style={{
            padding: '10px 20px',
            background: '#fb923c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Crear Calaverita →
        </button>
      </header>

      {/* Contenido principal */}
      <main style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Sección 1: ¿Qué es el Día de Muertos? */}
        <section style={{
          background: 'rgba(251, 191, 36, 0.1)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '40px',
          border: '3px solid #fbbf24'
        }}>
          <h2 style={{
            fontSize: '36px',
            color: '#fbbf24',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            🎃 ¿QUÉ ES EL DÍA DE MUERTOS?
          </h2>
          
          <div style={{ fontSize: '64px', textAlign: 'center', marginBottom: '20px' }}>
            👨‍👩‍👧‍👦🏛️
          </div>
          
          <p style={{
            fontSize: '20px',
            lineHeight: '1.8',
            textAlign: 'center',
            color: '#fef3c7'
          }}>
            El Día de Muertos es una fiesta MUY especial en México. 
            NO es un día triste, ¡es una <strong>CELEBRACIÓN</strong>! 
            Es cuando recordamos con <strong>AMOR</strong> y <strong>ALEGRÍA</strong> a las 
            personas que ya no están con nosotros.
          </p>
        </section>

        {/* Sección 2: ¿Por qué hay calaveras? */}
        <section style={{
          background: 'rgba(236, 72, 153, 0.1)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '40px',
          border: '3px solid #ec4899'
        }}>
          <h2 style={{
            fontSize: '36px',
            color: '#ec4899',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            💀 ¿POR QUÉ HAY CALAVERAS?
          </h2>
          
          <div style={{ 
            fontSize: '64px', 
            textAlign: 'center', 
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px'
          }}>
            <span style={{ animation: 'bounce 2s infinite' }}>💀</span>
            <span style={{ animation: 'bounce 2s infinite 0.5s' }}>🌈</span>
            <span style={{ animation: 'bounce 2s infinite 1s' }}>💀</span>
          </div>
          
          <p style={{
            fontSize: '20px',
            lineHeight: '1.8',
            textAlign: 'center',
            color: '#fce7f3'
          }}>
            En México, las calaveras NO dan miedo. ¡Son <strong>DIVERTIDAS</strong> y <strong>COLORIDAS</strong>! 
            Representan que la muerte es parte de la vida y podemos recordarla con 
            alegría y humor.
          </p>
        </section>

        {/* Sección 3: El Altar de Ofrendas */}
        <section style={{
          background: 'rgba(124, 58, 237, 0.1)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '40px',
          border: '3px solid #7c3aed'
        }}>
          <h2 style={{
            fontSize: '36px',
            color: '#7c3aed',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            🏛️ EL ALTAR DE OFRENDAS
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              padding: '20px',
              borderRadius: '15px',
              width: '80%',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>💫</div>
              <strong>Nivel 3: El más allá</strong>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              padding: '20px',
              borderRadius: '15px',
              width: '85%',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>☁️</div>
              <strong>Nivel 2: El cielo</strong>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #059669, #047857)',
              padding: '20px',
              borderRadius: '15px',
              width: '90%',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🌍</div>
              <strong>Nivel 1: La tierra (donde vivimos)</strong>
            </div>
          </div>
          
          <p style={{
            fontSize: '18px',
            textAlign: 'center',
            color: '#e0e7ff'
          }}>
            El altar tiene 3 niveles que representan diferentes mundos. 
            ¡Haz clic en cada elemento abajo para aprender más!
          </p>
        </section>

        {/* Sección 4: Elementos del altar (interactivo) */}
        <section style={{
          background: 'rgba(251, 146, 60, 0.1)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '40px',
          border: '3px solid #fb923c'
        }}>
          <h2 style={{
            fontSize: '36px',
            color: '#fb923c',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            🕯️ ¿QUÉ SIGNIFICA CADA COSA DEL ALTAR?
          </h2>
          
          <p style={{
            fontSize: '18px',
            textAlign: 'center',
            marginBottom: '30px',
            color: '#fed7aa'
          }}>
            ¡Haz CLICK en cada elemento para descubrir su significado!
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {Object.entries(elementos).map(([key, elemento]) => (
              <button
                key={key}
                onClick={() => mostrarInfo(key)}
                style={{
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>
                  {elemento.emoji}
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#92400e'
                }}>
                  {elemento.titulo}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Sección 5: ¿Qué son las calaveritas literarias? */}
        <section style={{
          background: 'rgba(34, 197, 94, 0.1)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '40px',
          border: '3px solid #22c55e'
        }}>
          <h2 style={{
            fontSize: '36px',
            color: '#22c55e',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            📜 ¿QUÉ SON LAS CALAVERITAS LITERARIAS?
          </h2>
          
          <div style={{ fontSize: '64px', textAlign: 'center', marginBottom: '20px' }}>
            👦📝
          </div>
          
          <p style={{
            fontSize: '20px',
            lineHeight: '1.8',
            textAlign: 'center',
            color: '#dcfce7',
            marginBottom: '30px'
          }}>
            Las calaveritas son <strong>POEMAS DIVERTIDOS</strong> que hablan de la muerte de forma chistosa. 
            Son como pequeños chistes en rima que hacemos sobre nuestros amigos y familia, 
            ¡pero de forma amable y divertida!
          </p>
          
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '15px',
            padding: '30px',
            margin: '20px auto',
            maxWidth: '500px',
            border: '2px solid #22c55e'
          }}>
            <h4 style={{ color: '#22c55e', textAlign: 'center', marginBottom: '15px' }}>
              Ejemplo de calaverita:
            </h4>
            <p style={{
              fontSize: '18px',
              fontStyle: 'italic',
              textAlign: 'center',
              lineHeight: '1.6',
              color: '#dcfce7'
            }}>
              "La muerte andaba paseando<br/>
              por las calles de la ciudad,<br/>
              y a todos fue saludando<br/>
              con cariño y felicidad."
            </p>
          </div>
        </section>

        {/* Botón final */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <p style={{
            fontSize: '24px',
            color: '#fbbf24',
            marginBottom: '30px',
            fontWeight: 'bold'
          }}>
            ¡Ahora estás listo para crear tu propia calaverita!
          </p>
          
          <button
            onClick={() => navigate('/crear-calaverita')}
            style={{
              padding: '20px 40px',
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #fb923c, #f97316)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(251, 146, 60, 0.4)',
              animation: 'bounce 2s infinite'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px) scale(1.05)';
              e.target.style.boxShadow = '0 15px 35px rgba(251, 146, 60, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 20px rgba(251, 146, 60, 0.4)';
            }}
          >
            🎨 ¡CREAR MI CALAVERITA AHORA!
          </button>
        </div>
      </main>

      {/* Modal de información de elementos */}
      {elementoActivo && (
        <div style={{
          position: 'fixed',
          inset: '0',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1000',
          padding: '20px'
        }} onClick={cerrarInfo}>
          <div style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            textAlign: 'center',
            color: '#92400e',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={cerrarInfo}
              style={{
                position: 'absolute',
                top: '15px',
                right: '20px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#92400e'
              }}
            >
              ×
            </button>
            
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>
              {elementos[elementoActivo].emoji}
            </div>
            
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              {elementos[elementoActivo].titulo}
            </h3>
            
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6'
            }}>
              {elementos[elementoActivo].explicacion}
            </p>
          </div>
        </div>
      )}

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default Historia;