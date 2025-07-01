import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import Books from "../pages/Books";
import Borrow from "../pages/Borrow";
import { LogIn } from "lucide-react";
import Signup from "@/pages/Signup";
import Cart from "@/pages/Cart";
import AddNewBook from "@/components/module/Books/AddNewBook";
import UpdateBook from "@/components/module/Books/UpdateBook";
import { useGetBookByIdQuery } from "@/Redux/features/ApiSlice";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/book",
        element: <Books />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/borrow",
        element: <Borrow />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/add_new_book",
        element: <AddNewBook />,
      },
      {
        path: "/update_book/:id",
        element: <UpdateBook />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
