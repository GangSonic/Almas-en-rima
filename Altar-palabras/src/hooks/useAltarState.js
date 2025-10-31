import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'altar-interactivo-state';
const FOTOS_STORAGE_KEY = 'altar-fotos-subidas';
const MAX_ELEMENTOS = 20;
const MAX_ELEMENTOS_POR_CELDA = 3;
const MAX_FOTOS = 5;

export const useAltarState = () => {
  const [elementos, setElementos] = useState([]);
  const [fotosSubidas, setFotosSubidas] = useState([]);

  // Cargar estado inicial desde localStorage
  useEffect(() => {
    const estadoGuardado = localStorage.getItem(STORAGE_KEY);
    const fotosGuardadas = localStorage.getItem(FOTOS_STORAGE_KEY);
    
    if (estadoGuardado) {
      try {
        const estado = JSON.parse(estadoGuardado);
        setElementos(estado.elementos || []);
      } catch (error) {
        console.error('Error al cargar estado del altar:', error);
      }
    }
    
    if (fotosGuardadas) {
      try {
        const fotos = JSON.parse(fotosGuardadas);
        setFotosSubidas(fotos || []);
      } catch (error) {
        console.error('Error al cargar fotos:', error);
      }
    }
  }, []);

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    const estado = { elementos };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  }, [elementos]);

  // Guardar fotos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem(FOTOS_STORAGE_KEY, JSON.stringify(fotosSubidas));
  }, [fotosSubidas]);

  const agregarElemento = useCallback((tipo, posicion, props = {}, emoji = '', nombre = '') => {
    if (elementos.length >= MAX_ELEMENTOS) {
      alert(`Máximo ${MAX_ELEMENTOS} elementos permitidos en el altar`);
      return false;
    }

    const elementosEnPosicion = elementos.filter(
      el => el.posicion.nivel === posicion.nivel && 
           el.posicion.x === posicion.x && 
           el.posicion.y === posicion.y
    );

    if (elementosEnPosicion.length >= MAX_ELEMENTOS_POR_CELDA) {
      alert(`Máximo ${MAX_ELEMENTOS_POR_CELDA} elementos por posición`);
      return false;
    }

    const nuevoElemento = {
      id: `elem-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      tipo,
      emoji,
      nombre,
      posicion: {
        ...posicion,
        z: elementosEnPosicion.length // Apilar elementos
      },
      props: {
        ...props,
        fechaCreacion: new Date().toISOString()
      }
    };

    setElementos(prev => [...prev, nuevoElemento]);
    return true;
  }, [elementos]);

  const moverElemento = useCallback((elementoId, nuevaPosicion) => {
    const elementosEnDestino = elementos.filter(
      el => el.id !== elementoId &&
           el.posicion.nivel === nuevaPosicion.nivel && 
           el.posicion.x === nuevaPosicion.x && 
           el.posicion.y === nuevaPosicion.y
    );

    if (elementosEnDestino.length >= MAX_ELEMENTOS_POR_CELDA) {
      alert(`Máximo ${MAX_ELEMENTOS_POR_CELDA} elementos por posición`);
      return false;
    }

    setElementos(prev => prev.map(elemento => {
      if (elemento.id === elementoId) {
        return {
          ...elemento,
          posicion: {
            ...nuevaPosicion,
            z: elementosEnDestino.length
          }
        };
      }
      return elemento;
    }));
    return true;
  }, [elementos]);

  const eliminarElemento = useCallback((elementoId) => {
    setElementos(prev => prev.filter(elemento => elemento.id !== elementoId));
  }, []);

  const limpiarAltar = useCallback(() => {
    if (window.confirm('¿Estás seguro de que quieres limpiar todo el altar?')) {
      setElementos([]);
    }
  }, []);

  const guardarAltar = useCallback(() => {
    const estado = { elementos, fechaGuardado: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(estado, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `altar-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [elementos]);

  const cargarAltar = useCallback((archivo) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const estado = JSON.parse(e.target.result);
        if (estado.elementos && Array.isArray(estado.elementos)) {
          setElementos(estado.elementos);
          alert('Altar cargado exitosamente');
        } else {
          alert('Archivo de altar inválido');
        }
      } catch (error) {
        alert('Error al cargar el archivo del altar');
        console.error('Error:', error);
      }
    };
    reader.readAsText(archivo);
  }, []);

  const agregarFoto = useCallback((fotoData) => {
    if (fotosSubidas.length >= MAX_FOTOS) {
      alert(`Máximo ${MAX_FOTOS} fotos permitidas`);
      return false;
    }

    const nuevaFoto = {
      id: `foto-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...fotoData,
      fechaSubida: new Date().toISOString()
    };

    setFotosSubidas(prev => [...prev, nuevaFoto]);
    return nuevaFoto;
  }, [fotosSubidas]);

  const eliminarFoto = useCallback((fotoId) => {
    setFotosSubidas(prev => prev.filter(foto => foto.id !== fotoId));
    // También eliminar elementos del altar que usen esta foto
    setElementos(prev => prev.filter(elemento => 
      elemento.tipo !== 'foto' || elemento.props.id !== fotoId
    ));
  }, []);

  const contadorElementos = {
    total: elementos.length,
    maximo: MAX_ELEMENTOS,
    fotos: fotosSubidas.length,
    maxFotos: MAX_FOTOS,
    porTipo: elementos.reduce((acc, elemento) => {
      acc[elemento.tipo] = (acc[elemento.tipo] || 0) + 1;
      return acc;
    }, {})
  };

  return {
    elementos,
    fotosSubidas,
    agregarElemento,
    moverElemento,
    eliminarElemento,
    agregarFoto,
    eliminarFoto,
    limpiarAltar,
    guardarAltar,
    cargarAltar,
    contadorElementos
  };
};