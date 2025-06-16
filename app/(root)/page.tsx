import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { auth } from "@/auth";
import { desc } from "drizzle-orm";
import AllBooksInfinite from "./AllBooksInfinite";
import { Book } from "@/types";

const Home = async () => {
  const session = await auth();

  const fetchedLatestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt)));

  const latestBooks: Book[] = fetchedLatestBooks.map(book => ({
    ...book,
    createdAt: book.createdAt ? book.createdAt.toISOString() : '',
  }));

  // Fetch the first page of all books for initial render
  const fetchedAllBooks = (await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))
    .limit(10));

  const allBooks: Book[] = fetchedAllBooks.map(book => ({
    ...book,
    createdAt: book.createdAt ? book.createdAt.toISOString() : '',
  }));

  return (
    <div className="overflow-x-hidden">
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />

      <AllBooksInfinite initialBooks={allBooks} />
    </div>
  );
};

export default Home;
