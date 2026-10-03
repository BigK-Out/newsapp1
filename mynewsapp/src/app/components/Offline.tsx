import Link from "next/link";

export default function Offline() {
  return (
    <main className="wrap page">
      <div className="empty">
        <p className="eyebrow">Offline</p>
        <h1 className="page-title">This story can&apos;t load right now</h1>
        <p>The newsroom database is unreachable. Try again in a minute.</p>
        <Link href="/" className="btn">Back to the front page</Link>
      </div>
    </main>
  );
}
