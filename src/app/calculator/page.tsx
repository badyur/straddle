"use client";

import { useState } from "react";

type TourType = "classic" | "jot" | "bounty";

function fund(type: TourType, players: number, re: number) {
  if (type === "classic") return 10 * players + 10 * re;
  if (type === "jot")     return 10 * players + 15 * re;
  return 5 * players + 5 * re; // bounty
}

// простая модель распределения очков для топ-50% (заглушка, подправим позже)
function pointsForPlace(totalFund: number, place: number, totalPlayers: number) {
  const winners = Math.floor(totalPlayers / 2);
  if (winners < 1 || place > winners) return 0;
  const k = (winners - place + 1) / winners; // от 1.0 до ~0
  return Math.round(totalFund * k);
}

export default function CalculatorPage() {
  const [type, setType] = useState<TourType>("classic");
  const [players, setPlayers] = useState(20);
  const [re, setRe] = useState(0);
  const [place, setPlace] = useState(1);
  const [ko, setKo] = useState(0);

  const total = fund(type, players, re);
  const base = pointsForPlace(total, place, players);
  const bounty = type === "bounty" ? 5 * ko : 0;
  const points = base + bounty;

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-3xl font-bold mb-6">Калькулятор рейтинга</h1>

      <div className="space-y-4">
        <div>
          <div className="text-sm mb-2">Тип турнира</div>
          <div className="flex gap-2">
            {(["classic", "jot", "bounty"] as TourType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-2 rounded-xl border ${type === t ? "bg-black text-white" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-sm">Игроков</span>
          <input
            type="number"
            min={2}
            value={players}
            onChange={(e) => setPlayers(+e.target.value)}
            className="mt-1 w-full rounded-xl border p-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Ре-энтри</span>
          <input
            type="number"
            min={0}
            value={re}
            onChange={(e) => setRe(+e.target.value)}
            className="mt-1 w-full rounded-xl border p-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Место</span>
          <input
            type="number"
            min={1}
            value={place}
            onChange={(e) => setPlace(+e.target.value)}
            className="mt-1 w-full rounded-xl border p-2"
          />
        </label>

        {type === "bounty" && (
          <label className="block">
            <span className="text-sm">Knockouts (KO)</span>
            <input
              type="number"
              min={0}
              value={ko}
              onChange={(e) => setKo(+e.target.value)}
              className="mt-1 w-full rounded-xl border p-2"
            />
          </label>
        )}

        <div className="rounded-2xl border p-4 space-y-2">
          <div>
            <div className="text-sm text-neutral-500">Фонд</div>
            <div className="text-2xl font-semibold">{total}</div>
          </div>
          <div>
            <div className="text-sm text-neutral-500">Очки</div>
            <div className="text-2xl font-semibold">{points}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
