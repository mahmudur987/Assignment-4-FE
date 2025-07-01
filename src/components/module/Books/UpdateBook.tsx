import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
  type customError,
} from "@/Redux/features/ApiSlice";
import toast from "react-hot-toast";
import { useParams } from "react-router";

const genreData = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY"];
const UpdateBook = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const [form, setForm] = useState<{
    title: string;
    author: string;
    genre: string;
    isbn: string;
    description: string;
    copies: string;
  }>({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newData;

    if (Number(form.copies) > 0) {
      newData = { ...form, available: true };
    } else {
      newData = form;
    }

    console.log("Submitting book:", newData);

    try {
      const res: any = id && (await updateBook({ id, bookData: newData }));

      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message ?? "Error");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Error Happen");
    }
  };

  useEffect(() => {
    if (data && !isLoading) {
      setForm(data?.data);
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

  if (isLoading) {
    return <p>Loading .....</p>;
  }

  return (
    <section>
      <div className="max-w-lg space-y-9">
        <h2 className="text-3xl font-bold">UpdateBook</h2>

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
            <Label htmlFor="genre">Genre</Label>

            <select
              id="genre"
              name="genre"
              //   value={form.genre}
              onChange={handleChange}
            >
              {form.genre && <option value={form.genre}>{form.genre}</option>}
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
              min={0}
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
              required
              rows={3}
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

export default UpdateBook;
