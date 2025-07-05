import { Button } from "@/components/ui/button";

import { useGetBookQuery } from "@/Redux/features/ApiSlice";
import { Link } from "react-router";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/Error";
import SingleBook from "../Books/SingleBook";

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
          books?.map((book: Book) => <SingleBook book={book} key={book._id} />)}
      </div>
    </section>
  );
};

export default HomeBooks;
