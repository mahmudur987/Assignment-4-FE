import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateBorrowMutation } from "@/Redux/features/ApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const BorrowBookModal = ({ book }: { book: any }) => {
  const navigate = useNavigate();

  const [createBorrow, { data, isLoading, isError, error }]: any =
    useCreateBorrowMutation();

  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    dueDate: "",
    quantity: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "quantity" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const borrowData = { ...form, book: book._id };
    createBorrow(borrowData);
  };

  useEffect(() => {
    // console.log(data);
    // console.log(isLoading, "isLoading");
    // console.log(isError, "isError");
    // console.log(error?.data?.error.message, "error");

    if (data?.success) {
      toast.success(data.message ?? "Book Borrowed Successfully");
      navigate("/borrow");
      setOpenModal(false);
    }

    if (isError) {
      let errorMessage = error ? error?.data?.error.message : "Error";
      toast.error(errorMessage, { duration: 3000 });
      setOpenModal(true);
    }
  }, [data, isLoading, isError, error]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="outline">Borrow Book</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>Please fill up details </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              type="date"
              id="dueDate"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <Button type="submit" className="w-full">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookModal;
