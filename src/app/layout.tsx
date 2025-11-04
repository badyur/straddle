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
        <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
          <div className="mx-auto max-w-6xl px-4 py-3 md:py-4 flex items-center gap-4">
            {/* ЛОГО */}
            <a href="/" className="shrink-0">
              <img
                src="/straddle-logo.png"
                alt="Straddle logo"
                className="w-[120px] h-[120px] object-contain rounded-xl"
              />
            </a>

            {/* растянуть меню вправо */}
            <div className="flex-1" />

            {/* МЕНЮ */}
            <nav className="flex gap-4 text-sm md:text-base overflow-x-auto">
              <a href="/" className="font-semibold hover:text-accent whitespace-nowrap">
                Главная
              </a>
              <a href="/rules" className="text-muted hover:text-foreground whitespace-nowrap">
                Правила
              </a>
{/*              <a href="/calculator" className="text-muted hover:text-foreground whitespace-nowrap">
                Калькулятор
              </a>*/}
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}