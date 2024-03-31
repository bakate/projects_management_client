import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { UserType } from "@/schemas/auth.schema";
import { Logo } from "./logo";
import { NavbarActions } from "./navbar-actions";

type NavbarProps = {
  user: UserType | null;
};

export const Navbar = ({ user }: NavbarProps) => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-muted/90 border-b fixed top-0 flex justify-between w-full p-6 gap-4",
        scrolled && "border-b-2 shadow-lg"
      )}
    >
      <Logo className="hidden md:flex" />
      <div className="md:flex-1"></div>
      <NavbarActions user={user} />
    </div>
  );
};
