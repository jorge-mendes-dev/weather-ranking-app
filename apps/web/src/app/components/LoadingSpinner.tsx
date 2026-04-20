"use client";

export function LoadingSpinner() {
  return (
    <div className="w-full max-w-4xl mx-auto flex justify-center items-center min-h-30 animate-fade-in">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand transition-all duration-300 ease-in-out shadow-lg hover:scale-110"></div>
    </div>
  );
}
