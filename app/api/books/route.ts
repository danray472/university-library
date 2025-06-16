import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  // Get total count
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(books);

  // Paginate using SQL OFFSET and LIMIT
  const paginatedBooks = await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))
    .offset(offset)
    .limit(limit);

  const hasMore = offset + paginatedBooks.length < count;

  return NextResponse.json({ books: paginatedBooks, hasMore });
} 