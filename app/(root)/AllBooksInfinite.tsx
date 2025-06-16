"use client";
import React, { useState } from "react";
import BookList from "@/components/BookList";

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

export default function AllBooksInfinite({ initialBooks }: { initialBooks: Book[] }) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [offset, setOffset] = useState(initialBooks.length);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const res = await fetch(`/api/books?offset=${offset}&limit=10`);
    const data = await res.json();
    setBooks((prev) => [...prev, ...data.books]);
    setOffset((prev) => prev + data.books.length);
    setHasMore(data.hasMore);
    setLoading(false);
  };

  return (
    <BookList
      title="All Books"
      books={books}
      onLoadMore={hasMore ? loadMore : null}
      hasMore={hasMore}
      loading={loading}
      containerClassName="mt-28"
    />
  );
} 