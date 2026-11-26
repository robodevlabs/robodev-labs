-- =============================================================================
-- Migration: 0004_expand_academy_workshops
-- Table: public.academy_workshops
--
-- Purpose:
--   Expands public.academy_workshops to store the full workshop catalog data
--   (mirroring src/data/workshops.ts) including schedule timestamps (`starts_at`)
--   for live countdowns, curriculum, outcomes, FAQs, and instructor metadata.
--
-- Security Model:
--   - RLS remains enabled.
--   - `anon` has read-only SELECT access to published workshop catalog rows.
--   - `anon` and `authenticated` have NO INSERT, UPDATE, or DELETE privileges.
--   - `public.workshop_registrations` INSERT policy continues to require
--     `w.is_open = true` on `public.academy_workshops`.
-- =============================================================================

ALTER TABLE public.academy_workshops
  ADD COLUMN IF NOT EXISTS id text,
  ADD COLUMN IF NOT EXISTS short_title text,
  ADD COLUMN IF NOT EXISTS description text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS tagline text,
  ADD COLUMN IF NOT EXISTS level text NOT NULL DEFAULT 'Beginner',
  ADD COLUMN IF NOT EXISTS format text NOT NULL DEFAULT 'Live Online',
  ADD COLUMN IF NOT EXISTS duration text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS schedule_label text DEFAULT 'Date to be announced',
  ADD COLUMN IF NOT EXISTS starts_at timestamptz,
  ADD COLUMN IF NOT EXISTS price text NOT NULL DEFAULT 'FREE',
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'upcoming',
  ADD COLUMN IF NOT EXISTS registration_url text,
  ADD COLUMN IF NOT EXISTS payment_url text,
  ADD COLUMN IF NOT EXISTS has_certificate boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS instructor text,
  ADD COLUMN IF NOT EXISTS instructor_title text,
  ADD COLUMN IF NOT EXISTS instructor_bio text,
  ADD COLUMN IF NOT EXISTS provider text NOT NULL DEFAULT 'RoboDev Academy',
  ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'English',
  ADD COLUMN IF NOT EXISTS outcomes jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS what_you_will_build jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS curriculum jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS tools jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS related_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS target_audience jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS prerequisites jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS includes jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS long_description text,
  ADD COLUMN IF NOT EXISTS testimonials jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS reviews jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'academy_workshops_id_key'
  ) THEN
    ALTER TABLE public.academy_workshops ADD CONSTRAINT academy_workshops_id_key UNIQUE (id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'academy_workshops_status_check'
  ) THEN
    ALTER TABLE public.academy_workshops
      ADD CONSTRAINT academy_workshops_status_check
      CHECK (status IN ('upcoming', 'open', 'completed'));
  END IF;
END $$;

-- Allow anon to read all published workshop catalog rows (still read-only)
GRANT SELECT ON TABLE public.academy_workshops TO anon;

DROP POLICY IF EXISTS "anon_select_open_academy_workshops" ON public.academy_workshops;
CREATE POLICY "anon_select_published_academy_workshops"
  ON public.academy_workshops
  FOR SELECT
  TO anon
  USING (status IN ('upcoming', 'open', 'completed'));

-- Upsert complete workshop records from src/data/workshops.ts
INSERT INTO public.academy_workshops (
  slug, id, title, short_title, description, tagline, level, format, duration,
  schedule_label, starts_at, price, is_free, is_featured, status, is_open,
  registration_url, has_certificate, instructor, instructor_title, instructor_bio,
  provider, language, outcomes, what_you_will_build, curriculum, skills, tools,
  faqs, related_ids, target_audience, prerequisites, includes, long_description, testimonials, reviews, sort_order, updated_at
)
VALUES
(
  'ai-automation',
  'ws-ai-automation',
  'AI Automation for Beginners',
  'AI Automation',
  'A beginner-friendly introduction to AI automation, showing how AI can be connected to useful tasks and workflows without requiring a machine learning background.',
  'Understand AI automation, see how real workflows are built, and create your first useful AI-powered automation.',
  'Beginner',
  'Live Online · Introductory Workshop',
  '1.5 Hours',
  'Date to be announced',
  NULL,
  'FREE',
  true,
  true,
  'upcoming',
  true,
  '/academy/register?workshop=ai-automation',
  true,
  'Safal Bhattarai',
  'Founder, RoboDev Labs',
  'Safal is the founder of RoboDev Labs, a technology company focused on practical software, AI solutions, and opportunities for students and young engineers.',
  'RoboDev Academy',
  'English',
  '["Understand what AI automation is and how it differs from simply using AI chat tools","Identify everyday tasks that can be improved through AI-powered automation","Understand the basic building blocks of an AI automation workflow","See how AI tools, APIs, and automation platforms work together","Create a simple AI-powered workflow during the live workshop"]'::jsonb,
  '["A simple AI-powered workflow connected to a real-world task","A practical automation that demonstrates the full input → AI → output flow"]'::jsonb,
  '[{"title":"Part 1 — What Is AI Automation?","lessons":[{"title":"AI vs. AI automation"},{"title":"Where automation can save time and effort"},{"title":"Real-world AI automation examples"}]},{"title":"Part 2 — How AI Workflows Work","lessons":[{"title":"Inputs, AI processing, and outputs"},{"title":"Connecting tools inside a workflow"},{"title":"Building a simple automation step by step"}]},{"title":"Part 3 — Start Building","lessons":[{"title":"Create your first practical workflow"},{"title":"Common beginner mistakes"},{"title":"Ideas for your next automation"}]}]'::jsonb,
  '["AI Workflow Design","Task Automation","API Integration Basics","Prompt Optimization","No-Code/Low-Code Automations"]'::jsonb,
  '["AI Tools","Automation Platforms","APIs","Web Applications"]'::jsonb,
  '[{"q":"Do I need prior AI experience?","a":"No. This workshop is designed for complete beginners and does not require a machine learning background."},{"q":"Do I need programming experience?","a":"No advanced programming knowledge is required. The workshop focuses on understanding and building practical automation workflows."},{"q":"Is the workshop free?","a":"Yes. This introductory workshop is completely free to attend."},{"q":"Will I receive a certificate?","a":"Yes. Participants who attend the workshop will receive a free RoboDev Academy certificate."}]'::jsonb,
  '[]'::jsonb,
  '["Students curious about AI","Beginners exploring automation","Freelancers and creators","Anyone looking to automate repetitive tasks"]'::jsonb,
  '["No prior AI or machine learning experience required","A laptop with a stable internet connection"]'::jsonb,
  '["Live interactive session","Practical guided activity","Workshop resources","Free certificate"]'::jsonb,
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  1,
  now()
),
(
  'ui-ux-design-figma',
  'ws-uiux-figma',
  'UI/UX Design with Figma',
  'UI/UX Design with Figma',
  'A practical introduction to UI/UX design using Figma, covering the process of turning ideas into clear, usable, and visually consistent digital interfaces.',
  'Learn the fundamentals of UI/UX design and turn an idea into a polished interface in Figma.',
  'Beginner',
  'Live Online · Practical Workshop',
  '3 Hours',
  'Date to be announced',
  NULL,
  'Coming Soon',
  false,
  true,
  'upcoming',
  false,
  '/academy/register?workshop=ui-ux-design-figma',
  true,
  'RoboDev Academy',
  'Design & Product Team, RoboDev Labs',
  'The RoboDev Academy team teaches practical design skills through real product-oriented exercises, helping students understand how good interfaces are planned, designed, and communicated.',
  'RoboDev Academy',
  'English',
  '["Understand the difference between UI design and UX design","Learn how to turn a product idea into a simple user flow","Understand layout, spacing, typography, hierarchy, and visual consistency","Use Figma to create and organize a practical interface design","Create a polished screen that can be handed off for development"]'::jsonb,
  '["A simple user flow for a real digital product idea","A polished Figma interface with reusable visual patterns"]'::jsonb,
  '[{"title":"Part 1 — UI vs. UX: What Are We Designing?","lessons":[{"title":"UI vs. UX and why both matter"},{"title":"User flows and product thinking"},{"title":"Reading and sketching an interface"}]},{"title":"Part 2 — Figma Fundamentals","lessons":[{"title":"Figma workspace and tools overview"},{"title":"Frames, grids, and layout"},{"title":"Typography, color, and spacing"},{"title":"Components and reusable elements"}]},{"title":"Part 3 — Build Your Interface","lessons":[{"title":"Design a real product screen step by step"},{"title":"Applying visual hierarchy"},{"title":"Preparing your design for handoff"}]}]'::jsonb,
  '["UI Design","UX Flow Mapping","Figma Components","Visual Hierarchy","Design System Foundations"]'::jsonb,
  '["Figma","Wireframing","Prototyping","Design Systems"]'::jsonb,
  '[{"q":"Do I need previous design experience?","a":"No. This workshop starts with the fundamentals and is designed for beginners."},{"q":"Do I need a Figma account?","a":"Yes. A free Figma account is sufficient for the workshop."},{"q":"Will we design a real interface?","a":"Yes. The workshop is practical and includes guided work on a real product-style interface."},{"q":"Will I receive a certificate?","a":"Yes. Participants who complete the workshop will receive a free RoboDev Academy certificate."}]'::jsonb,
  '["ws-ai-automation","ws-seo"]'::jsonb,
  '["Students learning product design","Aspiring UI/UX designers","Developers wanting better design skills","Founders and creators building digital products"]'::jsonb,
  '["No previous UI/UX experience required","A laptop with Figma access"]'::jsonb,
  '["Live practical instruction","Guided Figma exercise","Workshop resources","Free certificate"]'::jsonb,
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  2,
  now()
),
(
  'seo-fundamentals',
  'ws-seo',
  'SEO Fundamentals: Get Your Website Found',
  'SEO Fundamentals',
  'A practical introduction to SEO covering how search engines discover websites, what makes pages searchable, and the core improvements beginners can make to their own websites.',
  'Learn the fundamentals of SEO and start improving how your website appears in search.',
  'Beginner',
  'Live Online · Practical Workshop',
  '2.5 Hours',
  'Date to be announced',
  NULL,
  'Coming Soon',
  false,
  true,
  'upcoming',
  false,
  '/academy/register?workshop=seo-fundamentals',
  true,
  'RoboDev Academy',
  'RoboDev Labs',
  'RoboDev Academy focuses on practical digital skills that help students and creators build, launch, and grow useful products on the web.',
  'RoboDev Academy',
  'English',
  '["Understand how search engines discover, crawl, and index websites","Learn the fundamentals of on-page SEO and search-friendly content","Understand keywords, search intent, titles, descriptions, and page structure","Identify common technical SEO problems that can affect visibility","Build a practical SEO checklist you can apply to your own website"]'::jsonb,
  '["An SEO audit checklist for a real website","Improved page titles, descriptions, headings, and content structure","A simple action plan for improving a website''s search visibility"]'::jsonb,
  '[{"title":"Part 1 — How Search Works","lessons":[{"title":"How search engines discover and index pages"},{"title":"Search intent and what users are looking for"},{"title":"The difference between ranking and visibility"}]},{"title":"Part 2 — On-Page SEO","lessons":[{"title":"Keywords and search intent"},{"title":"Titles, meta descriptions, and headings"},{"title":"Content structure and internal links"},{"title":"Images, URLs, and accessibility basics"}]},{"title":"Part 3 — Technical SEO & Action Plan","lessons":[{"title":"Technical SEO fundamentals"},{"title":"Mobile performance and page experience"},{"title":"Basic SEO tools and reporting"},{"title":"Create your website improvement checklist"}]}]'::jsonb,
  '["On-Page SEO","Search Intent Analysis","Technical SEO Basics","Meta Tags Optimization","Site Audit Checklist"]'::jsonb,
  '["Google Search","Google Search Console","Google Analytics","SEO Audit Tools"]'::jsonb,
  '[{"q":"Is this workshop suitable for beginners?","a":"Yes. The workshop starts with the fundamentals and does not require previous SEO experience."},{"q":"Do I need to own a website?","a":"No. You can follow the workshop using examples, but having your own website will make the practical exercises more useful."},{"q":"Does SEO guarantee higher rankings?","a":"No. SEO helps improve a website’s technical quality, relevance, and discoverability, but search rankings are influenced by many factors and cannot be guaranteed."},{"q":"Will I receive a certificate?","a":"Yes. Participants who complete the workshop will receive a free RoboDev Academy certificate."}]'::jsonb,
  '["ws-ai-automation","ws-uiux-figma"]'::jsonb,
  '["Students learning digital marketing","Website owners and creators","Developers and designers","Freelancers and small business owners"]'::jsonb,
  '["No previous SEO experience required","A laptop with internet access"]'::jsonb,
  '["Live practical instruction","SEO checklist and resources","Guided website analysis","Free certificate"]'::jsonb,
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  3,
  now()
)
ON CONFLICT (slug) DO UPDATE SET
  id = EXCLUDED.id,
  title = EXCLUDED.title,
  short_title = EXCLUDED.short_title,
  description = EXCLUDED.description,
  tagline = EXCLUDED.tagline,
  level = EXCLUDED.level,
  format = EXCLUDED.format,
  duration = EXCLUDED.duration,
  schedule_label = EXCLUDED.schedule_label,
  starts_at = EXCLUDED.starts_at,
  price = EXCLUDED.price,
  is_free = EXCLUDED.is_free,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  is_open = EXCLUDED.is_open,
  registration_url = EXCLUDED.registration_url,
  has_certificate = EXCLUDED.has_certificate,
  instructor = EXCLUDED.instructor,
  instructor_title = EXCLUDED.instructor_title,
  instructor_bio = EXCLUDED.instructor_bio,
  provider = EXCLUDED.provider,
  language = EXCLUDED.language,
  outcomes = EXCLUDED.outcomes,
  what_you_will_build = EXCLUDED.what_you_will_build,
  curriculum = EXCLUDED.curriculum,
  skills = EXCLUDED.skills,
  tools = EXCLUDED.tools,
  faqs = EXCLUDED.faqs,
  related_ids = EXCLUDED.related_ids,
  target_audience = EXCLUDED.target_audience,
  prerequisites = EXCLUDED.prerequisites,
  includes = EXCLUDED.includes,
  long_description = EXCLUDED.long_description,
  testimonials = EXCLUDED.testimonials,
  reviews = EXCLUDED.reviews,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();
