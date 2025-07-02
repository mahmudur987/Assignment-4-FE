import SingleBook from "@/components/module/Books/SingleBook";
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
  if (isLoading) return <p>Loading ........</p>;
  if (isError) return <p>Error........</p>;

  return (
    <section>
      <div className="text-end">
        <Link to={"/add_new_book"}>
          <Button>Add New Book</Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-center"> All Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {books && books?.map((book: Book) => <SingleBook book={book} />)}
      </div>
    </section>
  );
};

export default Books;
