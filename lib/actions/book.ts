"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};

export const markAsReturned = async (borrowRecordId: string) => {
  try {
    // Get the borrow record to find the bookId
    const record = await db
      .select({ bookId: borrowRecords.bookId })
      .from(borrowRecords)
      .where(eq(borrowRecords.id, borrowRecordId))
      .limit(1);

    if (!record.length) {
      return { success: false, error: "Borrow record not found" };
    }

    // Update the borrow record
    await db
      .update(borrowRecords)
      .set({ status: "RETURNED", returnDate: new Date() })
      .where(eq(borrowRecords.id, borrowRecordId));

    // Increment the book's availableCopies
    await db
      .update(books)
      .set({ availableCopies: books.availableCopies + 1 })
      .where(eq(books.id, record[0].bookId));

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "An error occurred while marking as returned" };
  }
};
