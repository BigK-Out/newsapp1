"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("fp:theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button type="button" className="icon-btn" onClick={flip} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
      <Icon name={theme === "dark" ? "sun" : "moon"} />
    </button>
  );
}
