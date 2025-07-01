import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

type CartBookCardProps = {
  book: Book;
};

const CartBookCard: FC<CartBookCardProps> = ({ book }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">by {book.author}</p>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>
          <strong>Genre:</strong> {book.genre}
        </p>
        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <p>
          <strong>Description:</strong> {book.description}
        </p>
        <p>
          <strong>Copies:</strong> {book.copies}
        </p>
        <Badge variant={book.available ? "default" : "destructive"}>
          {book.available ? "Available" : "Unavailable"}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default CartBookCard;
