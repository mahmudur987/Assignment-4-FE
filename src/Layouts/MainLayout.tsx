import { Outlet } from "react-router";
import Header from "../components/module/common/Header";
import Footer from "@/components/module/common/Footer";

const MainLayout = () => {
  return (
    <main className="container  mx-auto space-y-10 min-h-screen flex flex-col justify-between">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
