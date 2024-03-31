import { logoutUserAction } from "@/actions/auth.actions";
import { UserType } from "@/schemas/auth.schema";
import { CircleUser } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type NavbarActionsProps = {
  user: UserType | null;
};

const publicRoutes = [
  {
    path: "/auth",
    label: "Login",
  },
];

export const NavbarActions = ({ user }: NavbarActionsProps) => {
  const navigation = useNavigate();
  return (
    <div className="flex gap-x-4">
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                Connected as <span className="capitalize">{user.username}</span>
              </DropdownMenuLabel>
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
