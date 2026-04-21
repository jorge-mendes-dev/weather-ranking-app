import type { Metadata } from "next";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";
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
      <body className="min-h-screen flex flex-col bg-gray-50 text-color-text font-display">
        <Navbar />
        <main className="flex flex-col items-center w-full flex-1 px-4 pt-10 pb-24">
          <div className="w-full max-w-3xl flex flex-col gap-8">
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
