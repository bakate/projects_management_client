import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

type LogoProps = {
  className?: string;
  onClick?: () => void;
};
export const Logo = ({ className, onClick }: LogoProps) => {
  return (
    <Link to={"/"} onClick={onClick}>
      <div className={cn("flex items-center gap-x-2", className)}>
        <img
          src={logo}
          height="0"
          width="0"
          alt="Logo"
          className="w-[40px] h-[40px]"
        />
        <p className="font-black">Projects Management</p>
      </div>
    </Link>
  );
};
