import { imgSrc } from "@/lib/format";

/** One-colour print treatment. Hover or focus reveals the original photo. */
export default function Duo({ src, alt = "", ratio = "4 / 3", eager = false }: { src: string; alt?: string; ratio?: string; eager?: boolean }) {
  return (
    <div className="duo" style={{ aspectRatio: ratio }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgSrc(src)} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}
