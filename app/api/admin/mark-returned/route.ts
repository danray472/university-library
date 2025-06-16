import { NextRequest, NextResponse } from "next/server";
import { markAsReturned } from "@/lib/actions/book";

export async function POST(req: NextRequest) {
  const { borrowRecordId } = await req.json();
  if (!borrowRecordId) return NextResponse.json({ error: "Missing borrowRecordId" }, { status: 400 });

  const result = await markAsReturned(borrowRecordId);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true });
} 