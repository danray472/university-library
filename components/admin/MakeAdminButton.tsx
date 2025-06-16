"use client";
import { useTransition } from "react";

export function MakeAdminButton({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    await fetch("/api/admin/make-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    window.location.reload(); // Reload the page after success
  };

  return (
    <button
      onClick={() => startTransition(handleClick)}
      disabled={isPending}
      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      {isPending ? "Making Admin..." : "Make Admin"}
    </button>
  );
} 