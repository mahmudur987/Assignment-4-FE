import BooksTable from "@/components/module/Books/BookTable";

import ErrorMessage from "@/components/module/common/Error";
import LoadingSpinner from "@/components/module/common/LoadingSpinner";
import { Button } from "@/components/ui/button";

import { useGetBookQuery } from "@/Redux/features/ApiSlice";
import { Link } from "react-router";

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

const Books = () => {
  const { data, isError, isLoading } = useGetBookQuery(undefined);

  const books: Book[] = data?.data || [];
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;
  console.log(books);
  return (
    <section>
      <div className="text-end">
        <Link to={"/add_new_book"}>
          <Button>Add New Book</Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-center"> All Books</h1>
      <div>
        <BooksTable books={books} />
      </div>
    </section>
  );
};

export default Books;
