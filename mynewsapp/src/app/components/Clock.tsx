"use client";

import { useEffect, useState } from "react";

const fmt = (timeZone: string) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date());

export default function Clock({ timeZone, initial }: { timeZone: string; initial: string }) {
  const [time, setTime] = useState(initial);
  useEffect(() => {
    setTime(fmt(timeZone));
    const id = setInterval(() => setTime(fmt(timeZone)), 15_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return <time suppressHydrationWarning>{time}</time>;
}
