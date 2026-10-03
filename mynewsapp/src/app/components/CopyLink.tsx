"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function CopyLink() {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {}
  };
  return (
    <button type="button" className="btn btn-ghost" onClick={copy}>
      <Icon name="link" /> {done ? "Link copied" : "Copy link"}
    </button>
  );
}
