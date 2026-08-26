import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nuts-club.ru"),

  title: "Покер в Балашихе — The NUTS Club",

  description:
    "The NUTS Club — сообщество любителей спортивного покера в Балашихе. Регулярные игры, новые знакомства и покерная атмосфера без денежных ставок.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Покер в Балашихе — The NUTS Club",

    description:
      "Сообщество любителей спортивного покера в Балашихе. Регулярные игры, новые знакомства и покерная атмосфера без денежных ставок.",

    url: "https://nuts-club.ru/",

    siteName: "The NUTS Club",

    locale: "ru_RU",

    type: "website",

    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "The NUTS Club — покер в Балашихе",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Покер в Балашихе — The NUTS Club",

    description:
      "Сообщество любителей спортивного покера в Балашихе.",

    images: ["/og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}