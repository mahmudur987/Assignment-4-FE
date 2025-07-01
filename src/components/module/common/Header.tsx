import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Book,
  HomeIcon,
  LogIn,
  ClipboardList,
  CarTaxiFrontIcon,
} from "lucide-react";
import { Link } from "react-router";

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

// import { NavigationMenu } from "../../ui/navigation-menu";

const Header = () => {
  return (
    <div className="flex justify-between my-10 bg-amber-50 p-5">
      <div className="text-xl font-extrabold">Library Management app</div>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map((x, i) => (
              <NavigationMenuItem key={i}>
                <NavigationMenuLink>
                  <Link
                    to={x.path}
                    className="flex gap-5 tex-lg hover:border-b-2 hover:border-red-500"
                  >
                    {x.label} {x.icon}{" "}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Header;
