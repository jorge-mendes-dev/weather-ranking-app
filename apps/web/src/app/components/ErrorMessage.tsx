import { useTranslation } from "react-i18next";

interface ErrorMessageProps {
  children: React.ReactNode;
}

/**
 * Displays an error message with optional children and a static API required note.
 * @param {ErrorMessageProps} props - The props for the component.
 */
export function ErrorMessage({ children }: ErrorMessageProps) {
  const { t } = useTranslation();
  return (
    <div className="text-red-600 font-display text-lg font-bold mt-10 text-center bg-red-50/60 border border-red-200 rounded-xl px-6 py-4 shadow-sm">
      {children}
      <br />
      <span className="text-xs text-red-400 font-medium">
        {t("error_message.api_required")}
      </span>
    </div>
  );
}
