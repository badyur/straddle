import type { Metadata } from "next";
import Link from "next/link";
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
  {/* Telegram link with icon */}
  <a
    href="https://t.me/pokerclubnuts"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-accent transition-colors"
    aria-label="Telegram"
  >
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.78 5.42-.92 6.8-.07.67-.36.89-.84.56-2.33-1.72-3.98-2.78-6.45-4.56-.55-.38-.62-1.02-.13-1.38 2.25-1.64 3.85-2.79 6.43-4.41.58-.33 1.14-.16 1.38.31.43 1.03 1.05 3.15 1.53 4.88z"/>
    </svg>
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