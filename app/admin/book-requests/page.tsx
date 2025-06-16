// Server component wrapper for data fetching
import { db } from "@/database/drizzle";
import { borrowRecords, users, books } from "@/database/schema";
import BookRequestsClient from "./BookRequestsClient";

export default async function BookRequestsPage() {
  const serverRecords = await db.select().from(borrowRecords);
  const serverUsers = await db.select().from(users);
  const serverBooks = await db.select().from(books);
  return <BookRequestsClient serverRecords={serverRecords} serverUsers={serverUsers} serverBooks={serverBooks} />;
} 