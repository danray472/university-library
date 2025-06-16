import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { userId, action } = await req.json();
  if (!userId || !["APPROVE", "REJECT"].includes(action)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const newStatus = action === "APPROVE" ? "APPROVED" : "REJECTED";
  await db.update(users).set({ status: newStatus }).where(eq(users.id, userId));
  return NextResponse.json({ success: true });
} 