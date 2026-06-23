-- ═══════════════════════════════════════════════════════════════════════════
-- ECUACIONES.io — Script SQL para Supabase
-- Pega esto en: Supabase Dashboard → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- ── TABLA ORIGINAL: retos/análisis generados por IA ─────────────────────────
CREATE TABLE IF NOT EXISTS public.exposicion_retos (
    id           uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    topic        text        NOT NULL DEFAULT 'General',
    difficulty   text        NOT NULL DEFAULT 'Básico',
    problem_text text        NOT NULL,
    solution_html text,
    created_at   timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_exposicion_retos_created
    ON public.exposicion_retos (created_at DESC);

ALTER TABLE public.exposicion_retos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura pública de retos" ON public.exposicion_retos;
CREATE POLICY "Lectura pública de retos"
    ON public.exposicion_retos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Inserción anónima de retos" ON public.exposicion_retos;
CREATE POLICY "Inserción anónima de retos"
    ON public.exposicion_retos FOR INSERT WITH CHECK (true);


-- ═══════════════════════════════════════════════════════════════════════════
-- TORNEO EN VIVO "MATH-FLIX" — Tablas adicionales
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Tabla de Estado del Juego (controla la pantalla global proyectada)
CREATE TABLE IF NOT EXISTS public.estado_juego (
    id                  TEXT PRIMARY KEY DEFAULT 'global',
    pantalla_actual     TEXT NOT NULL DEFAULT 'lobby', -- 'lobby' | 'pregunta' | 'leaderboard'
    pregunta_actual_id  INT  DEFAULT 1,
    tiempo_restante     INT  DEFAULT 60,
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.estado_juego ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura pública estado_juego" ON public.estado_juego;
CREATE POLICY "Lectura pública estado_juego"    ON public.estado_juego FOR SELECT USING (true);

DROP POLICY IF EXISTS "Actualización anónima estado" ON public.estado_juego;
CREATE POLICY "Actualización anónima estado"    ON public.estado_juego FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Inserción anónima estado" ON public.estado_juego;
CREATE POLICY "Inserción anónima estado"        ON public.estado_juego FOR INSERT WITH CHECK (true);

-- 2. Tabla de Participantes (alumnos que escanean el QR)
CREATE TABLE IF NOT EXISTS public.participantes (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre      TEXT        NOT NULL UNIQUE,
    puntaje     INT         DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.participantes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura pública participantes" ON public.participantes;
CREATE POLICY "Lectura pública participantes"   ON public.participantes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Inserción anónima participantes" ON public.participantes;
CREATE POLICY "Inserción anónima participantes" ON public.participantes FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Actualización anónima puntajes" ON public.participantes;
CREATE POLICY "Actualización anónima puntajes"  ON public.participantes FOR UPDATE USING (true) WITH CHECK (true);

-- 3. Tabla de Respuestas enviadas (fotos + calificación de OpenAI)
CREATE TABLE IF NOT EXISTS public.respuestas (
    id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    participante_id   UUID        REFERENCES public.participantes(id) ON DELETE CASCADE,
    pregunta_id       INT         NOT NULL,
    url_foto          TEXT        NOT NULL,
    puntaje_asignado  INT         DEFAULT 0,
    feedback          TEXT,
    procesado         BOOLEAN     DEFAULT FALSE,
    created_at        TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.respuestas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura pública respuestas" ON public.respuestas;
CREATE POLICY "Lectura pública respuestas"   ON public.respuestas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Inserción anónima respuestas" ON public.respuestas;
CREATE POLICY "Inserción anónima respuestas" ON public.respuestas FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Actualización respuestas" ON public.respuestas;
CREATE POLICY "Actualización respuestas"     ON public.respuestas FOR UPDATE USING (true) WITH CHECK (true);

-- 4. Habilitar Realtime para las tablas críticas del torneo (idempotente)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_rel pr
        JOIN pg_publication p ON p.oid = pr.prpubid
        JOIN pg_class c ON c.oid = pr.prrelid
        WHERE p.pubname = 'supabase_realtime' 
          AND c.relname = 'estado_juego' 
          AND c.relnamespace = 'public'::regnamespace
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.estado_juego;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_rel pr
        JOIN pg_publication p ON p.oid = pr.prpubid
        JOIN pg_class c ON c.oid = pr.prrelid
        WHERE p.pubname = 'supabase_realtime' 
          AND c.relname = 'participantes' 
          AND c.relnamespace = 'public'::regnamespace
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.participantes;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_rel pr
        JOIN pg_publication p ON p.oid = pr.prpubid
        JOIN pg_class c ON c.oid = pr.prrelid
        WHERE p.pubname = 'supabase_realtime' 
          AND c.relname = 'respuestas' 
          AND c.relnamespace = 'public'::regnamespace
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.respuestas;
    END IF;
END $$;

-- 5. Insertar estado inicial del juego (idempotente)
INSERT INTO public.estado_juego (id, pantalla_actual, pregunta_actual_id, tiempo_restante)
VALUES ('global', 'lobby', 1, 60)
ON CONFLICT (id) DO NOTHING;

-- 6. RPC: Suma de puntaje atómica (evita condiciones de carrera)
CREATE OR REPLACE FUNCTION public.sumar_puntaje_alumno(alumno_id UUID, puntos INT)
RETURNS void AS $$
BEGIN
    UPDATE public.participantes
    SET puntaje = puntaje + puntos
    WHERE id = alumno_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ──────────────────────────────────────────────────────────────────────────────
-- VERIFICACIÓN:
-- SELECT * FROM public.estado_juego;
-- SELECT * FROM public.participantes ORDER BY puntaje DESC;
-- SELECT * FROM public.respuestas   ORDER BY created_at DESC LIMIT 20;
-- ──────────────────────────────────────────────────────────────────────────────
