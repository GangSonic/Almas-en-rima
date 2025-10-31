import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a1f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Estrellas decorativas animadas */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '12%',
        fontSize: '16px',
        color: '#fbbf24',
        animation: 'twinkle 2s infinite'
      }}>✨</div>
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '18%',
        fontSize: '14px',
        color: '#ec4899',
        animation: 'twinkle 3s infinite'
      }}>⭐</div>
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '8%',
        fontSize: '12px',
        color: '#fb923c',
        animation: 'twinkle 2.5s infinite'
      }}>✨</div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        fontSize: '18px',
        color: '#fbbf24',
        animation: 'twinkle 4s infinite'
      }}>⭐</div>
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '15%',
        fontSize: '14px',
        color: '#ec4899',
        animation: 'twinkle 3.5s infinite'
      }}>✨</div>

      {/* Contenido principal */}
      <div style={{
        textAlign: 'center',
        maxWidth: '900px',
        zIndex: '5'
      }}>
        {/* Título principal */}
        <h1 style={{
          fontSize: 'clamp(3.5rem, 8vw, 6rem)',
          fontFamily: 'Creepster, cursive',
          background: 'linear-gradient(45deg, #fb923c, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 40px rgba(251, 146, 60, 0.6), 0 0 80px rgba(236, 72, 153, 0.4)',
          marginBottom: '20px',
          animation: 'glow 3s ease-in-out infinite alternate',
          textStroke: '2px #fbbf24',
          WebkitTextStroke: '1px rgba(251, 191, 36, 0.3)', 
          textAlign: 'center'
        }}>
          🎭ALMAS EN RIMA 🎭 </h1>

        {/* Subtítulo */}
        <p style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
          color: '#fef3c7',
          fontWeight: '500',
          marginBottom: '50px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.4'
        }}>
          Una tradición mexicana llena de <strong>AMOR</strong>, <strong>COLORES</strong> y <strong>ALEGRÍA</strong>
        </p>

        {/* Ilustración central - Calavera mexicana decorada */}
        <div style={{
          position: 'relative',
          width: '350px',
          height: '350px',
          margin: '50px auto',
          animation: 'float 4s ease-in-out infinite'
        }}>
          {/* Círculo de fondo decorativo */}
          <div style={{
            position: 'absolute',
            inset: '0',
            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.2), rgba(236, 72, 153, 0.2))',
            borderRadius: '50%',
            filter: 'blur(20px)',
            transform: 'scale(1.2)'
          }}></div>
          
          {/* Calavera principal */}
          <div style={{
            position: 'relative',
            zIndex: '10',
            fontSize: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
          }}>
            💀
          </div>
          
          {/* Flores decorativas alrededor */}
          <span style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            fontSize: '60px',
            animation: 'bounce-slow 3s ease-in-out infinite',
            filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))'
          }}>🌼</span>
          <span style={{
            position: 'absolute',
            bottom: '-20px',
            left: '-20px',
            fontSize: '60px',
            animation: 'bounce-slow 3s ease-in-out infinite 1s',
            filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))'
          }}>🌺</span>
          <span style={{
            position: 'absolute',
            top: '50%',
            left: '-30px',
            fontSize: '40px',
            animation: 'pulse 2s ease-in-out infinite',
            transform: 'translateY(-50%)'
          }}>✨</span>
          <span style={{
            position: 'absolute',
            top: '50%',
            right: '-30px',
            fontSize: '40px',
            animation: 'pulse 2s ease-in-out infinite 1.5s',
            transform: 'translateY(-50%)'
          }}>✨</span>
        </div>

        {/* Botones principales - LADO A LADO */}
        <div style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '50px',
          flexWrap: 'wrap'
        }}
        className="button-container">
          {/* Botón principal - Crear Calaverita */}
          <button
            onClick={() => navigate('/crear-calaverita')}
            style={{
              width: '280px',
              height: '70px',
              fontSize: '18px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              background: '#f97316',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 25px rgba(249, 115, 22, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontFamily: 'Inter, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 15px 35px rgba(249, 115, 22, 0.6)';
              e.target.style.background = '#ea580c';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.4)';
              e.target.style.background = '#f97316';
            }}
          >
            ✍️ CREAR CALAVERITA
          </button>

          {/* Botón secundario - Aprender */}
          <button
            onClick={() => navigate('/historia')}
            style={{
              width: '280px',
              height: '70px',
              fontSize: '18px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              background: '#7c3aed',
              color: 'white',
              border: '3px solid #f97316',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 25px rgba(124, 58, 237, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontFamily: 'Inter, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 15px 35px rgba(124, 58, 237, 0.6)';
              e.target.style.background = '#6d28d9';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 10px 25px rgba(124, 58, 237, 0.4)';
              e.target.style.background = '#7c3aed';
            }}
          >
            📚 APRENDE
          </button>
        </div>

        {/* Texto motivador */}
        <p style={{
          fontSize: '16px',
          color: '#fed7aa',
          marginTop: '40px',
          fontStyle: 'italic',
          maxWidth: '600px',
          margin: '40px auto 0',
          lineHeight: '1.5'
        }}>
          🌺 Descubre la hermosa tradición del Día de Muertos y crea versos únicos 🌺
        </p>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes glow {
          from { 
            text-shadow: 0 0 40px rgba(251, 146, 60, 0.6), 0 0 80px rgba(236, 72, 153, 0.4); 
          }
          to { 
            text-shadow: 0 0 60px rgba(251, 146, 60, 0.8), 0 0 100px rgba(236, 72, 153, 0.6); 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        /* Responsive para botones */
        @media (max-width: 768px) {
          .button-container {
            flex-direction: column !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;