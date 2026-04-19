import { useTranslation } from "react-i18next";

interface ErrorMessageProps {
  children: React.ReactNode;
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  const { t } = useTranslation();
  return (
    <div className="text-red-600 font-haas text-base font-semibold mt-10">
      {children}
      <br />
      <span className="text-caption text-text-weak">
        (This page requires the backend API to be available at build time.)
      </span>
    </div>
  );
}
