"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import rawSeason2 from "@/data/season-2.json";

type Placement = { name: string; place: number; ko?: number; points?: number | string };
type Tournament = {
  id: number;
  date?: string;
  type?: "classic" | "jot" | "bounty";
  playersCount?: number;
  reentries?: number;
  placements?: Placement[];
  players?: string[];
};
type Season = {
  season?: number;
  finalDate?: string;
  nextGameDate?: string;
  tournaments: Tournament[];
  players?: string[];
};

/** Приводим JSON к типу Season (устраняет проблемы с literal types) */
const season2: Season = rawSeason2 as unknown as Season;
const seasons: Season[] = [season2];  /** тут меняем вывода сезона */ 

/** ===== Новая логика подсчёта для организатора:
 *  - базовые очки читаем из p.points (число или строка "140" / "140 + 3☠️")
 *  - баунти читаем из p.ko либо парсим из p.points ("+ 3☠️")
 *  - суммируем base + ko * BOUNTY_VALUE по всем турнирам
 */
const BOUNTY_VALUE = 0; // можно изменить тут

// Исключаемый игрок (можно добавить других при необходимости)
const EXCLUDED_PLAYERS = ["Klim"];

function shouldExcludePlayer(name: string): boolean {
  return EXCLUDED_PLAYERS.includes(name);
}

function parseBasePoints(p: any): number {
  if (!p) return 0;
  if (typeof p.points === "number") return p.points;
  if (typeof p.points === "string") {
    const m = p.points.match(/(-?\d+)/); // первый номер — базовые очки
    if (m) return parseInt(m[1], 10);
  }
  return 0;
}

function parseKo(p: any): number {
  if (!p) return 0;
  if (typeof p.ko === "number") return p.ko;
  if (typeof p.points === "string") {
    // варианты: "140 + 3☠️", "3☠️", "+ 3☠"
    const m1 = p.points.match(/\+\s*(\d+)\s*☠/);
    if (m1) return parseInt(m1[1], 10);
    const m2 = p.points.match(/(\d+)\s*☠/);
    if (m2) return parseInt(m2[1], 10);
  }
  return 0;
}

function computeLeaderboardOrganizer(s: Season) {
  const map = new Map<string, { base: number; ko: number; total: number }>();
  const bestPlace = new Map<string, number>();

  (s.tournaments || []).forEach((t) => {
    const placements = t.placements ?? [];
    placements.forEach((p: any) => {
      const name = p.name;
      if (!name || shouldExcludePlayer(name)) return; // Исключаем игрока
      
      const base = parseBasePoints(p);
      const ko = parseKo(p);
      const existing = map.get(name) ?? { base: 0, ko: 0, total: 0 };
      existing.base += base;
      existing.ko += ko;
      existing.total = existing.base + existing.ko * BOUNTY_VALUE;
      map.set(name, existing);

      if (typeof p.place === "number") {
        const prev = bestPlace.get(name);
        if (prev === undefined || p.place < prev) bestPlace.set(name, p.place);
      }
    });
  });

  // Убедимся, что все игроки сезона присутствуют (даже если их нет в placements)
  // Исключаем игрока из общего списка
  const allPlayers = uniqPlayersOfSeason(s).filter(name => !shouldExcludePlayer(name));
  
  allPlayers.forEach((name) => {
    if (!map.has(name)) map.set(name, { base: 0, ko: 0, total: 0 });
    if (!bestPlace.has(name)) bestPlace.set(name, Number.POSITIVE_INFINITY);
  });

  const arr = Array.from(map.entries()).map(([name, v]) => ({
    name,
    points: v.total,
    bestPlace: bestPlace.get(name) ?? Number.POSITIVE_INFINITY,
  }));

  arr.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if ((a.bestPlace ?? Infinity) !== (b.bestPlace ?? Infinity))
      return (a.bestPlace ?? Infinity) - (b.bestPlace ?? Infinity);
    return a.name.localeCompare(b.name, "ru");
  });

  // вернём в старом формате: [{ name, points }]
  return arr.map((x) => ({ name: x.name, points: x.points }));
}

/** ===== Уникальные игроки сезона ===== */
function uniqPlayersOfSeason(s: Season) {
  if (Array.isArray(s.players) && s.players.length) {
    // Фильтруем исключенных игроков из списка сезона
    return s.players.filter(name => !shouldExcludePlayer(name));
  }
  
  const set = new Set<string>();
  (s.tournaments || []).forEach((t: any) =>
    (t.players || t.placements || []).forEach((p: any) => {
      const name = typeof p === "string" ? p : p.name;
      if (name && !shouldExcludePlayer(name)) { // Исключаем игрока
        set.add(name);
      }
    })
  );
  return Array.from(set);
}

/** ===== Форматирование даты по-русски: "14 ноября" ===== */
function formatDateRu(dateStr?: string) {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(d);
  } catch {
    return dateStr;
  }
}

/** ===== Медаль для места ===== */
function RankBadge({ rank }: { rank: number }) {
  const base =
    "inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-[0.95rem] shadow transition-transform";
  if (rank === 1)
    return (
      <span className={`${base} bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] text-[#1f2937]`}>1</span>
    );
  if (rank === 2)
    return (
      <span className={`${base} bg-gradient-to-br from-[#94a3b8] to-[#64748b] text-[#1f2937]`}>2</span>
    );
  if (rank === 3)
    return (
      <span className={`${base} bg-gradient-to-br from-[#f97316] to-[#ea580c] text-[#1f2937]`}>3</span>
    );
  return <span className={`${base} bg-surface-2 text-foreground/80`}>{rank}</span>;
}

export default function Home() {
  const [tab, setTab] = useState(0);

  // Защита: если сезонов стало меньше, чем tab — сброс
  useEffect(() => {
    if (tab >= seasons.length) setTab(0);
  }, [tab]);

  const current = seasons[tab] ?? (seasons.length ? seasons[0] : ({} as Season));

  const uniquePlayers = useMemo(() => uniqPlayersOfSeason(current).length, [current]);
  const tournamentsCount = current.tournaments?.length ?? 0;
  const nextGameDate = current.nextGameDate ?? "—";
  // finalDate больше не используется / карточка "Финал" убрана

  const table = useMemo(() => computeLeaderboardOrganizer(current), [current]);

  return (
    <main className="mx-auto max-w-6xl p-8 space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground">The NUTS club Балашиха</h1>

      {/* Описание клуба */}
      <p className="text-foreground/80 mt-2 leading-relaxed">
        Сообщество спортивного покера в Балашихе — <b>The NUTS Club</b>{" "}
        (<a className="text-accent underline" href="https://t.me/pokerclubnuts" target="_blank" rel="noreferrer">
          Telegram
        </a>)
        <br />
        Для тех, кто любит покерный вайб, стратегию игры и новые знакомства.
        <br />
        <span className="font-semibold">Без азарта и ставок!</span>
      </p>

      {/* ===== Табы сезонов (динамически). Season 1 → "Декабрь" ===== */}
      <div className="flex gap-3 overflow-x-auto -mx-4 px-4">
        {seasons.length > 0 ? (
          seasons.map((s, i) => {
            const label = s.season === 1 ? "Декабрь" : `Сезон ${s.season ?? i + 1}`;
            return (
              <button
                key={label}
                onClick={() => setTab(i)}
                className={`shrink-0 px-5 py-3 text-base rounded-2xl border border-border transition ${
                  tab === i ? "bg-accent text-accent-foreground" : "bg-surface text-foreground hover:bg-[#2A2A2A]"
                }`}
              >
                {label}
              </button>
            );
          })
        ) : (
          <div className="text-muted px-4 py-3">Нет доступных сезонов</div>
        )}
      </div>

{/* ===== Стат-карточки (компактный вариант: убран бейдж "ноября", уменьшены padding/шрифты) ===== */}
<div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
  {/* Карточка: Следующая игра — компактнее */}
  <div
    className="
      col-span-2 md:col-span-1
      rounded-2xl
      p-4 md:p-6
      bg-surface border border-border/60
      shadow hover:shadow-xl
      transition
      flex flex-col items-center gap-3
      md:justify-between
      md:backdrop-blur-sm
    "
  >
    <div className="text-sm text-muted">Следующая игра</div>

    {/* Дата — поменьше на мобилке */}
    <div className="text-2xl md:text-3xl font-semibold text-foreground">
      {String(nextGameDate)}
    </div>

    {/* Кнопка записи — ширина оставляем, но делаем чуть компактнее */}
    <a
      href={`https://t.me/The_NUTS_Club_game_bot?text=${encodeURIComponent(
        `Привет, хочу записаться на игру ${formatDateRu(nextGameDate)}`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full text-center bg-accent hover:bg-[#2b6ce6] text-accent-foreground font-semibold py-2 md:py-3 rounded-lg transition"
    >
      Записаться на игру {formatDateRu(nextGameDate)}
    </a>

    {/* Бейдж месяца убран — раньше здесь был: 
        <div className="px-4 py-2 bg-surface-2 text-foreground rounded-lg text-sm">...</div>
        Удалил чтобы карточка была компактной.
    */}
  </div>

  {/* Уникальных игроков — компактный вариант */}
  <div
    className="rounded-2xl p-4 md:p-6 bg-surface border border-border/60 shadow transition flex flex-col justify-between"
  >
    <div className="text-sm text-muted">Уникальных игроков</div>
    <div className="text-2xl md:text-3xl font-semibold text-foreground">{String(uniquePlayers)}</div>
  </div>

  {/* Турниров — компактный вариант */}
  <div
    className="rounded-2xl p-4 md:p-6 bg-surface border border-border/60 shadow transition flex flex-col justify-between"
  >
    <div className="text-sm text-muted">Турниров</div>
    <div className="text-2xl md:text-3xl font-semibold text-foreground">{String(tournamentsCount)}</div>
  </div>
</div>

      {/* ===== Таблица рейтинга (включая нулевые строки) ===== */}
      <div className="rounded-2xl bg-surface border border-border shadow overflow-hidden">
        <table className="w-full text-base table-fixed">
          <thead className="bg-surface-2 text-foreground">
            <tr>
              <th className="text-left p-4 font-medium w-[64px]">Место</th>
              <th className="text-left p-4 font-medium">Игрок</th>
              <th className="text-left p-4 font-medium hidden md:table-cell w-[120px]">Очки</th>
            </tr>
          </thead>

          <tbody>
            {table.map((row, i) => {
              const rank = i + 1;
              const isCut = i === 8; // ЛИНИЯ ПОСЛЕ 9 МЕСТА (i === 8)
              const afterCut = i === 9; // Доп. отступ для строки после линии
              const isZero = row.points === 0;

              return (
                <tr
                  key={row.name}
                  className={`border-t border-border transition-colors hover:bg-[#202020] ${
                    isCut ? "border-b-8 border-b-[#b70f11]" : ""
                  }`}
                >
                  <td className={`p-4 align-middle ${isCut ? "pb-6" : ""} ${afterCut ? "pt-6" : ""}`}>
                    <RankBadge rank={rank} />
                  </td>

                  <td className={`p-4 ${isCut ? "pb-6" : ""} ${afterCut ? "pt-6" : ""}`}>
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={`/player/${encodeURIComponent(row.name)}`}
                        className={`text-foreground font-semibold truncate hover:text-accent transition-colors cursor-pointer ${
                          isZero ? "opacity-60" : ""
                        }`}
                      >
                        {row.name}
                      </Link>

                      <span className="md:hidden font-semibold text-foreground/90 shrink-0">{row.points}</span>
                    </div>
                  </td>

                  <td
                    className={`hidden md:table-cell p-4 font-semibold text-foreground text-right ${
                      isCut ? "pb-6" : ""
                    } ${afterCut ? "pt-6" : ""} ${isZero ? "opacity-60" : ""}`}
                  >
                    {row.points}
                  </td>
                </tr>
              );
            })}

            {table.length === 0 && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-muted">
                  Нет данных о местах турниров этого сезона
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}