"use client";

import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button, ButtonProps } from "./ui/button";

type CallToActionProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  link: string;
  size?: ButtonProps["size"];
};
const CallToAction = ({
  children,
  className,
  disabled,
  link,
  size = "lg",
}: CallToActionProps) => {
  return (
    <div className={cn("flex gap-2 space-y-2", className)}>
      <Button size={size} disabled={disabled} asChild>
        <Link to={link}>{children}</Link>
      </Button>
    </div>
  );
};

export default CallToAction;
