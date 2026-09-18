import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap page">
      <div className="empty">
        <p className="eyebrow">404</p>
        <h1 className="page-title">We can&apos;t find that page</h1>
        <p>The story may have been removed, or the link is mistyped.</p>
        <Link href="/" className="btn">Back to the front page</Link>
      </div>
    </main>
  );
}
