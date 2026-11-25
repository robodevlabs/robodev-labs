-- =============================================================================
-- Migration: 0001_create_project_inquiries
-- Table: public.project_inquiries
--
-- Purpose:
--   Stores public contact and project inquiries submitted from /contact via
--   browser-to-Supabase (@supabase/supabase-js using the publishable key).
--
-- Security Model:
--   1. Row Level Security (RLS) is enabled.
--   2. All default privileges are revoked from PUBLIC, anon, and authenticated.
--   3. Only `anon` is granted column-level INSERT on the 18 public form fields.
--   4. Internal columns (`id`, `created_at`, `status`) are excluded from INSERT
--      privileges so public callers can never supply or override them.
--   5. No public SELECT, UPDATE, DELETE, or TRUNCATE privileges or policies exist.
--      Team access happens strictly via the Supabase Dashboard / service_role.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'new',

  -- Core contact fields
  name text NOT NULL,
  email text NOT NULL,
  organization text,
  role text,
  phone text,
  location text,

  -- Inquiry classification & body
  topic text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,

  -- Contextual: engineering
  project_type text,
  timeline text,
  budget text,

  -- Contextual: academy
  institution text,
  workshop text,
  participants text,
  preferred_date text,

  -- Contextual: partnership
  partner_org text,
  collaboration text,

  -- Server-enforced validation constraints
  CONSTRAINT project_inquiries_status_check
    CHECK (status IN ('new', 'in_review', 'replied', 'archived')),

  CONSTRAINT project_inquiries_name_check
    CHECK (char_length(btrim(name)) BETWEEN 1 AND 120),

  CONSTRAINT project_inquiries_email_check
    CHECK (
      char_length(btrim(email)) BETWEEN 3 AND 254
      AND email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    ),

  CONSTRAINT project_inquiries_organization_len
    CHECK (organization IS NULL OR char_length(organization) <= 160),

  CONSTRAINT project_inquiries_role_len
    CHECK (role IS NULL OR char_length(role) <= 120),

  CONSTRAINT project_inquiries_phone_len
    CHECK (phone IS NULL OR char_length(phone) <= 40),

  CONSTRAINT project_inquiries_location_len
    CHECK (location IS NULL OR char_length(location) <= 120),

  CONSTRAINT project_inquiries_topic_check
    CHECK (
      topic IN (
        'Software Engineering',
        'AI Automation',
        'SaaS / Product Development',
        'Website / Web Application',
        'Custom Business Software',
        'RoboDev Academy / Workshop',
        'University / Student Organization',
        'Product Collaboration',
        'Partnership',
        'General Inquiry',
        'Other'
      )
    ),

  CONSTRAINT project_inquiries_subject_check
    CHECK (char_length(btrim(subject)) BETWEEN 1 AND 200),

  CONSTRAINT project_inquiries_message_check
    CHECK (char_length(btrim(message)) BETWEEN 20 AND 5000),

  CONSTRAINT project_inquiries_project_type_len
    CHECK (project_type IS NULL OR char_length(project_type) <= 160),

  CONSTRAINT project_inquiries_timeline_len
    CHECK (timeline IS NULL OR char_length(timeline) <= 120),

  CONSTRAINT project_inquiries_budget_len
    CHECK (budget IS NULL OR char_length(budget) <= 120),

  CONSTRAINT project_inquiries_institution_len
    CHECK (institution IS NULL OR char_length(institution) <= 160),

  CONSTRAINT project_inquiries_workshop_len
    CHECK (workshop IS NULL OR char_length(workshop) <= 160),

  CONSTRAINT project_inquiries_participants_len
    CHECK (participants IS NULL OR char_length(participants) <= 60),

  CONSTRAINT project_inquiries_preferred_date_len
    CHECK (preferred_date IS NULL OR char_length(preferred_date) <= 120),

  CONSTRAINT project_inquiries_partner_org_len
    CHECK (partner_org IS NULL OR char_length(partner_org) <= 160),

  CONSTRAINT project_inquiries_collaboration_len
    CHECK (collaboration IS NULL OR char_length(collaboration) <= 500)
);

-- Enable Row Level Security
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

-- Revoke all table privileges from PUBLIC, anon, and authenticated
REVOKE ALL ON TABLE public.project_inquiries FROM PUBLIC;
REVOKE ALL ON TABLE public.project_inquiries FROM anon;
REVOKE ALL ON TABLE public.project_inquiries FROM authenticated;

-- Grant INSERT only on public submission columns to anon.
-- Internal columns (`id`, `created_at`, `status`) are intentionally excluded.
GRANT INSERT (
  name,
  email,
  organization,
  role,
  phone,
  location,
  topic,
  subject,
  message,
  project_type,
  timeline,
  budget,
  institution,
  workshop,
  participants,
  preferred_date,
  partner_org,
  collaboration
) ON TABLE public.project_inquiries TO anon;

-- Restricted INSERT policy for anonymous browser submissions.
-- No SELECT, UPDATE, or DELETE policies are created for anon or authenticated.
CREATE POLICY "anon_insert_project_inquiries"
  ON public.project_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (
    status = 'new'
    AND char_length(btrim(name)) BETWEEN 1 AND 120
    AND char_length(btrim(email)) BETWEEN 3 AND 254
    AND char_length(btrim(subject)) BETWEEN 1 AND 200
    AND char_length(btrim(message)) BETWEEN 20 AND 5000
  );
