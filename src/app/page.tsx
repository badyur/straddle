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
  const weight = winners - place + 1;              // 1-е место самый большой вес
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

    if (!type || !playersCount || placements.length === 0) return; // нет данных — пропускаем

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
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">Straddle Moscow — рейтинг</h1>

      {/* Табы сезонов */}
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4">
        {["Сезон 1", "Сезон 2", "Сезон 3"].map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`shrink-0 px-4 py-2 rounded-xl border ${tab === i ? "bg-black text-white" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Статы */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          ["Уникальных игроков", uniquePlayers],
          ["Турниров", tournamentsCount],
          ["Следующая игра", nextGameDate],
          ["Финал", finalDate],
        ].map(([label, val]) => (
          <div key={label as string} className="rounded-2xl p-4 shadow bg-white">
            <div className="text-xs text-neutral-500">{label}</div>
            <div className="text-2xl font-semibold">{String(val)}</div>
          </div>
        ))}
      </div>

      {/* Таблица рейтинга — настоящая формула */}
      <div className="overflow-x-auto rounded-2xl shadow">
        <table className="min-w-[560px] w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="text-left p-3">Место</th>
              <th className="text-left p-3">Игрок</th>
              <th className="text-left p-3">Очки</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, i) => (
              <tr key={row.name} className="border-t">
                <td className="p-3">#{i + 1}</td>
                <td className="p-3">{row.name}</td>
                <td className="p-3 font-medium">{row.points}</td>
              </tr>
            ))}
            {table.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-neutral-500">
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
