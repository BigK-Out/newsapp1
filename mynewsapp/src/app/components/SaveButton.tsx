"use client";

import Icon from "./Icon";
import { useSaved } from "./saved";

export default function SaveButton({ id, variant = "icon" }: { id: string; variant?: "icon" | "full" }) {
  const { has, toggle } = useSaved();
  const on = has(id);
  const label = on ? "Remove from saved" : "Save for later";
  if (variant === "full") {
    return (
      <button type="button" className="btn btn-ghost" onClick={() => toggle(id)} aria-pressed={on}>
        <Icon name="bookmark" filled={on} /> {on ? "Saved" : "Save story"}
      </button>
    );
  }
  return (
    <button type="button" className="icon-btn save" onClick={() => toggle(id)} aria-pressed={on} aria-label={label} title={label}>
      <Icon name="bookmark" filled={on} />
    </button>
  );
}
