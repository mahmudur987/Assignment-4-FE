import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes.tsx";
import { Provider } from "react-redux";
import { store } from "./Redux/app/store.tsx";
import { ThemeProvider } from "./components/module/common/themeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <Toaster />
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
