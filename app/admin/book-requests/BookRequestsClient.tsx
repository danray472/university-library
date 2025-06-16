"use client";
import React, { useState } from "react";
import { MarkAsReturnedButton } from "@/components/admin/MarkAsReturnedButton";

interface User {
  id: string;
  fullName: string;
}
interface Book {
  id: string;
  title: string;
}
interface BorrowRecord {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: string;
}

export default function BookRequestsClient({
  serverRecords,
  serverUsers,
  serverBooks,
}: {
  serverRecords: BorrowRecord[];
  serverUsers: User[];
  serverBooks: Book[];
}) {
  const [allRecords, setAllRecords] = useState(serverRecords);
  const allUsers = serverUsers;
  const allBooks = serverBooks;

  const getUser = (userId: string) => allUsers.find((u) => u.id === userId);
  const getBook = (bookId: string) => allBooks.find((b) => b.id === bookId);

  const handleReturned = (id: string) => {
    setAllRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <h2 className="text-xl font-semibold mb-6">All Book Borrow Requests</h2>
      <div className="mt-7 w-full overflow-x-auto">
        {allRecords.length === 0 ? (
          <div className="text-gray-500">No borrow requests found.</div>
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-semibold">User</th>
                <th className="py-3 px-4 font-semibold">Book</th>
                <th className="py-3 px-4 font-semibold">Borrow Date</th>
                <th className="py-3 px-4 font-semibold">Due Date</th>
                <th className="py-3 px-4 font-semibold">Return Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allRecords.map((record) => {
                const user = getUser(record.userId);
                const book = getBook(record.bookId);
                return (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{user ? user.fullName : "-"}</td>
                    <td className="py-2 px-4">{book ? book.title : "-"}</td>
                    <td className="py-2 px-4">{record.borrowDate ? new Date(record.borrowDate).toLocaleDateString() : '-'}</td>
                    <td className="py-2 px-4">{record.dueDate ? new Date(record.dueDate).toLocaleDateString() : '-'}</td>
                    <td className="py-2 px-4">{record.returnDate ? new Date(record.returnDate).toLocaleDateString() : '-'}</td>
                    <td className={`py-2 px-4 capitalize ${record.status === "BORROWED" ? "text-yellow-600 font-bold" : "text-green-600 font-bold"}`}>{record.status}</td>
                    <td className="py-2 px-4">
                      {record.status === "BORROWED" && (
                        <MarkAsReturnedButton borrowRecordId={record.id} onSuccess={() => handleReturned(record.id)} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
} 