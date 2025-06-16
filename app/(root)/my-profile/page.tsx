import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { borrowRecords, books } from "@/database/schema";
import { eq, and, inArray } from "drizzle-orm";
import { auth } from "@/auth";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  videoUrl: string;
  summary: string;
  createdAt: string;
}

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;
  const name = session?.user?.name || "User";
  const email = session?.user?.email || "";
  const initials = getInitials(name);

  // Fetch borrowed books for this user
  let borrowedBooks: Book[] = [];
  if (userId) {
    const records = await db
      .select()
      .from(borrowRecords)
      .where(and(eq(borrowRecords.userId, userId), eq(borrowRecords.status, "BORROWED")));
    const bookIds = records.map((r) => r.bookId);
    if (bookIds.length > 0) {
      const dbBooks = await db.select().from(books).where(inArray(books.id, bookIds));
      borrowedBooks = dbBooks.map((b) => ({
        ...b,
        createdAt: b.createdAt ? new Date(b.createdAt).toISOString() : "",
      }));
    }
  }

  return (
    <div className="flex flex-col items-center py-10">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-20 h-20 mb-4">
          <AvatarFallback className="bg-amber-100 text-3xl">{initials}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <div className="text-xl font-bold text-dark-200">{name}</div>
          <div className="text-sm text-light-500 mt-1">{email}</div>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="mt-4"
        >
          <Button>Logout</Button>
        </form>
      </div>
      <div className="w-full max-w-2xl">
        <BookList title="Borrowed Books" books={borrowedBooks} />
      </div>
    </div>
  );
}
