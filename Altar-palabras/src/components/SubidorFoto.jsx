import React, { useState, useRef } from 'react';

const SubidorFoto = ({ onFotoSubida, onCerrar }) => {
  const [previsualizacion, setPrevisualizacion] = useState(null);
  const [nombreFoto, setNombreFoto] = useState('');
  const [cargando, setCargando] = useState(false);
  const inputFileRef = useRef(null);

  const handleArchivoSeleccionado = (event) => {
    const archivo = event.target.files[0];
    if (!archivo) return;

    // Validar tipo de archivo
    const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!tiposPermitidos.includes(archivo.type)) {
      alert('Solo se permiten archivos JPG, PNG, GIF o WEBP');
      return;
    }

    // Validar tamaño (5MB máximo)
    const tamañoMaximo = 5 * 1024 * 1024; // 5MB en bytes
    if (archivo.size > tamañoMaximo) {
      alert('El archivo es demasiado grande. Máximo 5MB permitido.');
      return;
    }

    setCargando(true);

    // Crear preview
    const reader = new FileReader();
    reader.onload = (e) => {
      // Crear imagen para redimensionar
      const img = new Image();
      img.onload = () => {
        try {
          // Redimensionar imagen
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calcular nuevas dimensiones (máximo 250x250 para el altar)
          const maxSize = 250;
          let { width, height } = img;
          
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          
          // Dibujar imagen redimensionada
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convertir a base64 con mejor calidad
          const imagenRedimensionada = canvas.toDataURL('image/jpeg', 0.9);
          setPrevisualizacion(imagenRedimensionada);
          setCargando(false);
        } catch (error) {
          console.error('Error al procesar imagen:', error);
          alert('Error al procesar la imagen. Intenta con otra.');
          setCargando(false);
        }
      };
      img.onerror = () => {
        alert('Error al cargar la imagen. Verifica que sea un archivo válido.');
        setCargando(false);
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      alert('Error al leer el archivo.');
      setCargando(false);
    };
    reader.readAsDataURL(archivo);
  };

  const handleConfirmar = () => {
    if (!previsualizacion) {
      alert('Por favor selecciona una imagen');
      return;
    }

    const fotoData = {
      src: previsualizacion,
      nombre: nombreFoto.trim() || 'Sin nombre',
      fechaSubida: new Date().toISOString()
    };

    onFotoSubida(fotoData);
    onCerrar();
  };

  const handleEliminarPreview = () => {
    setPrevisualizacion(null);
    setNombreFoto('');
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '50',
      padding: '16px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgb(88, 28, 135), rgb(124, 58, 237))',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        border: '2px solid rgba(251, 191, 36, 0.3)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#fbbf24'
          }}>
            📸 Agregar Foto al Altar
          </h3>
          <button
            onClick={onCerrar}
            style={{
              color: '#fbbf24',
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#fed7aa'}
            onMouseLeave={(e) => e.target.style.color = '#fbbf24'}
          >
            ×
          </button>
        </div>

        {/* Área de subida */}
        {!previsualizacion ? (
          <div className="space-y-4">
            <div
              onClick={() => inputFileRef.current?.click()}
              className="border-2 border-dashed border-orange-400/50 rounded-lg p-8 
                         text-center cursor-pointer hover:border-orange-400 
                         hover:bg-orange-400/5 transition-all duration-200"
            >
              {cargando ? (
                <div className="text-orange-300">
                  <div className="animate-spin text-3xl mb-2">⏳</div>
                  <p>Procesando imagen...</p>
                </div>
              ) : (
                <div className="text-orange-300">
                  <div className="text-4xl mb-2">📁</div>
                  <p className="font-medium">Haz clic para seleccionar</p>
                  <p className="text-sm text-orange-200 mt-1">
                    JPG, PNG, GIF (máx. 5MB)
                  </p>
                </div>
              )}
            </div>

            <input
              ref={inputFileRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              onChange={handleArchivoSeleccionado}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Preview de la imagen */}
            <div className="relative">
              <img
                src={previsualizacion}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border-2 border-orange-400/30"
              />
              <button
                onClick={handleEliminarPreview}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 
                         text-white rounded-full w-8 h-8 flex items-center justify-center
                         font-bold text-sm transition-colors"
              >
                ×
              </button>
            </div>

            {/* Input para nombre */}
            <div>
              <label className="block text-orange-300 font-medium mb-2">
                Nombre (opcional):
              </label>
              <input
                type="text"
                value={nombreFoto}
                onChange={(e) => setNombreFoto(e.target.value)}
                placeholder="Ej: Abuela María, Papá Juan..."
                className="w-full px-3 py-2 bg-purple-800 border border-orange-400/30 
                         rounded-lg text-orange-100 placeholder-orange-300/50
                         focus:border-orange-400 focus:outline-none"
                maxLength={50}
              />
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={handleEliminarPreview}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 
                         text-white rounded-lg transition-colors"
              >
                Cambiar Foto
              </button>
              <button
                onClick={handleConfirmar}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 
                         text-white rounded-lg transition-colors font-medium"
              >
                Agregar al Altar
              </button>
            </div>
          </div>
        )}

        {/* Información */}
        <div className="mt-4 p-3 bg-purple-800/50 rounded-lg border border-orange-400/20">
          <p className="text-orange-200 text-sm">
            💡 Las fotos se redimensionan automáticamente y se guardan en tu navegador
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubidorFoto;