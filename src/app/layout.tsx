import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "The NUTS club Балашиха",
  description: "Рейтинг и правила",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
    {/* Yandex.Metrika */}
<Script
  id="yandex-metrika"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105598182', 'ym');

      ym(105598182, 'init', {ssr:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
    `,
  }}
/>

<noscript>
  <div>
    <img
      src="https://mc.yandex.ru/watch/105598182"
      style={{ position: "absolute", left: "-9999px" }}
      alt=""
    />
  </div>
</noscript>
{/* END Yandex.Metrika */}
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
  {/* Telegram link */}
  <a
    href="https://t.me/pokerclubnuts"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-80 transition-opacity"
    aria-label="Telegram"
  >
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-7"
    >
      <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7225)"/>
      <path d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z" fill="white"/>
      <defs>
        <linearGradient id="paint0_linear_87_7225" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#37BBFE"/>
          <stop offset="1" stopColor="#007DBB"/>
        </linearGradient>
      </defs>
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
        <Analytics />
      </body>
    </html>
  );
}