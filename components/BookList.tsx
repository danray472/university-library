"use client";
import React from "react";
import BookCard from "@/components/BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
  onLoadMore?: (() => void) | null;
  hasMore?: boolean;
  loading?: boolean;
}

const BookList = ({ title, books, containerClassName, onLoadMore, hasMore, loading }: Props) => {
  if (!books || books.length < 1) return null;

  return (
    <section className={`${containerClassName} px-4 sm:px-6 md:px-8`}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
      {onLoadMore && hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </section>
  );
};
export default BookList;
