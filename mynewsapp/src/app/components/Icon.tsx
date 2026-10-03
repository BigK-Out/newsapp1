const PATHS: Record<string, React.ReactNode> = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  bookmark: <path d="M6 3.5h12v17l-6-4.5-6 4.5z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" /></>,
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1" /></>,
  pen: <path d="M4 20l1-4L16.5 4.5a2 2 0 0 1 3 3L8 19z" />,
  trash: <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  play: <path d="M7 4.5v15l12-7.5z" />,
  stop: <rect x="6" y="6" width="12" height="12" />,
  share: <><path d="M12 15V3.5M7.5 8 12 3.5 16.5 8" /><path d="M5 12v8h14v-8" /></>,
  rss: <><path d="M5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14" /><circle cx="6" cy="18" r="1.5" /></>,
};

export default function Icon({ name, filled = false, size = 18 }: { name: keyof typeof PATHS; filled?: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
