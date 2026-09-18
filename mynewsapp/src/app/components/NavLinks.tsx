"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSaved } from "./saved";

const LINKS = [
  { href: "/", label: "Front page" },
  { href: "/postitems", label: "Latest" },
  { href: "/saved", label: "Saved" },
  { href: "/createpostitems", label: "Write" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const { ids } = useSaved();
  return (
    <nav aria-label="Sections" className="nav-links">
      {LINKS.map((l) => {
        const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
        return (
          <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined}>
            {l.label}
            {l.href === "/saved" && ids.length > 0 && <span className="count">{ids.length}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
