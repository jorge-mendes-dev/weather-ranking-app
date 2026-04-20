import type { Metadata } from "next";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { Navbar } from "./components/Navbar";
import "./globals.css";

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
      <body className="min-h-screen bg-color-bg text-color-text font-display">
        <Navbar />
        <main className="hero-gradient min-h-[40vh] pb-24 pt-8 px-4 w-full flex flex-col items-center max-w-3xl mx-auto">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </body>
    </html>
  );
}
