import type { Book } from "@/pages/Books";
import { createSlice } from "@reduxjs/toolkit";

interface cartBook extends Book {
  count: number;
}

interface borrowState {
  books: cartBook[];
}

const initialState: borrowState = {
  books: [],
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const alreadyAdded = state.books.find(
        (x) => x._id === action.payload._id
      );

      if (alreadyAdded) {
        alreadyAdded.count += 1;
      } else {
        state.books.push({ ...action.payload, count: 1 });
      }
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
