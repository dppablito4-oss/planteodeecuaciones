// ═══════════════════════════════════════════════════════════════════════════
// Edge Function: evaluar-matematica
// Evalúa con OpenAI gpt-4o-mini la foto de un procedimiento matemático
// Requiere: OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// ═══════════════════════════════════════════════════════════════════════════

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { encode } from "https://deno.land/std@0.177.0/encoding/base64.ts"

// Headers para evitar problemas de CORS desde el celular de los alumnos
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Manejar peticiones OPTIONS (Preflight de CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { respuestaId, imageUrl, problemaTexto } = await req.json()

    if (!respuestaId || !imageUrl || !problemaTexto) {
      throw new Error('Faltan parámetros requeridos: respuestaId, imageUrl, problemaTexto')
    }

    // 1. Inicializar clientes de entorno
    const supabaseUrl        = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const openaiApiKey       = Deno.env.get('OPENAI_API_KEY')!

    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY no está configurada en los secretos de la Edge Function.')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 2. Descargar la imagen desde el Storage de Supabase para pasársela a OpenAI
    const imageResponse = await fetch(imageUrl)
    if (!imageResponse.ok) {
      throw new Error(`No se pudo descargar la imagen: ${imageResponse.status}`)
    }
    const imageBuffer = await imageResponse.arrayBuffer()
    const base64Image = encode(new Uint8Array(imageBuffer))

    // Detectar MIME type desde el Content-Type de la respuesta o asumir JPEG
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg'
    const mimeType = contentType.split(';')[0].trim()

    // 3. Prompt de sistema para el evaluador docente IA
    const promptSistema = `Eres un profesor de matemática de nivel universitario estricto pero justo. Se te proporcionará la imagen de un procedimiento matemático resuelto a mano por un estudiante y el enunciado del problema.

Antes de dar el puntaje, haz un paso de verificación interna obligatorio: transcribe limpiamente lo que logras leer en la imagen manuscrita (fórmulas y números). Si notas alguna ambigüedad en un número o signo por culpa de la caligrafía (por ejemplo, confundir un 2 por una z, o una suma por una multiplicación), prioriza el flujo lógico del procedimiento para deducir qué número o símbolo es realmente.

Debes evaluar el paso a paso del procedimiento deduciendo la intención matemática del alumno a partir de ese flujo lógico. Califica en una escala de 0 a 5 usando los siguientes criterios:
- 5: Todo perfecto, procedimiento y resultado impecable.
- 4 o 3: El procedimiento lógico es correcto, pero falló en un signo, una suma básica o un arrastre menor.
- 2 o 1: Intentó el procedimiento correcto pero se confundió a mitad de camino de forma grave o el desarrollo es caótico.
- 0: Todo mal, copia descarada o no tiene relación con el problema.

Debes responder ESTRICTAMENTE en formato JSON plano con la siguiente estructura, sin textos adicionales, sin markdown, ni bloques de código \`\`\`json :
{
  "transcripcion_interna": "[Tu transcripción limpia de las fórmulas interpretadas]",
  "puntaje": [Número del 0 al 5],
  "feedback": "[Explicación corta de 1 oración en español sobre el acierto o error]"
}`;

    // 4. Configurar el Payload para OpenAI gpt-4o-mini (Multimodal)
    const payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: promptSistema
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Enunciado del problema a resolver: ${problemaTexto}`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`
              }
            },
            {
              type: "text",
              text: "Evalúa la imagen según las reglas del sistema y devuelve solo el JSON."
            }
          ]
        }
      ],
      temperature: 0.1,
      max_completion_tokens: 1024,
      response_format: { type: "json_object" }
    }

    // 5. Llamada HTTP nativa a la API de OpenAI
    const openAiUrl = 'https://api.openai.com/v1/chat/completions'
    const openAiRawResponse = await fetch(openAiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify(payload)
    })

    if (!openAiRawResponse.ok) {
      const errText = await openAiRawResponse.text()
      throw new Error(`Error de OpenAI API: ${openAiRawResponse.status} — ${errText}`)
    }

    const openAiData = await openAiRawResponse.json()
    const jsonTexto  = openAiData.choices?.[0]?.message?.content?.trim()

    if (!jsonTexto) {
      throw new Error('OpenAI no devolvió contenido válido en la respuesta.')
    }

    // 6. Parsear el resultado de la IA (OpenAI ya debe responder JSON puro)
    let evaluarResult: string = jsonTexto
    let evaluacion: { puntaje: number; feedback: string; transcripcion_interna?: string }
    try {
      // Limpiar posible markdown residual por seguridad
      const limpio = evaluarResult.replace(/```json|```/g, '').trim()
      evaluacion = JSON.parse(limpio)
    } catch {
      throw new Error(`No se pudo parsear la respuesta de OpenAI: "${evaluarResult}"`)
    }

    // Validar que el puntaje esté en rango
    const puntajeFinal = Math.max(0, Math.min(5, Math.round(evaluacion.puntaje ?? 0)))

    // 7. Obtener los datos actuales de la respuesta para saber quién es el alumno
    const { data: datosRespuesta, error: errRespuesta } = await supabase
      .from('respuestas')
      .select('participante_id')
      .eq('id', respuestaId)
      .single()

    if (errRespuesta || !datosRespuesta) {
      throw new Error(`No se encontró la respuesta con ID ${respuestaId}`)
    }

    // 8. Transacción lógica: Actualizar la respuesta evaluada
    const { error: errUpdate } = await supabase
      .from('respuestas')
      .update({
        puntaje_asignado:      puntajeFinal,
        feedback:              evaluacion.feedback,
        transcripcion_interna: evaluacion.transcripcion_interna ?? null,
        procesado:             true
      })
      .eq('id', respuestaId)

    if (errUpdate) {
      throw new Error(`Error al actualizar respuesta: ${errUpdate.message}`)
    }

    // 9. Sumar el puntaje al récord del participante (RPC atómico)
    const { error: errRPC } = await supabase
      .rpc('sumar_puntaje_alumno', {
        alumno_id: datosRespuesta.participante_id,
        puntos:    puntajeFinal
      })

    if (errRPC) {
      console.warn('Error en RPC sumar_puntaje_alumno:', errRPC.message)
    }

    return new Response(JSON.stringify({ success: true, evaluacion: { ...evaluacion, puntaje: puntajeFinal } }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error en evaluar-matematica:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
