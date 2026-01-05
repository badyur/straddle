// src/app/player/[name]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";

/* === helpers === */
function norm(s: string) {
  return s?.normalize("NFC").replace(/\s+/g, " ").trim().toLocaleLowerCase("ru");
}

async function readJson(p: string) {
  return JSON.parse(await fs.readFile(p, "utf-8"));
}

async function loadActiveSeasons() {
  const root = process.cwd();
  const list = await readJson(path.join(root, "src", "data", "season-list.json"));
  const files: string[] = list?.active ?? [];
  const out: any[] = [];
  for (const f of files) {
    const p1 = path.join(root, "src", "data", f);
    try {
      out.push(await readJson(p1));
      continue;
    } catch {}
    const p2 = path.join(root, "public", "data", f);
    out.push(await readJson(p2));
  }
  return out;
}

function summarize(season: any, playerName: string) {
  const nm = norm(playerName);
  let games = 0,
    wins = 0,
    bestPlace: number | null = null,
    totalPlace = 0,
    ko = 0;

  for (const t of season?.tournaments ?? []) {
    const rec = (t.placements ?? []).find((pl: any) => norm(pl?.name) === nm);
    if (!rec) continue;

    games++;

    if (typeof rec.place === "number") {
      bestPlace = bestPlace === null ? rec.place : Math.min(bestPlace, rec.place);
      totalPlace += rec.place;
      if (rec.place === 1) wins++;
    }

    if (typeof rec.ko === "number") ko += rec.ko;
  }

  return {
    games,
    wins,
    bestPlace,
    totalPlace,
    avgPlace: games ? totalPlace / games : null,
    ko,
  };
}

/** Проверяем наличие фото в public/players с разными расширениями */
async function resolvePlayerPhoto(
  name: string
): Promise<{ url: string; width: number; height: number } | null> {
  const root = process.cwd();
  const baseDir = path.join(root, "public", "players");
  const exts = [".jpg", ".jpeg", ".png", ".webp"];

  for (const ext of exts) {
    const filePath = path.join(baseDir, `${name}${ext}`);
    try {
      await fs.access(filePath);
      return {
        url: `/players/${encodeURIComponent(name)}${ext}`,
        width: 180,
        height: 180,
      };
    } catch {
      // пробуем следующее расширение
    }
  }
  return null;
}

/* === main page === */
export default async function PlayerPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name: raw } = await params;
  const name = decodeURIComponent(raw ?? "");
  if (!name) return notFound();

  const seasons = await loadActiveSeasons();

  // ищем игрока во ВСЕХ сезонах
  const nm = norm(name);
  const seasonsWithPlayer = seasons.filter(
    (s) =>
      (Array.isArray(s.players) &&
        s.players.some((p: any) =>
          typeof p === "string" ? norm(p) === nm : norm(p?.name) === nm
        )) ||
      (s.tournaments ?? []).some((t: any) =>
        (t.placements ?? []).some((pl: any) => norm(pl?.name) === nm)
      )
  );

  if (seasonsWithPlayer.length === 0) return notFound();

  // суммарная сводка по всем сезонам, где игрок встречается
  const total = seasonsWithPlayer.reduce(
    (acc, s) => {
      const x = summarize(s, name);
      acc.games += x.games;
      acc.wins += x.wins;
      acc.ko += x.ko;
      acc.totalPlace += x.totalPlace;
      if (x.bestPlace !== null) {
        acc.bestPlace = acc.bestPlace === null ? x.bestPlace : Math.min(acc.bestPlace, x.bestPlace);
      }
      return acc;
    },
    { games: 0, wins: 0, bestPlace: null as number | null, totalPlace: 0, ko: 0 }
  );

  const avgPlace = total.games ? total.totalPlace / total.games : null;

  // сервером определяем, есть ли фото
  const photo = await resolvePlayerPhoto(name);

  // список сезонов для отображения (сортируем по номеру, если есть)
  const seasonsLabel = seasonsWithPlayer
    .slice()
    .sort((a: any, b: any) => (Number(a?.season ?? 0) || 0) - (Number(b?.season ?? 0) || 0))
    .map((s: any) => (s && "season" in s ? String(s.season) : "—"))
    .join(", ");

  return (
    <main className="p-6 space-y-6">
      {/* Фото + имя */}
      <header className="flex items-center gap-6">
        {/* Блок под фото / плейсхолдер */}
        <div className="relative w-[180px] h-[180px] rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center">
          {photo ? (
            <Image
              src={photo.url}
              alt={name}
              width={photo.width}
              height={photo.height}
              className="object-cover w-full h-full"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#2a2a2a] text-[#aaa] select-none text-sm font-semibold tracking-wide">
              NO&nbsp;PHOTO
            </div>
          )}
        </div>

        {/* Имя + сезоны */}
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-muted-foreground">Сезоны: {seasonsLabel}</p>
        </div>
      </header>

      {/* Статистика */}
      <section className="border rounded-xl p-4 bg-muted/20">
        <h2 className="font-semibold mb-2 text-lg">Сводка (все сезоны)</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Игры: {total.games}</li>
          <li>Победы: {total.wins}</li>
          {total.bestPlace !== null && <li>Лучшее место: {total.bestPlace}</li>}
          {avgPlace !== null && <li>Среднее место: {avgPlace.toFixed(2)}</li>}
          <li>KO (bounty): {total.ko}</li>
        </ul>
      </section>
    </main>
  );
}
