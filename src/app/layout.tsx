import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "The NUTS club Балашиха",
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
            <nav className="flex items-center gap-6 text-foreground">
              {/* Telegram icon */}
              <a
                href="https://t.me/pokerclubnuts"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Telegram
              </a>

              <Link href="/" className="hover:text-accent transition-colors">
                Главная
              </Link>

              <Link href="/rules" className="hover:text-accent transition-colors">
                Правила
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}