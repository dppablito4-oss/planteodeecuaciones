-- ══════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN V4 — Ejecutar en Supabase SQL Editor
-- Agrega: tabla de perfiles y habilitación de tiempo real
-- ══════════════════════════════════════════════════════════════════════════

-- 1. Crear tabla de perfiles
CREATE TABLE IF NOT EXISTS public.perfiles (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    avatar      TEXT NOT NULL DEFAULT '🎓',
    color       TEXT NOT NULL DEFAULT '#e50914',
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar RLS en perfiles
ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;

-- 3. Crear políticas RLS para la tabla perfiles
DROP POLICY IF EXISTS "Lectura pública perfiles" ON public.perfiles;
CREATE POLICY "Lectura pública perfiles" ON public.perfiles 
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Inserción pública perfiles" ON public.perfiles;
CREATE POLICY "Inserción pública perfiles" ON public.perfiles 
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Actualización pública perfiles" ON public.perfiles;
CREATE POLICY "Actualización pública perfiles" ON public.perfiles 
    FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Eliminación pública perfiles" ON public.perfiles;
CREATE POLICY "Eliminación pública perfiles" ON public.perfiles 
    FOR DELETE USING (true);

-- 4. Habilitar Realtime para la tabla perfiles
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_rel pr
        JOIN pg_publication p ON p.oid = pr.prpubid
        JOIN pg_class c ON c.oid = pr.prrelid
        WHERE p.pubname = 'supabase_realtime' 
          AND c.relname = 'perfiles' 
          AND c.relnamespace = 'public'::regnamespace
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.perfiles;
    END IF;
END $$;

-- 5. Insertar perfiles iniciales por defecto (si no existen)
INSERT INTO public.perfiles (id, name, avatar, color)
VALUES 
    (1, 'Joel Cipriano', '🎓', '#e50914'),
    (2, 'James de la Cruz', '📐', '#6366f1'),
    (3, 'Deyvis', '∑', '#10b981')
ON CONFLICT (id) DO NOTHING;
