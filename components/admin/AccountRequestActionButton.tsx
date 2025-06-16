"use client";
import { useTransition } from "react";

export function AccountRequestActionButton({ userId, onActionComplete }: { userId: string, onActionComplete: () => void }) {
  const [isPending, startTransition] = useTransition();

  const handleAction = async (action: "APPROVE" | "REJECT") => {
    await fetch("/api/admin/account-request-action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action }),
    });
    onActionComplete();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => startTransition(() => handleAction("APPROVE"))}
        disabled={isPending}
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        {isPending ? "Accepting..." : "Accept"}
      </button>
      <button
        onClick={() => startTransition(() => handleAction("REJECT"))}
        disabled={isPending}
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        {isPending ? "Rejecting..." : "Reject"}
      </button>
    </div>
  );
} 