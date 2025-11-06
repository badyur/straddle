"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import rawSeason1 from "@/data/season-1.json";

type Placement = { name: string; place: number; ko?: number };
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
const season1: Season = rawSeason1 as unknown as Season;
const seasons: Season[] = [season1]; // при появлении season-2/3 добавь их сюда

/** ===== Схема организатора: 1→100, 2→50, 3→30, 4→20, 5→10, 6+→0 ===== */
function pointsForPlaceOrganizer(place: number) {
  if (place === 1) return 100;
  if (place === 2) return 50;
  if (place === 3) return 30;
  if (place === 4) return 20;
  if (place === 5) return 10;
  return 0;
}

/** ===== Подсчёт лидерборда (только по схеме организатора), теперь включаем всех игроков сезона (включая 0) ===== */
function computeLeaderboardOrganizer(s: Season) {
  const points = new Map<string, number>();

  // Считаем очки
  (s.tournaments || []).forEach((t) => {
    const placements = t.placements ?? [];
    if (!placements || placements.length === 0) return;

    placements.forEach((p) => {
      const base = pointsForPlaceOrganizer(p.place);
      // прибавляем базовые очки (даже если 0, чтобы ключ появился)
      points.set(p.name, (points.get(p.name) ?? 0) + base);
    });
  });

  // Убедимся, что все игроки сезона присутствуют в мапе (включая тех, кто не в placements)
  const allPlayers = uniqPlayersOfSeason(s);
  allPlayers.forEach((name) => {
    if (!points.has(name)) points.set(name, 0);
  });

  return Array.from(points.entries())
    .map(([name, pts]) => ({ name, points: pts }))
    .sort((a, b) => {
      // Сортируем по очкам по убыванию, при равенстве — по имени (чтобы порядок детерминирован)
      if (b.points !== a.points) return b.points - a.points;
      return a.name.localeCompare(b.name);
    });
}

/** ===== Уникальные игроки сезона ===== */
function uniqPlayersOfSeason(s: Season) {
  if (Array.isArray(s.players) && s.players.length) return s.players;
  const set = new Set<string>();
  (s.tournaments || []).forEach((t: any) =>
    (t.players || t.placements || []).forEach((p: any) =>
      typeof p === "string" ? set.add(p) : set.add(p.name)
    )
  );
  return Array.from(set);
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
      <h1 className="text-4xl md:text-5xl font-bold text-foreground">The NUTS club — рейтинг</h1>

      {/* ===== Табы сезонов (динамически). Season 1 → "Ноябрь" ===== */}
      <div className="flex gap-3 overflow-x-auto -mx-4 px-4">
        {seasons.length > 0 ? (
          seasons.map((s, i) => {
            const label = s.season === 1 ? "Ноябрь" : `Сезон ${s.season ?? i + 1}`;
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

      {/* ===== Стат-карточки (убрана карточка "Финал") ===== */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          ["Уникальных игроков", uniquePlayers],
          ["Турниров", tournamentsCount],
          ["Следующая игра", nextGameDate]
        ].map(([label, val]) => (
          <div
            key={label as string}
            className="rounded-2xl p-6 bg-surface border border-border/60 shadow hover:shadow-xl hover:-translate-y-0.5 transition will-change-transform backdrop-blur-sm"
          >
            <div className="text-sm text-muted">{label}</div>
            <div className="text-3xl md:text-4xl font-semibold text-foreground">{String(val)}</div>
          </div>
        ))}
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
              const isCut = i === 17; // жирная линия после 18-го
              const afterCut = i === 18;
              const isZero = row.points === 0;

              return (
                <tr
                  key={row.name}
                  className={`border-t border-border transition-colors hover:bg-[#202020] ${
                    isCut ? "border-b-4 border-b-accent" : ""
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
