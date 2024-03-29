import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const ProjectStatusLink = ({
  status,
  selectedStatus,
  setSelectedStatus,
  icon,
  text,
  count,
}: {
  status: string;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  icon: React.ReactNode;
  text: string;
  count: number;
}) => (
  <Link
    to="#"
    preventScrollReset={true}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
      selectedStatus === status && "text-primary"
    )}
    onClick={() => setSelectedStatus(status)}
  >
    {icon}
    {text}
    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
      {count}
    </Badge>
  </Link>
);

export default ProjectStatusLink;
