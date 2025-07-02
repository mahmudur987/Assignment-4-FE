import { Button } from "@/components/ui/button";
import type { Book } from "@/pages/Books";

import { useDeleteBookMutation } from "@/Redux/features/ApiSlice";

import { DeleteIcon } from "lucide-react";
import { useState, type FC } from "react";
import { Link } from "react-router";
import { ConfirmModal } from "../Modal/ConfirmModal";
import toast from "react-hot-toast";
import BorrowBookModal from "../Modal/BorrowBookModal";

const SingleBook: FC<{ book: Book }> = ({ book }: { book: Book }) => {
  const [deleteBook] = useDeleteBookMutation();
  const [confirmModal, setConfirmModal] = useState(false);

  const handleConfirm = () => {
    setConfirmModal(true);
  };
  const handleDelete = async () => {
    try {
      const res: any = await deleteBook(book._id);
      if (res?.data) {
        toast.success(res.data.message ?? "Book deleted successfully");
      }
      if (res?.error) {
        const errorMessage = res.error?.data?.message ?? "Error";
        toast.error(errorMessage);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={book._id}
        className="p-5 bg-white rounded-xl shadow hover:shadow-md border border-gray-200 transition flex  flex-col justify-between"
      >
        <div className="text-end">
          <BorrowBookModal book={book} />
        </div>

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

          <Button className="cursor-pointer" onClick={() => handleConfirm()}>
            Delete <DeleteIcon />
          </Button>
        </div>
      </div>
      <ConfirmModal
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        handleConfirm={handleDelete}
      />
    </>
  );
};

export default SingleBook;
