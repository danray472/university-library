import React from "react";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const name = session?.user?.name || "Admin";
  const email = session?.user?.email || "";
  const initials = getInitials(name);

  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <Avatar className="w-20 h-20 mb-4">
        <AvatarFallback className="bg-amber-100 text-3xl">{initials}</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <div className="text-xl font-bold text-dark-200">{name}</div>
        <div className="text-sm text-light-500 mt-1">{email}</div>
      </div>
    </div>
  );
}
