export default function DemoNote({ demo }: { demo: boolean }) {
  if (!demo) return null;
  return (
    <p className="demo-note" role="status">
      <strong>Demo stories.</strong> The database is offline, so you&apos;re reading sample content. Publishing and editing are paused.
    </p>
  );
}
