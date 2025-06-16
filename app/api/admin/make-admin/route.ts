import { NextRequest, NextResponse } from "next/server";
import { updateUserRole } from "@/lib/actions/admin";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  await updateUserRole(userId, "ADMIN");
  return NextResponse.json({ success: true });
} 