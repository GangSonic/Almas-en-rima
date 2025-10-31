// testAPI.mjs
import { readFileSync } from 'fs'

// Leer el archivo .env manualmente
const envFile = readFileSync('.env', 'utf-8')
const apiKey = envFile.split('\n')
  .find(line => line.startsWith('VITE_GEMINI_API_KEY'))
  ?.split('=')[1]
  ?.trim()

console.log('🔑 API Key configurada:', apiKey ? 'SÍ ✅' : 'NO ❌')
console.log('🔑 Primeros 10 caracteres:', apiKey?.substring(0, 10))

async function listarModelos() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    )
    
    if (!response.ok) {
      const error = await response.json()
      console.error('❌ Error:', error)
      return
    }

    const data = await response.json()
    
    console.log('\n✅ MODELOS DISPONIBLES:\n')
    
    const modelosValidos = data.models?.filter(m => 
      m.supportedGenerationMethods?.includes('generateContent')
    )

    if (modelosValidos && modelosValidos.length > 0) {
      console.log('🎯 Modelos que puedes usar:\n')
      modelosValidos.forEach(model => {
        const nombreModelo = model.name.replace('models/', '')
        console.log(`   ✅ ${nombreModelo}`)
      })
      
      console.log('\n💡 Usa cualquiera de estos en tu código')
    } else {
      console.log('❌ No hay modelos disponibles con esta API key')
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

listarModelos()