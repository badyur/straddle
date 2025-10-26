"use client";

import { useMemo, useState } from "react";

import season1 from "@/data/season-1.json";
import season2 from "@/data/season-2.json";
import season3 from "@/data/season-3.json";

type Season = typeof season1;
type TourType = "classic" | "jot" | "bounty";

const seasons: Season[] = [season1, season2, season3];

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
        Straddle Moscow — рейтинг
      </h1>

      {/* Табы сезонов */}
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

      {/* Статы */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ["Уникальных игроков", uniquePlayers],
          ["Турниров", tournamentsCount],
          ["Следующая игра", nextGameDate],
          ["Финал", finalDate],
        ].map(([label, val]) => (
          <div
            key={label as string}
            className="rounded-2xl p-6 bg-surface border border-border shadow"
          >
            <div className="text-sm text-muted">{label}</div>
            <div className="text-3xl md:text-4xl font-semibold text-foreground">
              {String(val)}
            </div>
          </div>
        ))}
      </div>

      {/* Таблица рейтинга — настоящая формула */}
      <div className="overflow-x-auto rounded-2xl bg-surface border border-border shadow">
        <table className="min-w-[640px] w-full text-base">
          <thead className="bg-surface-2 text-foreground">
            <tr>
              <th className="text-left p-4 font-medium">Место</th>
              <th className="text-left p-4 font-medium">Игрок</th>
              <th className="text-left p-4 font-medium">Очки</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, i) => (
              <tr key={row.name} className="border-t border-border">
                <td className="p-4 text-muted">#{i + 1}</td>
                <td className="p-4 text-foreground">{row.name}</td>
                <td className="p-4 font-semibold text-foreground">{row.points}</td>
              </tr>
            ))}
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

      {/* Быстрые ссылки */}
      <div className="flex gap-4">
        <a
          href="/rules"
          className="px-5 py-3 text-base rounded-2xl border border-border bg-surface text-foreground hover:bg-[#2A2A2A]"
        >
          Правила
        </a>
        <a
          href="/calculator"
          className="px-5 py-3 text-base rounded-2xl border border-border bg-surface text-foreground hover:bg-[#2A2A2A]"
        >
          Калькулятор
        </a>
      </div>
    </main>
  );
}
