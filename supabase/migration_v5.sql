-- ══════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN V5 — Ejecutar en Supabase SQL Editor
-- Habilita políticas de ELIMINACIÓN (DELETE) para permitir el correcto
-- funcionamiento de "Eliminar Participantes" y "Super Reset" desde el mando.
-- ══════════════════════════════════════════════════════════════════════════

-- 1. Permitir eliminación pública de participantes
DROP POLICY IF EXISTS "Eliminación pública participantes" ON public.participantes;
CREATE POLICY "Eliminación pública participantes" ON public.participantes FOR DELETE USING (true);

-- 2. Permitir eliminación pública de respuestas
DROP POLICY IF EXISTS "Eliminación pública respuestas" ON public.respuestas;
CREATE POLICY "Eliminación pública respuestas" ON public.respuestas FOR DELETE USING (true);

-- 3. Permitir eliminación pública de retos de exposición
DROP POLICY IF EXISTS "Eliminación pública de retos" ON public.exposicion_retos;
CREATE POLICY "Eliminación pública de retos" ON public.exposicion_retos FOR DELETE USING (true);

-- 4. Permitir eliminación pública de historial de rondas
DROP POLICY IF EXISTS "Eliminación pública historial_rondas" ON public.historial_rondas;
CREATE POLICY "Eliminación pública historial_rondas" ON public.historial_rondas FOR DELETE USING (true);

-- 5. Permitir eliminación pública de historial de respuestas
DROP POLICY IF EXISTS "Eliminación pública historial_respuestas" ON public.historial_respuestas;
CREATE POLICY "Eliminación pública historial_respuestas" ON public.historial_respuestas FOR DELETE USING (true);

-- 6. Permitir eliminación pública de fotos en el storage (bucket 'examenes')
DROP POLICY IF EXISTS "Eliminación pública de exámenes" ON storage.objects;
CREATE POLICY "Eliminación pública de exámenes" ON storage.objects FOR DELETE USING (bucket_id = 'examenes');

-- 7. Agregar columna de bloque activo al estado del juego
ALTER TABLE public.estado_juego ADD COLUMN IF NOT EXISTS bloque_activo INT DEFAULT 0;
