import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Book,
  HomeIcon,
  LogIn,
  ClipboardList,
  CarTaxiFrontIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { useState } from "react";

export const navLinks = [
  {
    path: "/",
    label: "Home",
    icon: <HomeIcon size={18} />,
  },
  {
    path: "/book",
    label: "Books",
    icon: <Book size={18} />,
  },
  {
    path: "/borrow",
    label: "Borrow",
    icon: <ClipboardList size={18} />,
  },
  {
    path: "/login",
    label: "Login",
    icon: <LogIn size={18} />,
  },
  {
    path: "/cart",
    label: "Cart",
    icon: <CarTaxiFrontIcon size={18} />,
  },
];

const HeaderNavLinks = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-5">
        {navLinks.map((link, index) => (
          <NavigationMenuItem key={index}>
            <Link
              to={link.path}
              className="flex items-center gap-2 text-lg font-bold hover:border-b-2 hover:border-red-500"
            >
              {link.label} {link.icon}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[var(--background)] px-5 py-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-extrabold">Library Management App</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <HeaderNavLinks />
          <ModeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ModeToggle />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="flex flex-col md:hidden mt-4 gap-3">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-lg font-medium hover:text-red-500"
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
