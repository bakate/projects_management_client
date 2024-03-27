import { logoutUserAction } from "@/actions/auth.actions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";

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
          <Button asChild variant={"ghost"}>
            <Link to={"/profile"}>Profile</Link>
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => {
              logoutUserAction();
              toast.success("Logged out successfully");
              navigation("/");
            }}
          >
            Logout
          </Button>
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
