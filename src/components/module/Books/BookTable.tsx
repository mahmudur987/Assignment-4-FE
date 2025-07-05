import { Button } from "@/components/ui/button";
import { DeleteIcon } from "lucide-react";
import { Link } from "react-router"; // Ensure you're using `react-router-dom`
import { type FC, useState } from "react";

import toast from "react-hot-toast";
import { useDeleteBookMutation } from "@/Redux/features/ApiSlice";
import BorrowBookModal from "../Modal/BorrowBookModal";
import { ConfirmModal } from "../Modal/ConfirmModal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// Define Book type if not imported
type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
};

const BooksTable: FC<{ books: Book[] }> = ({ books }) => {
  const [deleteBook] = useDeleteBookMutation();
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleConfirm = (id: string) => {
    setSelectedId(id);
    setConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      const res: any = await deleteBook(selectedId);
      if (res?.data) {
        toast.success(res.data.message ?? "Book deleted");
      } else if (res?.error) {
        toast.error(res.error?.data?.message ?? "Delete failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setConfirmModal(false);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-4 text-left">Title</TableHead>
            <TableHead className="p-4 text-left">Author</TableHead>
            <TableHead className="p-4 text-left">Genre</TableHead>
            <TableHead className="p-4 text-left">ISBN</TableHead>
            <TableHead className="p-4 text-left">Copies</TableHead>
            <TableHead className="p-4 text-left">Status</TableHead>
            <TableHead className="p-4 text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id} className="hover:bg-gray-50 transition">
              <TableCell className="p-4 font-medium">{book.title}</TableCell>
              <TableCell className="p-4">{book.author}</TableCell>
              <TableCell className="p-4">{book.genre}</TableCell>
              <TableCell className="p-4">{book.isbn}</TableCell>
              <TableCell className="p-4">{book.copies}</TableCell>
              <TableCell className="p-4">
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    book.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {book.available ? "Available" : "Unavailable"}
                </span>
              </TableCell>
              <TableCell className="p-4 space-x-2">
                <BorrowBookModal book={book} />
                <Link to={`/update_book/${book._id}`}>
                  <Button size="sm">Update</Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleConfirm(book._id)}
                >
                  <DeleteIcon className="h-4 w-4 mr-1" /> Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmModal
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        handleConfirm={handleDelete}
      />
    </>
  );
};

export default BooksTable;
