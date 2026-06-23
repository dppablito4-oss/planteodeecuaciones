DOCUMENTACION.md: Sistema de Torneo en Vivo "Math-Flix"
Este documento contiene la especificación técnica completa para implementar el torneo interactivo de matemáticas en tiempo real utilizando Supabase (Database, Realtime, Storage, Edge Functions) y Google Gemini API.

🗄️ 1. Modelo de Base de Datos (SQL)
Ejecuta este script en el SQL Editor de tu panel de Supabase para crear las tablas necesarias, habilitar el tiempo real (Realtime) y configurar el storage.
-- 1. Tabla de Estado del Juego (Para controlar la pantalla global)
CREATE TABLE estado_juego (
    id TEXT PRIMARY KEY DEFAULT 'global',
    pantalla_actual TEXT NOT NULL DEFAULT 'lobby', -- 'lobby', 'pregunta', 'leaderboard'
    pregunta_actual_id INT DEFAULT 1,
    tiempo_restante INT DEFAULT 60,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de Participantes (Alumnos que escanean el QR)
CREATE TABLE participantes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL UNIQUE,
    puntaje INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabla de Respuestas Enviadas
CREATE TABLE respuestas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participante_id UUID REFERENCES participantes(id) ON DELETE CASCADE,
    pregunta_id INT NOT NULL,
    url_foto TEXT NOT NULL,
    puntaje_asignado INT DEFAULT 0,
    feedback TEXT,
    procesado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Habilitar Realtime para las tablas críticas
ALTER PUBLICATION supabase_realtime ADD TABLE estado_juego;
ALTER PUBLICATION supabase_realtime ADD TABLE participantes;
ALTER PUBLICATION supabase_realtime ADD TABLE respuestas;

-- Insertar el estado inicial del juego
INSERT INTO estado_juego (id, pantalla_actual) VALUES ('global', 'lobby') ON CONFLICT DO NOTHING;

📁 Configuración del Bucket de Storage
Crea un bucket público llamado examenes en la sección de Storage de Supabase para almacenar las fotos que suban los alumnos. Asegúrate de otorgar permisos públicos de inserción (INSERT) para que los celulares puedan subir los archivos sin autenticación pesada.

⚡ 2. Supabase Edge Function (evaluar-matematica)
Crea la función en tu entorno local usando el CLI de Supabase:
supabase functions new evaluar-matematica

Reemplaza el archivo index.ts con el siguiente código. Esta función recibe la imagen, invoca a la API de Gemini, parsea el JSON y actualiza los puntajes en Realtime.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

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

    // 1. Inicializar clientes de entorno
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')!

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 2. Descargar la imagen desde el Storage de Supabase para pasársela a Gemini
    const imageResponse = await fetch(imageUrl)
    const imageBuffer = await imageResponse.arrayBuffer()
    const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)))

    // 3. Configurar el Payload para Gemini 2.0 Flash (Multimodal)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`
    
    const promptSistema = `Eres un profesor de matemática de nivel universitario estricto pero justo. Se te proporcionará la imagen de un procedimiento matemático resuelto a mano por un estudiante y el enunciado del problema.
Debes evaluar el paso a paso del procedimiento. Califica en una escala de 0 a 5 usando los siguientes criterios:
- 5: Todo perfecto, procedimiento y resultado impecable.
- 4 o 3: El procedimiento lógico es correcto, pero falló en un signo, una suma básica o un arrastre menor.
- 2 o 1: Intentó el procedimiento correcto pero se confundió a mitad de camino de forma grave o el desarrollo es caótico.
- 0: Todo mal, copia descarada o no tiene relación con el problema.

Debes responder ESTRICTAMENTE en formato JSON plano con la siguiente estructura, sin textos adicionales, sin markdown, ni bloques de código \`\`\`json :
{
  "puntaje": [Número del 0 al 5],
  "feedback": "[Explicación corta de 1 oración en español sobre el acierto o error]"
}`;

    const payload = {
      contents: [
        {
          parts: [
            { text: `Enunciado del problema a resolver: ${problemaTexto}` },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image
              }
            },
            { text: "Evalúa la imagen según las reglas del sistema y devuelve solo el JSON." }
          ]
        }
      ],
      systemInstruction: {
        parts: [{ text: promptSistema }]
      }
    }

    // 4. Llamada HTTP nativa a la API de Gemini
    const geminiRawResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const geminiData = await geminiRawResponse.json()
    const jsonTexto = geminiData.candidates[0].content.parts[0].text.trim()
    
    // Parsear el resultado de la IA
    const evaluacion = JSON.parse(jsonTexto)

    // 5. Obtener los datos actuales de la respuesta para saber quién es el alumno
    const { data: datosRespuesta } = await supabase
      .from('respuestas')
      .select('participante_id')
      .eq('id', respuestaId)
      .single()

    if (datosRespuesta) {
      // 6. Transacción lógica: Actualizar la respuesta evaluada
      await supabase
        .from('respuestas')
        .update({
          puntaje_asignado: evaluacion.pointer || evaluacion.puntaje,
          feedback: evaluacion.feedback,
          procesado: true
        })
        .eq('id', respuestaId)

      // 7. Sumar el puntaje directo al récord del participante
      await supabase
        .rpc('sumar_puntaje_alumno', { 
          alumno_id: datosRespuesta.participante_id, 
          puntos: evaluacion.pointer || evaluacion.puntaje 
        })
    }

    return new Response(JSON.stringify({ success: true, evaluacion }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

💡 Nota de base de datos: Para que la función ejecute la suma de puntos de forma segura sin condiciones de carrera, ejecuta este pequeño procedimiento almacenado (RPC) en tu SQL Editor:
CREATE OR REPLACE FUNCTION sumar_puntaje_alumno(alumno_id UUID, puntos INT)
RETURNS void AS $$
BEGIN
    UPDATE participantes
    SET puntaje = puntaje + puntos
    WHERE id = alumno_id;
END;
$$ LANGUAGE plpgsql;

📱 3. Flujo del Frontend (Lógica del Cliente)
📸 Flujo en el celular del alumno (torneo.html)
Cuando el alumno toma la foto en su cuaderno, la web reduce su resolución en el cliente mediante un canvas antes de mandarla por internet para asegurar rapidez inalámbrica dentro del salón.

// Capturar evento de envío del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = imageInput.files[0];
    const alumnoId = localStorage.getItem('alumno_id'); // Guardado en el login del QR

    // 1. Redimensionar imagen a un ancho máximo de 1024px usando Canvas (Compresión local)
    const compressedBlob = await compressImage(file, 1024);

    // 2. Subir imagen al Bucket público de Supabase Storage
    const fileName = `${alumnoId}_p1_${Date.now()}.jpg`;
    const { data: storageData, error: storageError } = await supabase.storage
        .from('examenes')
        .upload(fileName, compressedBlob);

    const imageUrl = supabase.storage.from('examenes').getPublicUrl(fileName).data.publicUrl;

    // 3. Insertar registro en la tabla de respuestas
    const { data: respuestaData } = await supabase
        .from('respuestas')
        .insert({
            participante_id: alumnoId,
            pregunta_id: 1, // ID Dinámico según el estado_juego
            url_foto: imageUrl
        })
        .select()
        .single();

    // 4. Disparar la Edge Function de Supabase de forma asíncrona
    fetch('https://<tu-id-project>.supabase.co/functions/v1/evaluar-matematica', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            respuestaId: respuestaData.id,
            imageUrl: imageUrl,
            problemaTexto: "Resolver la integral definida de 0 a 2 de (3x^2 + 2x) dx."
        })
    });
    
    alert("Solución enviada. Tu profesor de IA la está evaluando...");
});

// Función auxiliar de compresión en JS nativo
function compressImage(file, maxWidth) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const scaleFactor = maxWidth / img.width;
                canvas.width = maxWidth;
                canvas.height = img.height * scaleFactor;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.8);
            };
        };
    });
}


🎬 Flujo en tu Pantalla Grande ("Math-Flix")
Para ver la actualización del Leaderboard en tiempo real sin recargar la página, suscríbete a los cambios en la tabla de participantes desde la vista principal de tu aplicación:

// Escuchar cuando los alumnos se registran o cuando la Edge Function actualiza sus puntajes
supabase
  .channel('cambios-torneo')
  .on('postgres_changes', { event: '*', filter: 'table=eq.participantes' }, (payload) => {
      console.log('Cambio detectado en participantes, refrescando ranking...', payload);
      renderLeaderboard(); // Función que hace un SELECT ordenado por puntaje DESC
  })
  .subscribe();


  🚀 Variables de Entorno Requeridas (Edge Function)
Asegúrate de setear tu API Key de Google y los accesos en producción corriendo estos comandos en tu consola antes del despliegue final:
supabase secrets set GEMINI_API_KEY= (ya va etsar agregado a edge funtions de supabase)
supabase secrets set SUPABASE_URL=https://<tu-id>.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbG...TuKeyServiceRole

que no rompa essos docmentos que esta hecho ya esta probado y funciona, no quiero que lo modifiques si no es estrictamente necesario, osea si no lo vas a usar solo eliminalo pero no lo rompas, 