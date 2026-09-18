"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [error, setError] = useState("");

  const remove = async () => {
    if (!window.confirm("Delete this story? This can't be undone.")) return;
    try {
      const res = await fetch(`/api/postitems/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.push("/postitems");
      router.refresh();
    } catch {
      setError("Couldn't delete the story. Try again.");
    }
  };

  return (
    <>
      <button type="button" className="btn btn-ghost btn-danger" onClick={remove}>
        <Icon name="trash" /> Delete story
      </button>
      {error && <p role="alert" className="form-error">{error}</p>}
    </>
  );
}
