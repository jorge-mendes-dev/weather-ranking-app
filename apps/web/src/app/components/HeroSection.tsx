"use client";
import { useTranslation } from "react-i18next";

export function HeroSection({
  isIdle,
  mounted,
}: {
  isIdle: boolean;
  mounted: boolean;
}) {
  const { t } = useTranslation();
  return (
    <section
      className={`w-full flex flex-col items-center justify-center text-center gap-3 ${isIdle ? "mb-4" : "mt-0 mb-4"} transition-opacity duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-1">
        {t("common:hero_title", "Find the best activities based on weather")}
      </h1>
      <p className="text-base md:text-lg text-gray-600 mb-2 max-w-xl mx-auto">
        {t(
          "common:hero_subtitle",
          "Search a city to get a 7-day activity ranking",
        )}
      </p>
    </section>
  );
}
