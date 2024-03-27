import { logoutUserAction } from "@/actions/auth.actions";
import { CircleUser } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type NavbarActionsProps = {
  isAuthenticated: boolean;
};

const publicRoutes = [
  {
    path: "/auth",
    label: "Login",
  },
];

export const NavbarActions = ({ isAuthenticated }: NavbarActionsProps) => {
  const navigation = useNavigate();
  return (
    <div className="flex gap-x-4">
      {isAuthenticated ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => {
                  logoutUserAction();
                  toast.success("Logged out successfully");
                  navigation("/");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        publicRoutes.map((route) => (
          <Link key={route.path} to={route.path}>
            {route.label}
          </Link>
        ))
      )}
    </div>
  );
};
