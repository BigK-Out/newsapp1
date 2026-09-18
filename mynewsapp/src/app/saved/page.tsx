import SavedList from "../components/SavedList";

export const metadata = { title: "Saved · ForPeople News" };

export default function Saved() {
  return (
    <main className="wrap page">
      <p className="eyebrow">On this device</p>
      <h1 className="page-title">Saved stories</h1>
      <SavedList />
    </main>
  );
}
