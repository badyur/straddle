"use client";

import { useMemo, useState } from "react";

import season1 from "@/data/season-1.json";
import season2 from "@/data/season-2.json";
import season3 from "@/data/season-3.json";

type Season = typeof season1;
type TourType = "classic" | "jot" | "bounty";

const seasons: Season[] = [season1, season2, season3];

/** ===== Формула (как у тебя) ===== */
function fund(type: TourType, players: number, re: number) {
  if (type === "classic") return 10 * players + 10 * re;
  if (type === "jot") return 10 * players + 15 * re;
  return 5 * players + 5 * re; // bounty
}

function placePoints(totalFund: number, place: number, players: number) {
  const winners = Math.floor(players / 2);
  if (winners < 1 || place > winners) return 0;
  const weight = winners - place + 1;
  const totalWeights = (winners * (winners + 1)) / 2;
  return Math.round((totalFund * weight) / totalWeights);
}

function computeLeaderboard(s: Season) {
  const points = new Map<string, number>();

  s.tournaments.forEach((t) => {
    const type = (t as any).type as TourType | undefined;
    const playersCount = (t as any).playersCount ?? (t as any).players?.length ?? 0;
    const re = (t as any).reentries ?? 0;
    const placements: Array<{ name: string; place: number; ko?: number }> =
      (t as any).placements ?? [];

    if (!type || !playersCount || placements.length === 0) return;

    const f = fund(type, playersCount, re);

    placements.forEach((p) => {
      const base = placePoints(f, p.place, playersCount);
      const bounty = type === "bounty" ? 5 * (p.ko ?? 0) : 0;
      const total = base + bounty;
      if (total <= 0) return;
      points.set(p.name, (points.get(p.name) ?? 0) + total);
    });
  });

  return Array.from(points.entries())
    .map(([name, pts]) => ({ name, points: pts }))
    .sort((a, b) => b.points - a.points);
}

function uniqPlayersOfSeason(s: Season) {
  if (Array.isArray(s.players) && s.players.length) return s.players;
  const set = new Set<string>();
  s.tournaments.forEach((t: any) => t.players?.forEach((p: string) => set.add(p)));
  return Array.from(set);
}

/** ===== Медаль для места ===== */
function RankBadge({ rank }: { rank: number }) {
  const base =
    "inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-[0.95rem] shadow transition-transform";
  if (rank === 1)
    return (
      <span className={`${base} bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] text-[#1f2937]`}>
        1
      </span>
    );
  if (rank === 2)
    return (
      <span className={`${base} bg-gradient-to-br from-[#94a3b8] to-[#64748b] text-[#1f2937]`}>
        2
      </span>
    );
  if (rank === 3)
    return (
      <span className={`${base} bg-gradient-to-br from-[#f97316] to-[#ea580c] text-[#1f2937]`}>
        3
      </span>
    );
  return (
    <span className={`${base} bg-surface-2 text-foreground/80`}>
      {rank}
    </span>
  );
}

export default function Home() {
  const [tab, setTab] = useState(0);
  const current = seasons[tab];

  const uniquePlayers = useMemo(() => uniqPlayersOfSeason(current).length, [current]);
  const tournamentsCount = current.tournaments.length;
  const nextGameDate = (current as any).nextGameDate ?? "—";
  const finalDate = (current as any).finalDate ?? "—";

  const table = useMemo(() => computeLeaderboard(current), [current]);

  return (
    <main className="mx-auto max-w-6xl p-8 space-y-8">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground">
        Straddle Klim — рейтинг
      </h1>

      {/* ===== Табы сезонов ===== */}
      <div className="flex gap-3 overflow-x-auto -mx-4 px-4">
        {["Сезон 1", "Сезон 2", "Сезон 3"].map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`shrink-0 px-5 py-3 text-base rounded-2xl border border-border transition
              ${
                tab === i
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface text-foreground hover:bg-[#2A2A2A]"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ===== Карточки со статами (мягкие, наводится ВСЯ карточка) ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ["Уникальных игроков", uniquePlayers],
          ["Турниров", tournamentsCount],
          ["Следующая игра", nextGameDate],
          ["Финал", finalDate],
        ].map(([label, val]) => (
          <div
            key={label as string}
            className="rounded-2xl p-6 bg-surface border border-border/60 shadow hover:shadow-xl hover:-translate-y-0.5 transition will-change-transform backdrop-blur-sm"
          >
            <div className="text-sm text-muted">{label}</div>
            <div className="text-3xl md:text-4xl font-semibold text-foreground">
              {String(val)}
            </div>
          </div>
        ))}
      </div>

      {/* ===== Таблица рейтинга ===== */}
      <div className="overflow-x-auto rounded-2xl bg-surface border border-border shadow">
        <table className="min-w-[640px] w-full text-base">
          <thead className="bg-surface-2 text-foreground">
            <tr>
              <th className="text-left p-4 font-medium">Место</th>
              <th className="text-left p-4 font-medium">Игрок</th>
              <th className="text-left p-4 font-medium text-center md:text-left">Очки</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, i) => {
              const rank = i + 1;
              const isCut = i === 17;       // линия после 18-го
              const afterCut = i === 18;    // дополнительный верхний отступ после линии

              return (
                <tr
                  key={row.name}
                  className={`border-t border-border transition-colors hover:bg-[#202020]
                    ${isCut ? "border-b-4 border-b-accent" : ""}`}
                >
                  <td className={`p-4 ${isCut ? "pb-6" : ""} ${afterCut ? "pt-6" : ""}`}>
                    <RankBadge rank={rank} />
                  </td>
                  <td className={`p-4 text-foreground ${isCut ? "pb-6" : ""} ${afterCut ? "pt-6" : ""}`}>
                    <span className="font-semibold">{row.name}</span>
                  </td>
                  <td
                    className={`p-4 font-semibold text-foreground text-center md:text-left ${
                      isCut ? "pb-6" : ""
                    } ${afterCut ? "pt-6" : ""}`}
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
