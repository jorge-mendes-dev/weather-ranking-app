import type { Metadata } from "next";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { Navbar } from "./components/Navbar";
import "./globals.css";
// import "./i18n"; // Removed to avoid client-only code in server components

export const metadata: Metadata = {
  title: "Weather Ranking",
  description: "Find the best weather for your sport activities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
