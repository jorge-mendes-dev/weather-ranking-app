import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
