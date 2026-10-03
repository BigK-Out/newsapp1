"use client";

import { useEffect } from "react";

/** Counts one read per story per browser session. Feeds "Most read". */
export default function ViewTracker({ id }: { id: string }) {
  useEffect(() => {
    const key = `fp:viewed:${id}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {}
    fetch(`/api/postitems/${id}/view`, { method: "POST", keepalive: true }).catch(() => {});
  }, [id]);
  return null;
}
