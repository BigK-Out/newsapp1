"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

/** Opens the device share sheet. Only shown where the Web Share API exists (mostly phones). */
export default function ShareButton({ title }: { title: string }) {
  const [can, setCan] = useState(false);
  useEffect(() => setCan(typeof navigator.share === "function"), []);
  if (!can) return null;
  const share = () => navigator.share({ title, url: window.location.href }).catch(() => {});
  return (
    <button type="button" className="btn btn-ghost" onClick={share}>
      <Icon name="share" /> Share
    </button>
  );
}
