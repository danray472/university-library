import React from "react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const allBooks = await db.select().from(books);

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-x-auto">
        {allBooks.length === 0 ? (
          <div className="text-gray-500">No books found.</div>
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Author</th>
                <th className="py-3 px-4 font-semibold">Genre</th>
                <th className="py-3 px-4 font-semibold">Rating</th>
                <th className="py-3 px-4 font-semibold">Available/Total</th>
                <th className="py-3 px-4 font-semibold">Created At</th>
                <th className="py-3 px-4 font-semibold">Summary</th>
              </tr>
            </thead>
            <tbody>
              {allBooks.map((book) => (
                <tr key={book.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 font-semibold">{book.title}</td>
                  <td className="py-2 px-4">{book.author}</td>
                  <td className="py-2 px-4">{book.genre}</td>
                  <td className="py-2 px-4">{book.rating}</td>
                  <td className="py-2 px-4">{book.availableCopies} / {book.totalCopies}</td>
                  <td className="py-2 px-4">{book.createdAt ? new Date(book.createdAt).toLocaleDateString() : '-'}</td>
                  <td className="py-2 px-4 max-w-xs truncate" title={book.summary}>{book.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
