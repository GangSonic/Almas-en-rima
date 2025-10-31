#!/bin/bash

# 🚀 Script de Deploy para Vercel - Altar de Palabras

echo "🎭 Preparando deploy de Altar de Palabras..."

# Verificar que estemos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Ejecuta este script desde la carpeta del proyecto."
    exit 1
fi

# Limpiar y hacer build
echo "🧹 Limpiando archivos anteriores..."
rm -rf dist

echo "📦 Instalando dependencias..."
npm install

echo "🔨 Construyendo aplicación..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build exitoso!"
    echo "📊 Tamaño de archivos:"
    ls -lh dist/assets/
    
    echo ""
    echo "🚀 Listo para deploy en Vercel!"
    echo ""
    echo "Próximos pasos:"
    echo "1. Sube tu código a GitHub"
    echo "2. Ve a vercel.com e importa tu repositorio"
    echo "3. Configura la variable VITE_GEMINI_API_KEY"
    echo "4. ¡Deploy automático!"
    echo ""
    echo "O usa Vercel CLI:"
    echo "npm i -g vercel && vercel"
else
    echo "❌ Error en el build. Revisa los errores arriba."
    exit 1
fi