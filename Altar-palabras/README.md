# 🌺 Altar de Palabras - Día de Muertos 💀

Una aplicación web interactiva que celebra la tradición mexicana del Día de Muertos mediante la creación de calaveritas literarias personalizadas y un altar virtual completamente interactivo con sistema de drag & drop.

## ✨ Características

### 🎨 Altar Interactivo con Drag & Drop (NUEVO)
- **Sistema de Arrastrar y Soltar**: Arrastra elementos desde el panel lateral al altar
- **3 Niveles de Altar**: Estructura tradicional con nivel superior, medio e inferior
- **Grid Inteligente**: Sistema de 4x3 posiciones por nivel con feedback visual
- **Máximo 3 Elementos por Posición**: Apilamiento automático con z-index
- **20 Elementos Máximo**: Control de límites para rendimiento óptimo
- **Panel Colapsable**: Oculta/muestra el panel de elementos
- **Controles Avanzados**: Limpiar, guardar, cargar y exportar altar

### 📸 Sistema de Fotos Personalizadas (NUEVO)
- **Subida de Imágenes**: Sube fotos de tus seres queridos (JPG, PNG, GIF)
- **Redimensionamiento Automático**: Optimización a 300x300px máximo
- **Máximo 5MB por Foto**: Validación de tamaño de archivo
- **Máximo 5 Fotos**: Control de límites de almacenamiento
- **Nombres Personalizados**: Agrega nombres a cada foto
- **Marcos Decorativos**: Aplicación automática de marcos

### 🎯 Panel de Elementos Completo (MEJORADO)
- **6 Categorías Organizadas**:
  - 🕯️ **Velas**: 3 colores (naranja, morado, blanco)
  - 🌼 **Flores**: Cempasúchil en 3 tamaños
  - 🍞 **Comida**: Pan de muerto, calaveras de azúcar, sal
  - 🍊 **Frutas**: Naranja, manzana, plátano
  - 🖼️ **Fotos**: Tus imágenes subidas
  - 💧 **Otros**: Agua, papel picado, marcos, calaveritas literarias

- **Generador de Calaveritas con IA**: 
  - 🤖 **Gemini AI**: Calaveritas únicas y personalizadas
  - 3 tonos diferentes (Chistosa, Respetuosa, Satírica)
  - Campo opcional para ocupación/característica
  - Sistema de fallback con plantillas tradicionales
  - Botón regenerar para crear nuevas versiones
  - Efecto de sonido al generar
- **Persistencia Automática**: 
  - Auto-guardado en localStorage con debounce
  - Restauración automática al recargar
  - Notificaciones de guardado y restauración
  - Botón "Limpiar Todo" con confirmación
- **Historial de Calaveritas**: 
  - Almacena las últimas 3 calaveritas generadas
  - Sección colapsable con preview de cada calaverita
  - Botones para restaurar o eliminar calaveritas anteriores
  - Fechas formateadas en español
- **Exportación de Imagen**: 
  - Descarga tu altar como PNG de alta calidad
  - Watermark sutil incluido
  - Captura completa del altar y calaverita
  - Nombre de archivo personalizado
- **Modal de Elementos**: 
  - 20+ elementos organizados en 3 categorías (Flores, Comida, Decoración)
  - Modal centrado con animaciones suaves
  - Contador visual de elementos colocados
- **Diseño Responsivo**: Layout de 2 columnas optimizado
- **Animaciones Suaves**: Efectos visuales que mejoran la experiencia del usuario
- **Tipografía Temática**: Fuentes especiales que evocan la tradición mexicana

## 🎨 Paleta de Colores

- **Primario**: `#FF6B35` (Naranja cempasúchil)
- **Secundario**: `#6A0572` (Morado profundo)
- **Acento**: `#FFC300` (Amarillo oro)
- **Fondo**: `#1A1A2E` (Negro-azul oscuro)
- **Texto**: `#FFFFFF` y `#F0F0F0`

## 🚀 Tecnologías Utilizadas

- **React 18+** con Hooks (useState, useEffect, custom hooks)
- **Vite** como bundler
- **Tailwind CSS v4** para estilos
- **react-dnd + react-dnd-html5-backend** para drag & drop
- **Google Generative AI** (Gemini 2.5 Flash + 2.0 Flash) para calaveritas únicas
- **html-to-image + html2canvas** para exportación de imágenes
- **Canvas API** para procesamiento de imágenes
- **localStorage** para persistencia de datos
- **Google Fonts** (Creepster, Lora)
- **JavaScript ES6+**

## 📱 Funcionalidades

### 🎮 Dos Modos de Uso
- **Modo Generador**: Enfoque en crear calaveritas con altar simple
- **Modo Altar Interactivo**: Experiencia completa de drag & drop
- **Cambio Fluido**: Alterna entre modos con un clic

### 🎨 Altar Interactivo Avanzado
- **Sistema Drag & Drop**: Arrastra elementos desde panel al altar
- **3 Niveles Visuales**: Superior, medio e inferior con perspectiva 3D
- **Grid 4x3**: 12 posiciones por nivel (36 total)
- **Apilamiento**: Hasta 3 elementos por posición con z-index automático
- **Feedback Visual**: Colores y animaciones durante arrastre
- **Límites Inteligentes**: Máximo 20 elementos total, validación en tiempo real

### 📸 Gestión de Fotos
- **Subida Intuitiva**: Modal elegante con drag & drop
- **Procesamiento Automático**: Redimensionamiento y compresión
- **Validación Completa**: Tipo, tamaño y cantidad de archivos
- **Persistencia**: Almacenamiento en base64 en localStorage
- **Integración**: Las fotos se convierten en elementos arrastrables

### 🎯 Panel de Elementos Dinámico
- **Categorías Organizadas**: Pestañas para fácil navegación
- **Elementos Responsivos**: Diferentes tamaños según tipo
- **Vista de Fotos**: Categoría especial para imágenes subidas
- **Botón Especial**: Acceso directo para subir fotos
- **Scroll Inteligente**: Manejo de muchos elementos

### 🔧 Controles Avanzados
- **Panel Toggle**: Mostrar/ocultar panel lateral
- **Grid Helper**: Mostrar/ocultar guías de posición
- **Limpiar Altar**: Remover todos los elementos con confirmación
- **Exportar/Importar**: Guardar/cargar configuraciones como JSON
- **Exportar Imagen**: Descargar altar como PNG de alta calidad
- **Contador**: Visualización en tiempo real de elementos usados

### 📊 Sistema de Persistencia Mejorado
- **Auto-guardado**: Estado del altar se guarda automáticamente
- **Múltiples Storages**: Separación entre altar, fotos e historial
- **Recuperación**: Carga automática al reiniciar aplicación
- **Exportación**: Descarga configuraciones para respaldo
- **Importación**: Carga altares guardados previamente

### Formulario Mejorado (Modo Generador)
- Input para nombre de la persona
- Campo opcional para ocupación/característica
- Selector de tono (😄 Chistosa, 🙏 Respetuosa, 😈 Satírica)
- Botón regenerar con efecto de sonido
- Validación en tiempo real

### Historial de Calaveritas
- **Almacenamiento**: Últimas 3 calaveritas en localStorage
- **Vista colapsable**: Expandir/contraer con animaciones
- **Preview**: Primeras 2 líneas de cada calaverita
- **Metadatos**: Nombre, ocupación, tono y fecha
- **Acciones**: Restaurar calaverita completa o eliminar del historial
- **Formato de fecha**: Español legible (ej: "29 oct, 10:30 AM")

## 🛠️ Instalación y Uso

1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repo]
   cd Altar-palabras
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Configurar Gemini AI (opcional)**
   ```bash
   # Copiar archivo de configuración
   cp .env.example .env
   
   # Editar .env y agregar tu API key de Gemini
   # Obtener API key gratuita en: https://aistudio.google.com/app/apikey
   ```

5. **Construir para producción**
   ```bash
   npm run build
   ```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── AltarInteractivo.jsx      # 🆕 Componente principal del altar drag & drop
│   ├── PanelElementos.jsx        # 🆕 Panel lateral con elementos arrastrables
│   ├── ElementoArrastrable.jsx   # 🆕 Componente individual arrastrable
│   ├── ZonaAltar.jsx            # 🆕 Área del altar con 3 niveles
│   ├── CeldaAltar.jsx           # 🆕 Celda individual que recibe elementos
│   ├── ControladorAltar.jsx     # 🆕 Controles del altar (botones de acción)
│   ├── SubidorFoto.jsx          # 🆕 Modal para subir fotos
│   ├── Altar.jsx                # Altar simple original
│   ├── Calaverita.jsx           # Display de versos
│   ├── DescargaImagen.jsx       # Exportación a PNG
│   ├── Footer.jsx               # Información cultural
│   ├── Formulario.jsx           # Formulario mejorado
│   ├── HistorialCalaveritas.jsx # Historial de calaveritas anteriores
│   ├── ModalConfirmacion.jsx    # Modal de confirmación
│   ├── ModalElementos.jsx       # Modal para seleccionar elementos
│   ├── Notificaciones.jsx       # Sistema de notificaciones
│   ├── SeccionCalaverita.jsx    # Sección separada para calaverita
│   └── SelectorElementos.jsx    # Selector para slots específicos
├── hooks/
│   ├── useAltarState.js         # 🆕 Hook para manejar estado del altar interactivo
│   ├── useHistorialCalaveritas.js # Hook para gestión del historial
│   └── useLocalStorage.js       # Hook para persistencia
├── utils/
│   └── generadorCalaveritas.js  # Lógica de generación con tonos
├── App.jsx                      # 🔄 Componente principal con dos modos
├── index.css                    # Estilos globales con Tailwind
└── main.jsx                     # Punto de entrada
```

## 🎮 Guía de Uso del Altar Interactivo

### Acceder al Modo Interactivo
1. Desde la página principal, haz clic en "🎨 Altar Interactivo"
2. O usa el botón en el header para cambiar entre modos

### Crear tu Altar Personalizado
1. **Agregar Elementos**:
   - Selecciona una categoría en el panel lateral
   - Arrastra elementos desde el panel al altar
   - Coloca hasta 3 elementos por posición
   - Máximo 20 elementos en total

2. **Subir Fotos de Seres Queridos**:
   - Haz clic en "📸 Subir Foto de Ser Querido"
   - Selecciona imagen (JPG, PNG, GIF, máx 5MB)
   - Agrega nombre opcional
   - La foto aparecerá en la categoría "Fotos"
   - Arrastra al altar como cualquier otro elemento

3. **Controles del Altar**:
   - **🎨 Panel**: Mostrar/ocultar panel lateral
   - **📐 Grid**: Mostrar/ocultar guías de posición
   - **🗑️ Limpiar**: Remover todos los elementos
   - **💾 Guardar**: Exportar configuración como JSON
   - **📁 Cargar**: Importar altar guardado
   - **🖼️ Exportar**: Descargar imagen PNG del altar

### Limitaciones del Sistema
- **Máximo 20 elementos** en el altar total
- **Máximo 3 elementos** por posición
- **Máximo 5 fotos** subidas
- **Máximo 5MB** por foto
- **Formatos soportados**: JPG, PNG, GIF

## 🎭 Sobre las Calaveritas Literarias

Las calaveritas literarias son una tradición mexicana del Día de Muertos que consiste en versos humorísticos que hablan de la muerte de manera jocosa y respetuosa. Esta aplicación honra esa tradición permitiendo crear calaveritas personalizadas y altares virtuales interactivos.

## 🌟 Características Técnicas

- **Mobile-First**: Diseño responsivo que prioriza dispositivos móviles
- **Accesibilidad**: Etiquetas semánticas y contraste adecuado
- **Performance**: Optimizado con Vite y componentes eficientes
- **SEO**: Meta tags apropiados y estructura semántica

## 🎨 Diseño

El diseño está inspirado en los colores tradicionales del Día de Muertos:
- Naranjas vibrantes de las flores de cempasúchil
- Morados profundos de las decoraciones
- Dorados que representan la luz de las velas
- Fondos oscuros que evocan la noche de los muertos

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📜 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para detalles.

## 🙏 Agradecimientos

- A la rica tradición cultural mexicana del Día de Muertos
- A las familias que mantienen vivas estas tradiciones
- A los artistas y escritores de calaveritas literarias

---

*"La muerte no nos roba los seres amados. Al contrario, nos los guarda y nos los inmortaliza en el recuerdo."* - Tradición Mexicana