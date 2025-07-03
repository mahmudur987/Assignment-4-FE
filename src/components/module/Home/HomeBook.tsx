import { Button } from "@/components/ui/button";

import { useGetBookQuery } from "@/Redux/features/ApiSlice";
import { Link } from "react-router";
import LoadingSpinner from "../common/LoadingSpiner";
import ErrorMessage from "../common/Error";

export type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
};

const HomeBooks = () => {
  const { data, isError, isLoading } = useGetBookQuery(undefined);

  const books: Book[] = data?.data || [];
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <section>
      <h1 className="text-2xl font-bold text-center"> All Books</h1>
      <div className="text-end">
        <Link to={"/book"}>
          <Button variant={"secondary"}>See All ..</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {books &&
          books?.map((book: Book) => (
            <>
              <div
                key={book._id}
                className="p-5 bg-[var(--chart-2)] rounded-xl shadow hover:shadow-md border border-gray-200 transition flex  flex-col justify-between"
              >
                {/* <div className="text-end">
          <BorrowBookModal book={book} />
        </div> */}

                <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
                <p className="text-gray-700 mb-1">By {book.author}</p>
                <p className="text-sm text-gray-800 mb-2">
                  Genre: {book.genre}
                </p>
                <p className="text-sm mb-2">{book.description}</p>
                <p className="text-sm text-gray-800 mb-1">ISBN: {book.isbn}</p>
                <p className="text-sm">Copies: {book.copies}</p>
                <div className="flex justify-between">
                  <span
                    className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${
                      book.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            </>
          ))}
      </div>
    </section>
  );
};

export default HomeBooks;
