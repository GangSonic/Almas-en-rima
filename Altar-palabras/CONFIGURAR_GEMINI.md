# 🤖 Configurar Gemini AI para Calaveritas Únicas

## ⚠️ Problema Actual
Los errores que ves indican que:
1. **API key expirada o inválida**
2. **Modelos no disponibles** en tu región/cuenta

## 🔧 Solución Paso a Paso

### 1. Obtener Nueva API Key
1. Ve a: https://aistudio.google.com/app/apikey
2. Inicia sesión con tu cuenta de Google
3. Haz click en "Create API Key"
4. Selecciona un proyecto o crea uno nuevo
5. Copia la API key generada

### 2. Configurar en la Aplicación
1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza la línea:
   ```
   VITE_GEMINI_API_KEY=tu_api_key_de_gemini_aqui
   ```
   Por:
   ```
   VITE_GEMINI_API_KEY=TU_API_KEY_REAL_AQUI
   ```

### 3. Reiniciar el Servidor
```bash
# Detener el servidor (Ctrl+C)
# Luego reiniciar:
npm run dev
```

### 4. Probar la Conexión
1. Ve a la aplicación en el navegador
2. Si ves "API Key no configurada", haz click en "Probar IA"
3. Debería mostrar "✅ Conexión exitosa con Gemini"

## 🚨 Si Sigue Fallando

### Opción A: Verificar Restricciones
- Algunos países tienen restricciones en Gemini
- Verifica en: https://ai.google.dev/available_regions

### Opción B: Usar Solo Plantillas
- La aplicación funciona perfectamente sin IA
- Las calaveritas tradicionales son auténticas y divertidas
- Simplemente ignora los errores de IA

### Opción C: API Key Alternativa
1. Crea una nueva cuenta de Google
2. Genera una nueva API key
3. Prueba con esa cuenta

## 📝 Notas Importantes
- **Gemini es GRATUITO** hasta 60 requests/minuto
- **No necesitas tarjeta de crédito**
- **La aplicación funciona sin IA** usando plantillas tradicionales
- **Los errores de IA no afectan** la funcionalidad principal

## 🎭 Estado Actual
- ✅ Aplicación funcionando al 100%
- ✅ Calaveritas tradicionales disponibles
- ✅ Todas las funciones (altar, historial, descarga) operativas
- ⚠️ IA opcional (mejora la experiencia pero no es esencial)

¡La aplicación "Altar de Palabras" está completa y funcional con o sin IA!