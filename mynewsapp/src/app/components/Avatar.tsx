import { imgSrc, initials } from "@/lib/format";

export default function Avatar({ name, src, size = 36 }: { name: string; src?: string; size?: number }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="avatar" src={imgSrc(src)} alt="" width={size} height={size} />;
  }
  return (
    <span className="avatar avatar-initials" style={{ width: size, height: size, fontSize: size * 0.38 }} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
