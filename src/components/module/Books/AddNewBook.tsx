import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/Redux/features/ApiSlice";
import toast from "react-hot-toast";

const genreData = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY"];
const AddNewBook = () => {
  const [createBook, { data, isLoading, isError, error }]: any =
    useCreateBookMutation();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: "",
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
      toast.success("A new book added successfully");
      setForm({
        title: "",
        author: "",
        genre: "FICTION",
        isbn: "",
        description: "",
        copies: "",
      });
    }

    if (isError) {
      console.error(error);
      let errorMessage = "";

      if ("data" in error) {
        errorMessage = error.data.message;
      }

      toast.error(errorMessage ?? "Error");
    }
  }, [data, isLoading, isError, error]);

  return (
    <section className="flex justify-center items-center  w-[100vw]">
      <div className="max-w-xl w-full space-y-9 border p-9 rounded-2xl bg-[var(--chart-2)]">
        <h2 className="text-3xl font-bold">Add a New Book</h2>

        <form onSubmit={handleSubmit} className="space-y-9">
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

          <div className="flex gap-5">
            <Label htmlFor="genre">Genre :</Label>

            <select
              className="border p-2 rounded-md"
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
              min={1}
              required
            />
          </div>

          <div className="space-y-2 ">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={6}
            />
          </div>

          <Button type="submit" className="w-full">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddNewBook;
