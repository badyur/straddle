import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Straddle Moscow",
  description: "Рейтинг и правила",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {/* Хедер — тёмная поверхность + тонкая граница */}
        <header className="border-b border-border bg-surface sticky top-0 z-40">
          <nav className="mx-auto max-w-6xl p-4 flex gap-6">
            <a href="/" className="font-semibold text-foreground hover:opacity-90">
              Главная
            </a>
            <a href="/rules" className="text-muted hover:text-foreground">
              Правила
            </a>
            <a href="/calculator" className="text-muted hover:text-foreground">
              Калькулятор
            </a>
          </nav>
        </header>

        {/* Контент */}
        {children}
      </body>
    </html>
  );
}
