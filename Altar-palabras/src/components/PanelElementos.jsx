import React, { useState } from 'react';
import ElementoArrastrable from './ElementoArrastrable';
import SubidorFoto from './SubidorFoto';

const getElementosDisponibles = (fotosSubidas) => ({
  velas: [
    { tipo: 'vela', props: { color: 'naranja' }, emoji: '🕯️', nombre: 'Vela Naranja' },
    { tipo: 'vela', props: { color: 'morado' }, emoji: '🕯️', nombre: 'Vela Morada' },
    { tipo: 'vela', props: { color: 'blanco' }, emoji: '🕯️', nombre: 'Vela Blanca' },
    { tipo: 'vela', props: { color: 'roja' }, emoji: '🕯️', nombre: 'Vela Roja' }
  ],
  flores: [
    { tipo: 'flor', props: { tamaño: 'pequeño' }, emoji: '🌼', nombre: 'Cempasúchil Pequeña' },
    { tipo: 'flor', props: { tamaño: 'mediano' }, emoji: '🌻', nombre: 'Cempasúchil Mediana' },
    { tipo: 'flor', props: { tamaño: 'grande' }, emoji: '🌺', nombre: 'Cempasúchil Grande' },
    { tipo: 'flor', props: { tamaño: 'ramo' }, emoji: '💐', nombre: 'Ramo de Flores' }
  ],
  comida: [
    { tipo: 'pan', props: {}, emoji: '🍞', nombre: 'Pan de Muerto' },
    { tipo: 'calavera', props: {}, emoji: '💀', nombre: 'Calavera de Azúcar' },
    { tipo: 'sal', props: {}, emoji: '🧂', nombre: 'Sal' },
    { tipo: 'chocolate', props: {}, emoji: '🍫', nombre: 'Chocolate' }
  ],
  frutas: [
    { tipo: 'fruta', props: { tipo: 'naranja' }, emoji: '🍊', nombre: 'Naranja' },
    { tipo: 'fruta', props: { tipo: 'manzana' }, emoji: '🍎', nombre: 'Manzana' },
    { tipo: 'fruta', props: { tipo: 'platano' }, emoji: '🍌', nombre: 'Plátano' },
    { tipo: 'fruta', props: { tipo: 'uvas' }, emoji: '🍇', nombre: 'Uvas' }
  ],
  fotos: fotosSubidas.map(foto => ({
    tipo: 'foto',
    props: foto,
    emoji: '🖼️',
    nombre: `${foto.nombre}`
  })),
  otros: [
    { tipo: 'agua', props: {}, emoji: '💧', nombre: 'Vaso de Agua' },
    { tipo: 'papel', props: { color: 'multicolor' }, emoji: '🎀', nombre: 'Papel Picado' },
    { tipo: 'incienso', props: {}, emoji: '🔥', nombre: 'Incienso' },
    { tipo: 'calavera-literaria', props: {}, emoji: '📜', nombre: 'Calavera Literaria' }
  ]
});

const PanelElementos = ({ fotosSubidas = [], onAgregarFoto, onEliminarFoto }) => {
  const [categoriaActiva, setCategoriaActiva] = useState('velas');
  const [mostrarSubidorFoto, setMostrarSubidorFoto] = useState(false);

  const ELEMENTOS_DISPONIBLES = getElementosDisponibles(fotosSubidas);
  const categorias = Object.keys(ELEMENTOS_DISPONIBLES);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgb(88, 28, 135), rgb(124, 58, 237))',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      border: '2px solid rgba(251, 191, 36, 0.3)'
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#fbbf24',
        marginBottom: '16px',
        textAlign: 'center'
      }}>
        🎨 Elementos del Altar
      </h3>

      {/* Pestañas de categorías */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        marginBottom: '16px'
      }}>
        {categorias.map(categoria => (
          <button
            key={categoria}
            onClick={() => setCategoriaActiva(categoria)}
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              backgroundColor: categoriaActiva === categoria ? '#ea580c' : 'rgb(88, 28, 135)',
              color: categoriaActiva === categoria ? 'white' : '#fed7aa',
              border: 'none',
              cursor: 'pointer',
              boxShadow: categoriaActiva === categoria ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (categoriaActiva !== categoria) {
                e.target.style.backgroundColor = 'rgb(124, 58, 237)';
              }
            }}
            onMouseLeave={(e) => {
              if (categoriaActiva !== categoria) {
                e.target.style.backgroundColor = 'rgb(88, 28, 135)';
              }
            }}
          >
            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid de elementos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        maxHeight: '384px',
        overflowY: 'auto'
      }}>
        {ELEMENTOS_DISPONIBLES[categoriaActiva].map((elemento, index) => (
          <ElementoArrastrable
            key={`${elemento.tipo}-${index}`}
            elemento={elemento}
            esNuevo={true}
          />
        ))}
      </div>

      {/* Botón especial para subir fotos */}
      <div style={{ marginTop: '16px' }}>
        <button
          onClick={() => setMostrarSubidorFoto(true)}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #ea580c, #7c3aed)',
            color: 'white',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #dc2626, #6d28d9)';
            e.target.style.transform = 'scale(1.02)';
            e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #ea580c, #7c3aed)';
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
        >
          📸 Subir Foto de Ser Querido
        </button>
      </div>

      {/* Instrucciones */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        background: 'rgba(88, 28, 135, 0.5)',
        borderRadius: '8px',
        border: '1px solid rgba(251, 191, 36, 0.2)'
      }}>
        <p style={{
          color: '#fed7aa',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          💡 Arrastra los elementos al altar para crear tu ofrenda personalizada
        </p>
      </div>

      {/* Modal de subida de fotos */}
      {mostrarSubidorFoto && (
        <SubidorFoto
          onFotoSubida={(fotoData) => {
            if (onAgregarFoto) {
              onAgregarFoto(fotoData);
            }
          }}
          onCerrar={() => setMostrarSubidorFoto(false)}
        />
      )}
    </div>
  );
};

export default PanelElementos;