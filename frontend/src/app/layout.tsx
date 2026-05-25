import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jiva Space",
  description: "Discover and book live spaces waiting for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-bg text-white">{children}</body>
    </html>
  );
}
