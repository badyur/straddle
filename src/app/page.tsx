"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import season1 from "@/data/season-1.json";

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

const seasons: Season[] = [season1]; // сюда можно добавлять season2, season3 и т.д.

/** Тип режима подсчёта */
type ScoringMode = "simple" | "organizer";

/** ===== Таблицы очков для двух режимов ===== */
function pointsForPlace(place: number, mode: ScoringMode) {
  if (mode === "simple") {
    if (place === 1) return 10;
    if (place === 2) return 7;
    if (place === 3) return 5;
    if (place === 4) return 3;
    if (place === 5) return 2;
    return 1; // 6 и ниже
  }

  // organizer: 1->100, 2->50, 3->30, 4->20, 5->10, 6+ -> 0
  if (place === 1) return 100;
  if (place === 2) return 50;
  if (place === 3) return 30;
  if (place === 4) return 20;
  if (place === 5) return 10;
  return 0;
}

/** ===== Подсчёт лидерборда: базовые очки + KO (опционально) ===== */
function computeLeaderboard(s: Season, mode: ScoringMode, includeKO: boolean) {
  const points = new Map<string, number>();

  (s.tournaments || []).forEach((t) => {
    const placements = t.placements ?? [];
    if (!placements || placements.length === 0) return;

    placements.forEach((p) => {
      const base = pointsForPlace(p.place, mode);
      const koBonus = includeKO ? (p.ko ?? 0) : 0; // +1 за каждый KO (если включено)
      const total = base + koBonus;
      if (total <= 0) return;
      points.set(p.name, (points.get(p.name) ?? 0) + total);
    });
  });

  return Array.from(points.entries())
    .map(([name, pts]) => ({ name, points: pts }))
    .sort((a, b) => b.points - a.points);
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

  // режим подсчёта очков: 'simple' или 'organizer'
  const [mode, setMode] = useState<ScoringMode>("simple");
  // учитывать KO или нет — по-умолчанию true для simple, false для organizer
  const [includeKO, setIncludeKO] = useState<boolean>(true);

  // Если сменили режим — подставим удобные дефолты для includeKO
  useEffect(() => {
    setIncludeKO(mode === "simple" ? true : false);
  }, [mode]);

  // Защита на случай, если сезонов меньше, чем tab
  useEffect(() => {
    if (tab >= seasons.length) setTab(0);
  }, [tab]);

  const current = seasons[tab] ?? (seasons.length ? seasons[0] : ({} as Season));

  const uniquePlayers = useMemo(() => uniqPlayersOfSeason(current).length, [current]);
  const tournamentsCount = current.tournaments?.length ?? 0;
  const nextGameDate = current.nextGameDate ?? "—";
  const finalDate = current.finalDate ?? "—";

  const table = useMemo(() => computeLeaderboard(current, mode, includeKO), [current, mode, includeKO]);

  return (
    <main className="mx-auto max-w-6xl p-8 space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground">Straddle Klim — рейтинг</h1>

      {/* ===== Панель управления схемой подсчёта ===== */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="flex gap-3">
          {/* Кнопки переключения режима */}
          <button
            onClick={() => setMode("simple")}
            className={`px-4 py-2 rounded-md border ${
              mode === "simple" ? "bg-accent text-accent-foreground" : "bg-surface"
            }`}
          >
            Наша (1→10 ...)
          </button>
          <button
            onClick={() => setMode("organizer")}
            className={`px-4 py-2 rounded-md border ${
              mode === "organizer" ? "bg-accent text-accent-foreground" : "bg-surface"
            }`}
          >
            Схема организатора (100,50...)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeKO}
              onChange={(e) => setIncludeKO(e.target.checked)}
              className="form-checkbox"
            />
            <span className="text-sm">Учитывать KO (+1 за выбивание)</span>
          </label>

          <div className="text-sm text-muted">
            Текущий режим: <b className="ml-1">{mode === "simple" ? "Наша" : "Организатор"}</b>
          </div>
        </div>
      </div>

      {/* ===== Табы сезонов (динамически из массива seasons) ===== */}
      <div className="flex gap-3 overflow-x-auto -mx-4 px-4">
        {seasons.length > 0 ? (
          seasons.map((s, i) => {
            const label = `Сезон ${s.season ?? i + 1}`;
            return (
              <button
                key={label}
                onClick={() => setTab(i)}
                className={`shrink-0 px-5 py-3 text-base rounded-2xl border border-border transition ${
                  tab === i
                    ? "bg-accent text-accent-foreground"
                    : "bg-surface text-foreground hover:bg-[#2A2A2A]"
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

      {/* ===== Стат-карточки ===== */}
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
            <div className="text-3xl md:text-4xl font-semibold text-foreground">{String(val)}</div>
          </div>
        ))}
      </div>

      {/* ===== Таблица рейтинга ===== */}
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
                        className="text-foreground font-semibold truncate hover:text-accent transition-colors cursor-pointer"
                      >
                        {row.name}
                      </Link>

                      <span className="md:hidden font-semibold text-foreground/90 shrink-0">{row.points}</span>
                    </div>
                  </td>

                  <td
                    className={`hidden md:table-cell p-4 font-semibold text-foreground text-right ${
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
