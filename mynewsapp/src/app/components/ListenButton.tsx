"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

/** Reads the story aloud with the browser's built-in speech engine. Hidden where unsupported. */
export default function ListenButton({ text, minutes }: { text: string; minutes: number }) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported("speechSynthesis" in window);
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  if (!supported) return null;

  const toggle = () => {
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB";
    u.rate = 1;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    synth.cancel();
    synth.speak(u);
    setSpeaking(true);
  };

  return (
    <button type="button" className="btn btn-ghost" onClick={toggle} aria-pressed={speaking}>
      <Icon name={speaking ? "stop" : "play"} /> {speaking ? "Stop listening" : `Listen · ${minutes} min`}
    </button>
  );
}
