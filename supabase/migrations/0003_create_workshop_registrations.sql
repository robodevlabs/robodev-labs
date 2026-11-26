-- =============================================================================
-- Migration: 0003_create_workshop_registrations
-- Tables: public.academy_workshops, public.workshop_registrations
--
-- Purpose:
--   1. public.academy_workshops acts as the database-level allowlist of
--      published workshops and their registration availability (`is_open`).
--   2. public.workshop_registrations stores public workshop registrations
--      submitted from /academy/register via browser-to-Supabase
--      (@supabase/supabase-js using the publishable key).
--
-- Maintaining the Workshop Allowlist:
--   When a new workshop is published or opened for registration in
--   src/data/workshops.ts, insert or update its row in public.academy_workshops:
--
--     INSERT INTO public.academy_workshops (slug, title, is_open, is_free)
--     VALUES ('new-workshop-slug', 'New Workshop Title', true, true)
--     ON CONFLICT (slug) DO UPDATE
--       SET title = EXCLUDED.title,
--           is_open = EXCLUDED.is_open,
--           is_free = EXCLUDED.is_free,
--           updated_at = now();
--
--   To close registration for a workshop, set `is_open = false`.
--
-- Security Model:
--   - RLS is enabled on both tables.
--   - All default privileges are revoked from PUBLIC, anon, and authenticated.
--   - `anon` may only SELECT open workshops from `academy_workshops` (needed
--     for RLS policy validation; workshop metadata is public).
--   - `anon` is granted column-level INSERT on only the 8 public form fields
--     of `workshop_registrations` (`id`, `created_at`, and `status` are excluded).
--   - RLS WITH CHECK ensures `status = 'received'`, fields meet length rules,
--     and `(workshop_slug, workshop_title)` matches an open workshop in
--     `public.academy_workshops`.
--   - No public SELECT, UPDATE, DELETE, or TRUNCATE privileges or policies
--     exist on `workshop_registrations`.
-- =============================================================================

-- 1. Workshop allowlist catalog
CREATE TABLE IF NOT EXISTS public.academy_workshops (
  slug text PRIMARY KEY,
  title text NOT NULL,
  is_open boolean NOT NULL DEFAULT false,
  is_free boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT academy_workshops_slug_check
    CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' AND char_length(slug) BETWEEN 2 AND 100),
  CONSTRAINT academy_workshops_title_check
    CHECK (char_length(btrim(title)) BETWEEN 2 AND 200)
);

ALTER TABLE public.academy_workshops ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.academy_workshops FROM PUBLIC;
REVOKE ALL ON TABLE public.academy_workshops FROM anon;
REVOKE ALL ON TABLE public.academy_workshops FROM authenticated;

GRANT SELECT (slug, title, is_open, is_free) ON TABLE public.academy_workshops TO anon;

CREATE POLICY "anon_select_open_academy_workshops"
  ON public.academy_workshops
  FOR SELECT
  TO anon
  USING (is_open = true);

-- Seed current workshops from src/data/workshops.ts
INSERT INTO public.academy_workshops (slug, title, is_open, is_free)
VALUES
  ('ai-automation', 'AI Automation for Beginners', true, true),
  ('ui-ux-design-figma', 'UI/UX Design with Figma', false, false),
  ('seo-fundamentals', 'SEO Fundamentals: Get Your Website Found', false, false)
ON CONFLICT (slug) DO UPDATE
  SET title = EXCLUDED.title,
      is_open = EXCLUDED.is_open,
      is_free = EXCLUDED.is_free,
      updated_at = now();

-- 2. Workshop registrations table
CREATE TABLE IF NOT EXISTS public.workshop_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  workshop_slug text NOT NULL REFERENCES public.academy_workshops(slug) ON UPDATE CASCADE,
  workshop_title text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  institution text,
  role text,
  additional_notes text,
  status text NOT NULL DEFAULT 'received',

  CONSTRAINT workshop_registrations_status_check
    CHECK (status IN ('received', 'confirmed', 'waitlisted', 'cancelled')),

  CONSTRAINT workshop_registrations_workshop_title_check
    CHECK (char_length(btrim(workshop_title)) BETWEEN 2 AND 200),

  CONSTRAINT workshop_registrations_full_name_check
    CHECK (char_length(btrim(full_name)) BETWEEN 1 AND 120),

  CONSTRAINT workshop_registrations_email_check
    CHECK (
      char_length(btrim(email)) BETWEEN 3 AND 254
      AND email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    ),

  CONSTRAINT workshop_registrations_phone_check
    CHECK (
      char_length(btrim(phone)) BETWEEN 6 AND 40
      AND phone ~ '^[+0-9()\s.-]{6,40}$'
    ),

  CONSTRAINT workshop_registrations_institution_len
    CHECK (institution IS NULL OR char_length(institution) <= 160),

  CONSTRAINT workshop_registrations_role_len
    CHECK (role IS NULL OR char_length(role) <= 120),

  CONSTRAINT workshop_registrations_notes_len
    CHECK (additional_notes IS NULL OR char_length(additional_notes) <= 2000)
);

-- Prevent duplicate registrations for the same workshop (case-insensitive email)
CREATE UNIQUE INDEX IF NOT EXISTS workshop_registrations_unique_workshop_email
  ON public.workshop_registrations (workshop_slug, lower(btrim(email)));

-- Enable Row Level Security
ALTER TABLE public.workshop_registrations ENABLE ROW LEVEL SECURITY;

-- Revoke all table privileges from PUBLIC, anon, and authenticated
REVOKE ALL ON TABLE public.workshop_registrations FROM PUBLIC;
REVOKE ALL ON TABLE public.workshop_registrations FROM anon;
REVOKE ALL ON TABLE public.workshop_registrations FROM authenticated;

-- Grant INSERT only on public registration columns to anon.
-- Internal columns (`id`, `created_at`, `status`) are intentionally excluded.
GRANT INSERT (
  workshop_slug,
  workshop_title,
  full_name,
  email,
  phone,
  institution,
  role,
  additional_notes
) ON TABLE public.workshop_registrations TO anon;

-- Restricted INSERT policy for anonymous browser registrations.
-- Validates that the workshop exists, matches its canonical title, and is open.
CREATE POLICY "anon_insert_workshop_registrations"
  ON public.workshop_registrations
  FOR INSERT
  TO anon
  WITH CHECK (
    status = 'received'
    AND char_length(btrim(full_name)) BETWEEN 1 AND 120
    AND char_length(btrim(email)) BETWEEN 3 AND 254
    AND char_length(btrim(phone)) BETWEEN 6 AND 40
    AND EXISTS (
      SELECT 1
      FROM public.academy_workshops w
      WHERE w.slug = workshop_slug
        AND w.title = workshop_title
        AND w.is_open = true
    )
  );
