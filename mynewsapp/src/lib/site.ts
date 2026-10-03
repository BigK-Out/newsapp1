// Site-wide settings for the utility bar. Weather from Open-Meteo, market prices from Yahoo Finance; neither needs a key.
export const SITE = {
  city: "Istanbul",
  timeZone: "Europe/Istanbul",
  latitude: 41.01,
  longitude: 28.98,
  // Yahoo Finance symbols. `prefix` goes before the price, `digits` sets decimal places.
  markets: [
    { symbol: "EURUSD=X", label: "EUR/USD", name: "Euro in US dollars", prefix: "", digits: 4 },
    { symbol: "GC=F", label: "Gold", name: "Gold futures, US dollars per troy ounce", prefix: "$", digits: 0 },
    { symbol: "BZ=F", label: "Brent", name: "Brent crude oil futures, US dollars per barrel", prefix: "$", digits: 2 },
  ],
};
