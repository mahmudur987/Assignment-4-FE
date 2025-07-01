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
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/Redux/features/ApiSlice";

const genreData = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY"];
const AddBookModal = () => {
  const [createBook, { data, isLoading, isError, error }] =
    useCreateBookMutation();
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "copies" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting book:", form);
    createBook(form);
  };

  useEffect(() => {
    if (data && !isLoading) {
      setOpenModal(false);
    }
  }, [data, isLoading]);

  if (isError) {
    let errorMessage = "Error";
    if ("status" in error) {
      // FetchBaseQueryError
      if (typeof error.data === "string") {
        errorMessage = error.data;
      } else if (
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data
      ) {
        errorMessage =
          (error.data as { message?: string }).message || errorMessage;
      }
    } else if ("message" in error) {
      // SerializedError
      errorMessage = error.message || errorMessage;
    }
    alert(errorMessage);
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="default">Add Book</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a New Book</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new book to the library.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>

            <select
              id="genre"
              name="genre"
              value={form.genre}
              onChange={handleChange}
            >
              {genreData.map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="copies">Copies</Label>
            <Input
              type="number"
              id="copies"
              name="copies"
              value={form.copies}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
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

export default AddBookModal;
