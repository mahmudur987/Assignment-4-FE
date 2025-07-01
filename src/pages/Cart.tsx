import CartBookCard from "@/components/module/Cart/CartBookCard";
import { useAppSelector } from "@/Redux/app/hook";

const Cart = () => {
  const { books } = useAppSelector((state) => state.cartState);

  console.log(books);
  return (
    <div>
      <h1>Cart</h1>

      <div className="space-y-5">
        {books.length > 0 &&
          books.map((book, i) => <CartBookCard key={i} book={book} />)}
      </div>
    </div>
  );
};

export default Cart;
