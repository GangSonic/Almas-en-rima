// Plantillas de calaveritas con estructura tradicional mexicana
const plantillasCalaveritas = [
  {
    estrofas: [
      "La muerte andaba paseando\npor las calles de la ciudad,\na {nombre} fue encontrando\ny lo invitó a bailar.",
      
      "Con su sonrisa de hueso\ny su vestido elegante,\nle dijo: 'Ven acá, travieso,\nque serás mi acompañante'.",
      
      "Pero {nombre} muy astuto\nle respondió con humor:\n'Espérame un minutito,\nque tengo mucho que hacer por favor'.",
      
      "La flaca se echó a reír\ny le dijo: 'Está bien,\npero no te vayas a ir,\nque volveré por ti también'."
    ]
  },
  {
    estrofas: [
      "En el panteón muy callado\nla muerte se paseaba,\nbuscando a {nombre} por todos lados\nporque su hora ya llegaba.",
      
      "Con su guadaña brillante\ny su capa de terciopelo,\nle gritó: '¡Ven adelante!\nque te llevo hasta el cielo'.",
      
      "Pero {nombre} le contestó\ncon una gran carcajada:\n'Primero déjame terminar lo que empecé,\ny después no digo nada'.",
      
      "La muerte se fue pensando\nque {nombre} era muy listo,\ny se quedó esperando\nhasta que estuvo listo."
    ]
  },
  {
    estrofas: [
      "La catrina muy coqueta\nse arregló para salir,\nbuscando a {nombre} en su carreta\npara poderse divertir.",
      
      "Con flores en el cabello\ny un vestido de colores,\nle dijo: 'Ven acá, bello,\nque bailemos entre flores'.",
      
      "Pero {nombre} muy valiente\nle respondió sin temor:\n'Baila tú solamente,\nque yo tengo otro amor'.",
      
      "La catrina se marchó\ncon su risa cristalina,\ny a {nombre} le perdonó\nsu respuesta tan divina."
    ]
  },
  {
    estrofas: [
      "Don {nombre} trabajador\nsiempre muy madrugador,\nno sabía que la muerte\nle tenía gran amor.",
      
      "Una mañana temprano\nla flaca lo fue a buscar,\ncon su vestido de gala\ny ganas de platicar.",
      
      "'Vámonos', le dijo ella,\n'que ya es hora de partir',\npero {nombre} respondió:\n'Déjame aquí vivir'.",
      
      "La muerte muy comprensiva\nle dio un año más de vida,\ny {nombre} agradecido\nle ofreció una comida."
    ]
  },
  {
    estrofas: [
      "En la feria del pueblo\nla muerte se apareció,\nbuscando a {nombre}\nque por ahí se perdió.",
      
      "Entre juegos y dulces\ny música de mariachi,\nla flaca preguntaba:\n'¿Dónde está mi cuate?'",
      
      "Pero {nombre} muy listo\nse escondió en el carrusel,\ny la muerte mareada\nse fue a buscar a Miguel.",
      
      "Al final de la noche\ncuando todo terminó,\n{nombre} salió riéndose\nporque la muerte se perdió."
    ]
  }
]

// Función para seleccionar una plantilla aleatoria
function seleccionarPlantilla() {
  const indice = Math.floor(Math.random() * plantillasCalaveritas.length)
  return plantillasCalaveritas[indice]
}

// Función para procesar el nombre y extraer información
function procesarNombre(nombreCompleto) {
  const nombre = nombreCompleto.toLowerCase()
  
  // Detectar si incluye profesión u ocupación
  const profesiones = {
    'doctor': 'doctor',
    'doctora': 'doctora', 
    'maestro': 'maestro',
    'maestra': 'maestra',
    'panadero': 'panadero',
    'panadera': 'panadera',
    'carpintero': 'carpintero',
    'cocinero': 'cocinero',
    'cocinera': 'cocinera',
    'estudiante': 'estudiante',
    'profesor': 'profesor',
    'profesora': 'profesora'
  }
  
  let profesion = null
  let nombreLimpio = nombreCompleto
  
  for (const [key, value] of Object.entries(profesiones)) {
    if (nombre.includes(key)) {
      profesion = value
      nombreLimpio = nombreCompleto.replace(new RegExp(key, 'gi'), '').trim()
      break
    }
  }
  
  // Si no se encontró profesión, usar el nombre completo
  if (!nombreLimpio || nombreLimpio.length < 2) {
    nombreLimpio = nombreCompleto
  }
  
  return {
    nombre: nombreLimpio,
    profesion: profesion,
    nombreCompleto: nombreCompleto
  }
}

// Función principal para generar la calaverita
export function generarCalaverita(nombreInput, tono = 'chistosa') {
  const { nombre, profesion, nombreCompleto } = procesarNombre(nombreInput)
  
  // Seleccionar plantillas según el tono
  let plantillasDisponibles = plantillasCalaveritas
  
  if (tono === 'respetuosa') {
    // Para tono respetuoso, usar plantillas más suaves
    plantillasDisponibles = plantillasCalaveritas.slice(0, 2)
  } else if (tono === 'satirica') {
    // Para tono satírico, usar plantillas más divertidas
    plantillasDisponibles = plantillasCalaveritas.slice(2)
  }
  
  const indice = Math.floor(Math.random() * plantillasDisponibles.length)
  const plantilla = plantillasDisponibles[indice]
  
  // Reemplazar {nombre} en cada estrofa
  const estrofasPersonalizadas = plantilla.estrofas.map(estrofa => {
    let estrofaPersonalizada = estrofa.replace(/{nombre}/g, nombre)
    
    // Ajustar el lenguaje según el tono
    if (tono === 'respetuosa') {
      estrofaPersonalizada = estrofaPersonalizada
        .replace(/travieso/g, 'querido')
        .replace(/astuto/g, 'sabio')
        .replace(/listo/g, 'prudente')
    } else if (tono === 'satirica') {
      estrofaPersonalizada = estrofaPersonalizada
        .replace(/querido/g, 'pícaro')
        .replace(/sabio/g, 'astuto')
        .replace(/prudente/g, 'listo')
    }
    
    return estrofaPersonalizada
  })
  
  // Unir las estrofas con doble salto de línea
  return estrofasPersonalizadas.join('\n\n')
}

// Función para generar múltiples calaveritas (para futuras funcionalidades)
export function generarMultiplesCalaveritas(nombres) {
  return nombres.map(nombre => ({
    nombre: nombre,
    calaverita: generarCalaverita(nombre)
  }))
}