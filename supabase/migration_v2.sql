-- ══════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN DIFERENCIAL — Ejecutar en Supabase SQL Editor
-- Agrega las columnas nuevas sin destruir la tabla existente
-- ══════════════════════════════════════════════════════════════════════════

-- 1. Añadir columna pregunta_custom_texto en estado_juego (si no existe)
ALTER TABLE public.estado_juego
    ADD COLUMN IF NOT EXISTS pregunta_custom_texto TEXT;

-- 2. Añadir columna transcripcion_interna en respuestas (si no existe)
ALTER TABLE public.respuestas
    ADD COLUMN IF NOT EXISTS transcripcion_interna TEXT;

-- 3. Agregar restricción única por (participante_id, pregunta_id)
--    Si ya existe una constraint con ese nombre se ignora.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'unique_participante_pregunta'
    ) THEN
        ALTER TABLE public.respuestas
            ADD CONSTRAINT unique_participante_pregunta
            UNIQUE (participante_id, pregunta_id);
    END IF;
END;
$$;

-- ══════════════════════════════════════════════════════════════════════════
-- FIN DE MIGRACIÓN
-- ══════════════════════════════════════════════════════════════════════════
