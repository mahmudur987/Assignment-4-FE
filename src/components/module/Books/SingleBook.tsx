import { Button } from "@/components/ui/button";
import type { Book } from "@/pages/Books";

import { useDeleteBookMutation } from "@/Redux/features/ApiSlice";

import { DeleteIcon } from "lucide-react";
import type { FC } from "react";
import { Link } from "react-router";

const SingleBook: FC<{ book: Book }> = ({ book }: { book: Book }) => {
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteBook(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={book._id}
      className="p-5 bg-white rounded-xl shadow hover:shadow-md border border-gray-200 transition flex  flex-col justify-between"
    >
      <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
      <p className="text-gray-700 mb-1">By {book.author}</p>
      <p className="text-sm text-gray-500 mb-2">Genre: {book.genre}</p>
      <p className="text-sm mb-2">{book.description}</p>
      <p className="text-sm text-gray-600 mb-1">ISBN: {book.isbn}</p>
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
      <div className="flex justify-between cursor-pointer">
        <Link to={`/update_book/${book._id}`}>
          <Button>Update Book</Button>
        </Link>

        <Button
          className="cursor-pointer"
          onClick={() => handleDelete(book._id)}
        >
          Delete <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};

export default SingleBook;
