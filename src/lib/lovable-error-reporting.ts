/**
 * Error reporting stub — no external dependency.
 * Replace with your own monitoring solution (Sentry, Datadog, etc.) if needed.
 */
export function reportLovableError(
  error: unknown,
  _context: Record<string, unknown> = {},
): void {
  if (typeof window !== "undefined") {
    console.error("[Error]", error);
  }
}
