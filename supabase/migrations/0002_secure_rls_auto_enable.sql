-- =============================================================================
-- Migration: 0002_secure_rls_auto_enable
--
-- Purpose:
--   The rls_auto_enable() SECURITY DEFINER event-trigger function was flagged
--   by Supabase security advisors as callable via REST RPC by anon and
--   authenticated roles, which is unintentional.
--
--   This function is an internal DDL event trigger only. It should never be
--   invokable via /rest/v1/rpc by public callers.
--
--   Fix: revoke EXECUTE from PUBLIC, anon, and authenticated.
--   The event trigger itself (if any) is not affected — event triggers are
--   fired by the Postgres DDL engine, not by EXECUTE privilege.
-- =============================================================================

REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;
