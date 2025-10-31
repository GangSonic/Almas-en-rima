import { GoogleGenerativeAI } from '@google/generative-ai'

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export async function generarCalaveritaConIA(nombre, ocupacion = '', tono = 'chistosa') {
  // Validar entrada
  if (!nombre || nombre.trim().length === 0) {
    throw new Error('Nombre es requerido')
  }

  // Lista de modelos para probar en orden de preferencia (basado en tu API key)
  const modelosParaProbar = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.5-pro',
    'gemini-2.0-flash-exp',
    'gemini-flash-latest'
  ]

  for (const nombreModelo of modelosParaProbar) {
    try {
      console.log(`🔍 Probando modelo: ${nombreModelo}`)

      const tonoDescripcion = {
        'chistosa': 'humorística y juguetona, con chistes y situaciones cómicas típicas mexicanas',
        'respetuosa': 'respetuosa y emotiva, honrando a la persona con cariño y dignidad',
        'satirica': 'satírica y pícara, con ironía y crítica social sutil pero divertida'
      }

      const model = genAI.getGenerativeModel({
        model: nombreModelo,
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1000,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_ONLY_HIGH'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_ONLY_HIGH'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_ONLY_HIGH'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_ONLY_HIGH'
          }
        ]
      })

      // Prompt optimizado para Gemini 2.5
      const prompt = `Crea una calaverita literaria mexicana para ${nombre}${ocupacion ? ` (${ocupacion})` : ''}.

FORMATO: 4 estrofas de 4 versos cada una, con rima tradicional mexicana.
TONO: ${tonoDescripcion[tono]}
INCLUIR: El nombre "${nombre}" y referencias a "la muerte" o "la catrina"

EJEMPLO DE ESTRUCTURA:
La muerte andaba buscando
por las calles de la ciudad,
a ${nombre} contemplando
con mucha curiosidad.

[Continúa con 3 estrofas más siguiendo el mismo patrón]

INSTRUCCIONES:
- Solo escribe los versos de la calaverita
- No agregues títulos ni explicaciones
- Separa cada estrofa con una línea en blanco
- Usa lenguaje mexicano tradicional pero comprensible
- Que sea ${tono} pero respetuosa con la tradición`

      console.log(`🚀 Generando calaverita con ${nombreModelo}...`)

      const result = await model.generateContent(prompt)
      const response = result.response

      // Debug detallado de la respuesta
      console.log('📦 Respuesta completa recibida')
      console.log('📊 Candidatos disponibles:', response.candidates?.length || 0)

      // Verificar si hay candidatos
      if (!response.candidates || response.candidates.length === 0) {
        console.error('❌ No hay candidatos en la respuesta')
        console.log('🔍 Respuesta completa:', JSON.stringify(response, null, 2))
        throw new Error('La API no devolvió ningún candidato')
      }

      const candidate = response.candidates[0]
      const finishReason = candidate.finishReason
      console.log('🏁 Motivo de finalización:', finishReason)

      // Manejar diferentes motivos de finalización
      if (finishReason === 'SAFETY') {
        console.warn('⚠️ Contenido bloqueado por seguridad, probando siguiente modelo...')
        continue // Probar siguiente modelo
      }

      if (finishReason === 'RECITATION') {
        console.warn('⚠️ Contenido bloqueado por recitación, probando siguiente modelo...')
        continue // Probar siguiente modelo
      }

      // Intentar extraer el texto de múltiples formas
      let calaverita = ''

      try {
        // Método 1: response.text()
        calaverita = response.text().trim()
        console.log('✅ Texto extraído con response.text()')
      } catch (textError) {
        console.warn('⚠️ Error con response.text():', textError.message)

        try {
          // Método 2: Acceso directo a la estructura
          if (candidate.content?.parts?.[0]?.text) {
            calaverita = candidate.content.parts[0].text.trim()
            console.log('✅ Texto extraído con acceso directo')
          } else {
            console.error('❌ No se encontró texto en la estructura')
            console.log('🔍 Estructura del candidato:', JSON.stringify(candidate, null, 2))
            throw new Error('No se pudo extraer el texto de la respuesta')
          }
        } catch (directError) {
          console.error('❌ Error con acceso directo:', directError.message)
          throw new Error('No se pudo extraer el texto de la respuesta')
        }
      }

      console.log('📝 Calaverita extraída, longitud:', calaverita.length)
      if (calaverita.length > 0) {
        console.log('👀 Primeros 100 caracteres:', calaverita.substring(0, 100))
      }

      // Validar que tenga contenido suficiente
      if (!calaverita || calaverita.length < 50) {
        console.error('❌ Calaverita muy corta:', calaverita)
        console.log('🔍 Probando siguiente modelo...')
        continue // Probar siguiente modelo
      }

      // Validar que tenga aproximadamente 4 estrofas
      const estrofas = calaverita.split('\n\n').filter(e => e.trim().length > 0)
      if (estrofas.length < 2) {
        console.warn('⚠️ Calaverita con muy pocas estrofas, probando siguiente modelo...')
        continue // Probar siguiente modelo
      }

      console.log(`✅ Calaverita generada con éxito usando ${nombreModelo}`)
      console.log(`📊 Estadísticas: ${calaverita.length} caracteres, ${estrofas.length} estrofas`)

      return {
        success: true,
        calaverita: calaverita,
        metadata: {
          nombre,
          ocupacion,
          tono,
          modelo: nombreModelo,
          timestamp: new Date().toISOString()
        }
      }

    } catch (error) {
      console.error(`❌ Error con modelo ${nombreModelo}:`, error.message)
      // Continuar con el siguiente modelo
      continue
    }
  }

  // Si todos los modelos fallaron
  console.error('❌ Todos los modelos fallaron')
  return {
    success: false,
    error: 'Todos los modelos disponibles fallaron',
    fallback: true
  }
}


// Función de fallback que usa plantillas si Gemini falla
export function generarCalaveritaFallback(nombre, ocupacion = '', tono = 'chistosa') {
  console.log('⚠️ Usando calaverita de respaldo (plantilla)')

  const plantillaBasica = `La muerte andaba paseando
por las calles de la ciudad,
a ${nombre} fue encontrando
${ocupacion ? `en su trabajo con lealtad` : 'y lo invitó a bailar'}.

Con su sonrisa de hueso
y su vestido elegante,
le dijo: 'Ven acá, travieso,
que serás mi acompañante'.

Pero ${nombre} muy astuto
le respondió con humor:
'Espérame un minutito,
que tengo mucho que hacer por favor'.

La flaca se echó a reír
y le dijo: 'Está bien,
pero no te vayas a ir,
que volveré por ti también'.`

  return plantillaBasica
}

// Función auxiliar para validar API key
export function validarConfiguracion() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey || apiKey === '' || apiKey === 'tu_api_key_de_gemini_aqui') {
    console.error('⚠️ API key de Gemini no configurada correctamente')
    return false
  }
  console.log('✅ API key configurada correctamente')
  return true
}

// Función de diagnóstico para probar la API
export async function diagnosticarAPI() {
  console.log('🔍 INICIANDO DIAGNÓSTICO DE API GEMINI')
  console.log('='.repeat(50))

  if (!validarConfiguracion()) {
    return { success: false, error: 'API key no configurada' }
  }

  const modelosParaProbar = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.5-pro',
    'gemini-2.0-flash-exp'
  ]

  for (const nombreModelo of modelosParaProbar) {
    try {
      console.log(`\n🧪 Probando modelo: ${nombreModelo}`)

      const model = genAI.getGenerativeModel({
        model: nombreModelo,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_ONLY_HIGH'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_ONLY_HIGH'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_ONLY_HIGH'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_ONLY_HIGH'
          }
        ]
      })

      const prompt = 'Escribe dos versos sobre el Día de Muertos en México:\n\nLa muerte llegó bailando\ncon flores de cempasúchil'

      console.log('📤 Enviando prompt de prueba...')
      const result = await model.generateContent(prompt)
      const response = result.response

      console.log('📥 Respuesta recibida')
      console.log('📊 Candidatos:', response.candidates?.length || 0)

      if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0]
        console.log('🏁 Finish reason:', candidate.finishReason)

        try {
          const texto = response.text()
          console.log('✅ Texto extraído exitosamente')
          console.log('📝 Contenido:', texto.substring(0, 100))
          console.log('📏 Longitud:', texto.length)

          return {
            success: true,
            modelo: nombreModelo,
            texto: texto,
            longitud: texto.length
          }
        } catch (textError) {
          console.error('❌ Error extrayendo texto:', textError.message)

          // Intentar método alternativo
          if (candidate.content?.parts?.[0]?.text) {
            const texto = candidate.content.parts[0].text
            console.log('✅ Texto extraído con método alternativo')
            console.log('📝 Contenido:', texto.substring(0, 100))

            return {
              success: true,
              modelo: nombreModelo,
              texto: texto,
              longitud: texto.length,
              metodo: 'alternativo'
            }
          }
        }
      } else {
        console.log('❌ No hay candidatos en la respuesta')
        console.log('🔍 Respuesta completa:', JSON.stringify(response, null, 2))
      }

    } catch (error) {
      console.error(`❌ Error con ${nombreModelo}:`, error.message)
    }
  }

  console.log('\n❌ DIAGNÓSTICO COMPLETADO - TODOS LOS MODELOS FALLARON')
  return { success: false, error: 'Todos los modelos fallaron en el diagnóstico' }
}
