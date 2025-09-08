import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI E‑commerce Search",
  description: "Semantic product search powered by Hugging Face & Pinecone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-black/40 backdrop-blur">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-black text-white dark:bg-white dark:text-black text-sm font-bold">AI</span>
              <span className="text-lg font-semibold">E‑commerce Search</span>
            </div>
            <a href="https://github.com" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">GitHub</a>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
