import { useTranslation } from "react-i18next";

interface ErrorMessageProps {
  children: React.ReactNode;
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  const { t } = useTranslation();
  return (
    <div className="text-red-500 font-display text-base font-semibold mt-8 text-center">
      {children}
      <br />
      <span className="text-xs text-gray-400">
        {t("error_message.api_required")}
      </span>
    </div>
  );
}
