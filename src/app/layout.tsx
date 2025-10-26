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
        <header className="border-b bg-surface-2">
          <div className="mx-auto max-w-6xl p-4 flex items-center justify-between gap-6">
            {/* ЛОГО + НАЗВАНИЕ */}
            <div className="flex items-center gap-3">
              {/* Заменить /straddle-logo.png на свой файл */}
              <img
                src="/straddle-logo.png"
                alt="Straddle logo"
                className="w-12 h-12 rounded-lg object-contain"
              />
              <span className="text-xl font-bold text-foreground">Straddle Moscow</span>
            </div>

            {/* МЕНЮ */}
            <nav className="flex gap-4 text-sm">
              <a href="/" className="font-semibold hover:text-accent">
                Главная
              </a>
              <a href="/rules" className="text-muted hover:text-accent">
                Правила
              </a>
              <a href="/calculator" className="text-muted hover:text-accent">
                Калькулятор
              </a>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
