// ═══════════════════════════════════════════════════════════════════════════
// Edge Function: generate-challenge
// Genera un problema de Planteo de Ecuaciones usando una IA (DeepSeek / OpenAI)
// Secreto requerido: DEEPSEEK_API_KEY (o OPENAI_API_KEY)
// ═══════════════════════════════════════════════════════════════════════════

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req: Request) => {
  // Responder al preflight de CORS
  const origin = req.headers.get("origin") || "*";
  const headers = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  try {
    const { topic = "Edades", difficulty = "Básico" } = await req.json();

    // Prompt estructurado para el modelo
    const systemPrompt = `Eres un experto en didáctica de matemáticas. 
Siempre respondes en JSON con exactamente esta forma:
{
  "problem": "enunciado del problema en lenguaje natural (2-4 oraciones)",
  "solution": "solución HTML con 5 pasos usando etiquetas <p> y la clase step-pill en spans de pasos",
  "answer": "la respuesta numérica o cadena de valores finales exacta sin unidades de texto (ejemplo: '12' o '20 y 30' o '6 y 10')"
}
Los problemas deben requerir plantear UNA ecuación de primer grado.
No uses fórmulas complejas. Usa LaTeX inline con $...$`;

    const userPrompt = `Genera un problema de PLANTEO DE ECUACIONES.
Contexto/Categoría: ${topic}
Nivel de dificultad: ${difficulty}
Los 5 pasos de oro son: Identificar, Traducir, Igualar, Coherencia, Comprobar.`;

    // Intentar DeepSeek primero, luego OpenAI como fallback
    let apiKey = Deno.env.get("DEEPSEEK_API_KEY");
    let apiURL = "https://api.deepseek.com/chat/completions";
    let model  = "deepseek-chat";

    if (!apiKey) {
      apiKey = Deno.env.get("OPENAI_API_KEY");
      apiURL = "https://api.openai.com/v1/chat/completions";
      model  = "gpt-5.4-mini";
    }

    if (!apiKey) {
      throw new Error("No hay API Key configurada. Añade DEEPSEEK_API_KEY o OPENAI_API_KEY en los secretos de Supabase.");
    }

    const requestBody: any = {
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
    };

    if (model === "gpt-5.4-mini") {
      requestBody.max_completion_tokens = 800;
    } else {
      requestBody.max_tokens = 800;
    }

    const aiRes = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!aiRes.ok) {
      const err = await aiRes.text();
      throw new Error(`Error de la API de IA: ${aiRes.status} — ${err}`);
    }

    const aiData = await aiRes.json();
    const content = aiData.choices?.[0]?.message?.content ?? "{}";
    const parsed  = JSON.parse(content);

    return new Response(
      JSON.stringify({
        problem:  parsed.problem  ?? "No se pudo generar el problema.",
        solution: parsed.solution ?? "<p>No se pudo generar la solución.</p>",
        answer:   parsed.answer   ?? "",
      }),
      { headers: { ...headers, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
    );
  }
});
