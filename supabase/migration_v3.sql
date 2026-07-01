-- ══════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN V3 — Ejecutar en Supabase SQL Editor
-- Agrega: clave de seguridad del mando, historial de rondas y respuestas
-- ══════════════════════════════════════════════════════════════════════════

-- 1. Columna remote_key en estado_juego para autenticar el mando a distancia
ALTER TABLE public.estado_juego
    ADD COLUMN IF NOT EXISTS remote_key TEXT;

-- 2. Tabla historial_rondas — guarda un snapshot de cada ronda archivada
CREATE TABLE IF NOT EXISTS public.historial_rondas (
    id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_ronda TEXT        NOT NULL,
    pregunta_id  INT         NOT NULL DEFAULT 1,
    archivado_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.historial_rondas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura pública historial_rondas" ON public.historial_rondas;
CREATE POLICY "Lectura pública historial_rondas"
    ON public.historial_rondas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Inserción anónima historial_rondas" ON public.historial_rondas;
CREATE POLICY "Inserción anónima historial_rondas"
    ON public.historial_rondas FOR INSERT WITH CHECK (true);

-- 3. Tabla historial_respuestas — copia individual de cada respuesta archivada
CREATE TABLE IF NOT EXISTS public.historial_respuestas (
    id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    ronda_id             UUID        REFERENCES public.historial_rondas(id) ON DELETE CASCADE,
    nombre_alumno        TEXT        NOT NULL,
    pregunta_id          INT         NOT NULL,
    puntaje_asignado     INT         DEFAULT 0,
    feedback             TEXT,
    transcripcion_interna TEXT,
    url_foto             TEXT,
    archivado_at         TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.historial_respuestas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura pública historial_respuestas" ON public.historial_respuestas;
CREATE POLICY "Lectura pública historial_respuestas"
    ON public.historial_respuestas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Inserción anónima historial_respuestas" ON public.historial_respuestas;
CREATE POLICY "Inserción anónima historial_respuestas"
    ON public.historial_respuestas FOR INSERT WITH CHECK (true);

-- 4. Función RPC para establecer el puntaje absoluto de un participante
--    (distinto de sumar_puntaje_alumno que es incremental)
CREATE OR REPLACE FUNCTION public.fijar_puntaje_alumno(alumno_id UUID, nuevo_puntaje INT)
RETURNS void AS $$
BEGIN
    UPDATE public.participantes
    SET puntaje = nuevo_puntaje
    WHERE id = alumno_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ══════════════════════════════════════════════════════════════════════════
-- FIN DE MIGRACIÓN V3
-- INSTRUCCIONES: Pega este script completo en Supabase → SQL Editor → Run
-- ══════════════════════════════════════════════════════════════════════════
