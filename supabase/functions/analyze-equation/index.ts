// ═══════════════════════════════════════════════════════════════════════════
// Edge Function: analyze-equation
// Analiza un problema de planteo usando los 5 Pasos de Oro con IA
// Secreto requerido: DEEPSEEK_API_KEY (o OPENAI_API_KEY)
// ═══════════════════════════════════════════════════════════════════════════

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const CORS = {
  "Access-Control-Allow-Origin": "https://planteodeecuaciones.sypablitodp.site",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    const { text } = await req.json();

    if (!text || text.trim().length < 5) {
      throw new Error("El texto del problema es demasiado corto.");
    }

    const systemPrompt = `Eres un experto en matemáticas y enseñanza del planteo de ecuaciones.
Usas exactamente los 5 Pasos de Oro para analizar cualquier problema:
1. Identificar (variables e incógnitas)
2. Traducir (lenguaje verbal → álgebra)
3. Igualar (establecer la ecuación)
4. Coherencia (verificar unidades y lógica)
5. Comprobar (validar la respuesta en el enunciado)

Siempre responde en JSON con esta forma exacta:
{
  "analysis": "HTML con 5 secciones, cada una con un <p> y un <span class='step-pill'>Paso N</span>"
}
Usa LaTeX inline con $...$ para las fórmulas. El HTML debe ser semánticamente correcto y claro.`;

    const userPrompt = `Analiza el siguiente problema usando los 5 Pasos de Oro:\n\n"${text}"`;

    let apiKey = Deno.env.get("DEEPSEEK_API_KEY");
    let apiURL = "https://api.deepseek.com/chat/completions";
    let model  = "deepseek-chat";

    if (!apiKey) {
      apiKey = Deno.env.get("OPENAI_API_KEY");
      apiURL = "https://api.openai.com/v1/chat/completions";
      model  = "gpt-4o-mini";
    }

    if (!apiKey) {
      throw new Error("No hay API Key configurada. Añade DEEPSEEK_API_KEY o OPENAI_API_KEY en los secretos de Supabase.");
    }

    const aiRes = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.4,
        max_tokens: 900,
      }),
    });

    if (!aiRes.ok) {
      const err = await aiRes.text();
      throw new Error(`Error de la API de IA: ${aiRes.status} — ${err}`);
    }

    const aiData = await aiRes.json();
    const content  = aiData.choices?.[0]?.message?.content ?? "{}";
    const parsed   = JSON.parse(content);

    return new Response(
      JSON.stringify({
        analysis: parsed.analysis ?? "<p>No se pudo generar el análisis.</p>",
      }),
      { headers: { ...CORS, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...CORS, "Content-Type": "application/json" } }
    );
  }
});
