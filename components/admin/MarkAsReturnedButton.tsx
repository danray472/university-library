"use client";
import { useTransition } from "react";

export function MarkAsReturnedButton({ borrowRecordId, onSuccess }: { borrowRecordId: string, onSuccess: () => void }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    await fetch("/api/admin/mark-returned", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ borrowRecordId }),
    });
    onSuccess();
  };

  return (
    <button
      onClick={() => startTransition(handleClick)}
      disabled={isPending}
      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
    >
      {isPending ? "Marking..." : "Mark as Returned"}
    </button>
  );
} 