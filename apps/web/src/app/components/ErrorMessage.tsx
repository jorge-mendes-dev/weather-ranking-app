interface ErrorMessageProps {
  children: React.ReactNode;
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div className="text-red-600 font-medium mt-8">
      {children}
      <br />
      <span className="text-xs text-text-weak">
        (This page requires the backend API to be available at build time.)
      </span>
    </div>
  );
}
