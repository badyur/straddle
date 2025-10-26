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
        <header className="border-b bg-white">
          <nav className="mx-auto max-w-5xl p-4 flex gap-4">
            <a href="/" className="font-semibold">Главная</a>
            <a href="/rules" className="text-neutral-600 hover:text-black">Правила</a>
            <a href="/calculator" className="text-neutral-600 hover:text-black">Калькулятор</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
