"use client";

import type { ActivityRanking } from "@weather-app/types";
import dynamic from "next/dynamic";
import HomeClient from "./HomeClient";

const ClientErrorMessage = dynamic(() => import("./ClientErrorMessage"), {
  ssr: false,
});

interface HomeClientShellProps {
  rankings: ActivityRanking[] | null;
  conditions: ActivityRanking["conditions"] | null;
  fetchError: boolean;
  defaultLat: number;
  defaultLon: number;
}

export default function HomeClientShell({
  rankings,
  conditions,
  fetchError,
  defaultLat,
  defaultLon,
}: HomeClientShellProps) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10 text-navy font-haas">
      <h1 className="text-display-hero font-haas mb-2 font-normal tracking-normal">
        Weather Activity Rankings
      </h1>
      <p className="text-body text-text-weak mb-10 tracking-wide">
        Paris, France — {defaultLat}°N, {defaultLon}°E
      </p>
      {fetchError || !rankings || !conditions ? (
        <ClientErrorMessage>
          Unable to fetch rankings data. Please ensure the API is running.
        </ClientErrorMessage>
      ) : (
        <HomeClient rankings={rankings} conditions={conditions} />
      )}
    </main>
  );
}
