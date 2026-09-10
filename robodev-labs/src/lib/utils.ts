/**
 * Utility helper for conditional class joining and clean string formatting.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
