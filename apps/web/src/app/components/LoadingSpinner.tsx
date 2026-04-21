"use client";

/**
 * Animated loading spinner for indicating loading state.
 */
export function LoadingSpinner() {
  return (
    <div className="w-full max-w-4xl mx-auto flex justify-center items-center min-h-30 emil-fadein">
      <div
        className="relative h-14 w-14 flex items-center justify-center emil-spring"
        aria-label="Loading"
      >
        <span className="absolute inset-0 rounded-full border-4 border-brand/60 border-t-brand animate-spin shadow-[0_4px_24px_0_rgba(27,97,201,0.18)]" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
