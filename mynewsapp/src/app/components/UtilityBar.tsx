import { SITE } from "@/lib/site";
import Clock from "./Clock";

// WMO weather interpretation codes, grouped.
function describe(code: number) {
  if (code === 0) return "Clear";
  if (code <= 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code <= 48) return "Fog";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorms";
}

async function getWeather() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${SITE.latitude}&longitude=${SITE.longitude}&current=temperature_2m,weather_code&timezone=auto`;
    const res = await fetch(url, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const { current } = await res.json();
    return { temp: Math.round(current.temperature_2m), text: describe(current.weather_code) };
  } catch {
    return null;
  }
}

type Quote = { label: string; name: string; price: string; change: number; asOf: string };

async function getQuote(m: (typeof SITE.markets)[number]): Promise<Quote | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(m.symbol)}?range=1d&interval=1d`;
    const res = await fetch(url, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(3000),
      headers: { "User-Agent": "Mozilla/5.0 (ForPeople News)" },
    });
    if (!res.ok) return null;
    const meta = (await res.json())?.chart?.result?.[0]?.meta;
    const price = Number(meta?.regularMarketPrice);
    const prev = Number(meta?.chartPreviousClose);
    if (!Number.isFinite(price)) return null;
    return {
      label: m.label,
      name: m.name,
      price: m.prefix + price.toLocaleString("en-US", { minimumFractionDigits: m.digits, maximumFractionDigits: m.digits }),
      change: Number.isFinite(prev) && prev > 0 ? ((price - prev) / prev) * 100 : 0,
      asOf: new Date(meta.regularMarketTime * 1000).toLocaleString("en-GB", { timeZone: SITE.timeZone, dateStyle: "medium", timeStyle: "short" }),
    };
  } catch {
    return null;
  }
}

const getMarkets = async () => (await Promise.all(SITE.markets.map(getQuote))).filter((q): q is Quote => q !== null);

export default async function UtilityBar() {
  const [weather, markets] = await Promise.all([getWeather(), getMarkets()]);
  const now = new Date();
  const date = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: SITE.timeZone }).format(now);
  const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: SITE.timeZone }).format(now);

  return (
    <div className="utility">
      <p className="utility-when">
        <span>{date}</span>
        <span>
          {SITE.city} <Clock timeZone={SITE.timeZone} initial={time} />
        </span>
        {weather && (
          <span className="utility-weather">
            {weather.temp}°C · {weather.text}
          </span>
        )}
      </p>
      {markets.length > 0 && (
        <ul className="utility-rates" aria-label="Markets">
          {markets.map((q) => {
            const dir = q.change > 0.005 ? "up" : q.change < -0.005 ? "down" : "flat";
            return (
              <li key={q.label} title={`${q.name}. Last trade ${q.asOf}`}>
                <span className="mkt-label">{q.label}</span> {q.price}{" "}
                <span className={`mkt-change mkt-${dir}`}>
                  <span aria-hidden="true">{dir === "up" ? "▲" : dir === "down" ? "▼" : "■"}</span>
                  <span className="sr-only">{dir === "flat" ? "unchanged" : dir}</span>
                  {Math.abs(q.change).toFixed(2)}%
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
