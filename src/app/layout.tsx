import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Покер в Балашихе — The NUTS Club",
  description:
    "The NUTS Club — сообщество любителей спортивного покера в Балашихе. Регулярные игры, новые знакомства и покерная атмосфера без денежных ставок.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}